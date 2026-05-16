import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, nombre, precio } = body;

    if (!id || !nombre || !precio) {
      return NextResponse.json(
        { error: "Faltan parámetros obligatorios: id, nombre o precio." },
        { status: 400 }
      );
    }

    const origin = request.headers.get("origin") || "http://localhost:3000";
    const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "Falta configurar el MERCADO_PAGO_ACCESS_TOKEN." },
        { status: 500 }
      );
    }

    // JSON CRUDO - APAGAMOS EL AUTO_RETURN PARA QUE NO LLORE EN LOCALHOST
    const dataPreferencia = {
      items: [
        {
          id: id,
          title: nombre,
          quantity: 1,
          unit_price: Number(precio),
          currency_id: "MXN",
        },
      ],
      back_urls: {
        success: `${origin}/armazones/${id}?pago=exitoso`,
        failure: `${origin}/armazones/${id}?pago=fallido`,
        pending: `${origin}/armazones/${id}?pago=pendiente`,
      }
      // auto_return: "approved", <-- ¡Acá estaba el ortiva! Lo dejamos apagado por ahora.
    };

    const mpResponse = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
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
    console.error("❌ ERROR CRÍTICO:", error);
    return NextResponse.json(
      { error: "Error interno", detalles: error.message || error },
      { status: 500 }
    );
  }
}