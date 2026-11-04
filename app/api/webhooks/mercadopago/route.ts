import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

/**
 * Webhook oficial de Mercado Pago (IPN / Webhooks V1)
 * Escucha notificaciones de cobros aprobados, descuenta inventario y registra la venta de forma atómica.
 */
export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const topic = url.searchParams.get("topic") || url.searchParams.get("type");
    let paymentId = url.searchParams.get("data.id") || url.searchParams.get("id");

    // Mercado Pago a veces envía el payload en el body JSON
    if (!paymentId) {
      try {
        const body = await request.json();
        paymentId = body?.data?.id || body?.id;
      } catch {
        // En caso de que el body no sea JSON o venga vacío
      }
    }

    if (!paymentId) {
      // Respondemos 200 para eventos que no sean de pago (ej. merchant_order o subscripciones)
      return NextResponse.json({ received: true, ignored: "No payment id" }, { status: 200 });
    }

    const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    if (!token) {
      console.error("❌ Falta MERCADO_PAGO_ACCESS_TOKEN en las variables de entorno");
      return NextResponse.json({ error: "Configuración incompleta" }, { status: 500 });
    }

    // Consultamos el pago oficial en la API de Mercado Pago
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!mpRes.ok) {
      console.error(`❌ Error al consultar pago ${paymentId} en Mercado Pago:`, await mpRes.text());
      return NextResponse.json({ error: "No se pudo verificar el pago" }, { status: 200 });
    }

    const payment = await mpRes.json();
    console.log(`💳 WEBHOOK MP: Pago ${payment.id} estado: "${payment.status}"`);

    // Procesamos solo pagos aprobados
    if (payment.status !== "approved") {
      return NextResponse.json({ received: true, status: payment.status }, { status: 200 });
    }

    // Idempotencia: Verificar si este pago ya fue procesado previamente
    const ventasExistentes = await adminDb
      .collection("ventas")
      .where("mercadopagoPaymentId", "==", payment.id.toString())
      .limit(1)
      .get();

    if (!ventasExistentes.empty) {
      console.log(`ℹ️ El pago ${payment.id} ya fue procesado anteriormente.`);
      return NextResponse.json({ received: true, message: "Ya procesado" }, { status: 200 });
    }

    // Obtenemos los datos del armazón a partir de external_reference o de los items
    let armazonId = "";
    let armazonNombre = "";
    let compradorNombre = "Cliente Web";

    if (payment.external_reference) {
      try {
        const refData = JSON.parse(payment.external_reference);
        armazonId = refData.id;
        armazonNombre = refData.nombre;
        if (refData.comprador) compradorNombre = refData.comprador;
      } catch {
        armazonId = payment.external_reference;
      }
    }

    if (!armazonId && payment.additional_info?.items?.[0]) {
      const item = payment.additional_info.items[0];
      armazonId = item.id;
      armazonNombre = item.title;
    }

    const payer = payment.payer;
    if (payer?.first_name || payer?.last_name) {
      compradorNombre = `${payer.first_name || ""} ${payer.last_name || ""}`.trim();
    }

    // Transacción atómica: descontar stock en Firestore y guardar la venta
    if (armazonId) {
      const armazonRef = adminDb.collection("armazones").doc(armazonId);

      await adminDb.runTransaction(async (transaction) => {
        const docSnap = await transaction.get(armazonRef);
        if (docSnap.exists) {
          const stockActual = Number(docSnap.data()?.stock) || 0;
          const nuevoStock = Math.max(0, stockActual - 1);
          transaction.update(armazonRef, { stock: nuevoStock, actualizadoEn: new Date() });
          console.log(`📉 Stock descontado para armazón ${armazonId}: ${stockActual} -> ${nuevoStock}`);
        }
      });
    }

    // Registrar la venta en la colección 'ventas'
    await adminDb.collection("ventas").add({
      armazonId: armazonId || "desconocido",
      armazonNombre: armazonNombre || payment.description || "Armazón Premium",
      comprador: compradorNombre,
      compradorEmail: payment.payer?.email || "",
      monto: Number(payment.transaction_amount) || 0,
      metodoPago: payment.payment_method_id || "mercadopago",
      mercadopagoPaymentId: payment.id.toString(),
      fecha: payment.date_approved || new Date().toISOString(),
      estado: "Aprobado",
    });

    console.log(`✅ Venta registrada en Firestore por pago #${payment.id}`);
    return NextResponse.json({ success: true, paymentId: payment.id }, { status: 200 });

  } catch (error: any) {
    console.error("❌ Error en Webhook de Mercado Pago:", error);
    // Mercado Pago reintenta si enviamos error 500, devolvemos 200 para evitar loops infinitos en errores lógicos
    return NextResponse.json({ error: error.message }, { status: 200 });
  }
}
