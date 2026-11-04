import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { id, nombreComprador, nombreLente, precio } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Falta el ID del armazón" }, { status: 400 });
    }

    const docRef = adminDb.collection("armazones").doc(id);

    await adminDb.runTransaction(async (transaction) => {
      const sfDoc = await transaction.get(docRef);
      if (!sfDoc.exists) {
        throw new Error("El documento del armazón no existe");
      }

      const stockActual = Number(sfDoc.data()?.stock) || 0;
      const nuevoStock = stockActual - 1;

      if (nuevoStock >= 0) {
        transaction.update(docRef, { stock: nuevoStock });
      } else {
        throw new Error("No hay stock disponible");
      }
    });

    await adminDb.collection("ventas").add({
      armazonId: id,
      armazonNombre: nombreLente || "Modelo Premium",
      comprador: nombreComprador || "Cliente Web",
      monto: Number(precio) || 0,
      fecha: new Date().toISOString(),
      estado: "Aprobado",
    });

    return NextResponse.json({ OK: true, mensaje: "Stock descontado y venta registrada con éxito" });
  } catch (error: any) {
    console.error("❌ Error en la transacción de venta:", error);
    return NextResponse.json(
      { error: "No se pudo procesar la venta", detalles: error.message },
      { status: 500 }
    );
  }
}
