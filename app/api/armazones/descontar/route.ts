import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase"; // Asegurate de que esta sea la ruta correcta a tu config de Firebase
import { doc, runTransaction } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Falta el ID del armazón" }, { status: 400 });
    }

    const docRef = doc(db, "armazones", id);

    // Usamos una transacción para asegurarnos de que el stock se reste de forma segura
    // incluso si dos personas compran al mismo tiempo.
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(docRef);
      if (!sfDoc.exists()) {
        throw new Error("El documento no existe");
      }

      const nuevoStock = sfDoc.data().stock - 1;
      
      // Validamos que no quede en negativo por las dudas
      if (nuevoStock >= 0) {
        transaction.update(docRef, { stock: nuevoStock });
      } else {
        throw new Error("No hay stock disponible");
      }
    });

    return NextResponse.json({ OK: true, mensaje: "Stock descontado con éxito" });

  } catch (error: any) {
    console.error("❌ Error al descontar stock:", error);
    return NextResponse.json(
      { error: "No se pudo actualizar el stock", detalles: error.message },
      { status: 500 }
    );
  }
}