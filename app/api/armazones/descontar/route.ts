import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase"; 
import { doc, runTransaction, collection, addDoc } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    // Ahora le pedimos también el nombre del comprador y el precio que pagó
    const { id, nombreComprador, nombreLente, precio } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Falta el ID del armazón" }, { status: 400 });
    }

    const docRef = doc(db, "armazones", id);

    // Usamos la transacción para hacer las dos cosas juntas de forma segura
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(docRef);
      if (!sfDoc.exists()) {
        throw new Error("El documento del armazón no existe");
      }

      const nuevoStock = sfDoc.data().stock - 1;
      
      if (nuevoStock >= 0) {
        // 1. Restamos el stock del lente
        transaction.update(docRef, { stock: nuevoStock });
      } else {
        throw new Error("No hay stock disponible");
      }
    });

    // 2. Guardamos el registro de la venta en una nueva colección de Firestore
    await addDoc(collection(db, "ventas"), {
      armazonId: id,
      armazonNombre: nombreLente || "Modelo Premium",
      comprador: nombreComprador || "Cliente Web",
      monto: Number(precio) || 0,
      fecha: new Date().toISOString(), // Fecha y hora exacta de la compra
      estado: "Aprobado"
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