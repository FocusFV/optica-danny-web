import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, nombre, precio, comprador } = body;

    if (!id || !nombre || !precio) {
      return NextResponse.json(
        { error: "Faltan parámetros obligatorios: id, nombre o precio." },
        { status: 400 }
      );
    }

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      request.headers.get("origin") ||
      "http://localhost:3000";

    const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "Falta configurar el MERCADO_PAGO_ACCESS_TOKEN." },
        { status: 500 }
      );
    }

    // Configuración completa de preferencia oficial de Mercado Pago
    const dataPreferencia: Record<string, unknown> = {
      items: [
        {
          id: id,
          title: nombre,
          quantity: 1,
          unit_price: Number(precio),
          currency_id: "MXN",
        },
      ],
      external_reference: JSON.stringify({
        id,
        nombre,
        comprador: comprador || "Cliente Web",
      }),
      back_urls: {
        success: `${origin}/armazones/${id}?pago=exitoso`,
        failure: `${origin}/armazones/${id}?pago=fallido`,
        pending: `${origin}/armazones/${id}?pago=pendiente`,
      },
      auto_return: origin.includes("localhost") ? undefined : "approved",
    };

    // Agregar webhook de notificación si estamos en un dominio accesible por internet
    if (!origin.includes("localhost")) {
      dataPreferencia.notification_url = `${origin}/api/webhooks/mercadopago`;
    }

    const mpResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPreferencia),
    });

    const resData = await mpResponse.json();

    if (!mpResponse.ok) {
      console.error("❌ Error de Mercado Pago:", resData);
      return NextResponse.json(
        { error: "Mercado Pago rechazó la petición", detalles: resData },
        { status: mpResponse.status }
      );
    }

    return NextResponse.json({ urlPago: resData.init_point });
  } catch (error: any) {
    console.error("❌ ERROR CRÍTICO EN CHECKOUT:", error);
    return NextResponse.json(
      { error: "Error interno al conectar con la pasarela", detalles: error.message || error },
      { status: 500 }
    );
  }
}
