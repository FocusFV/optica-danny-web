import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // 🔥 CORRECCIÓN CLAVE NEXT.JS 15: Esperamos a que los params se resuelvan asíncronamente
    const { id } = await params;
    
    const body = await request.json();

    // Referencia al documento exacto en la colección de Firestore
    const productoRef = doc(db, "armazones", id);

    // Actualizamos los campos en la base de datos
    await updateDoc(productoRef, {
      nombre: body.nombre,
      precio: Number(body.precio),
      stock: Number(body.stock),
      descripcion: body.descripcion || "",
      material: body.material || "Acetato Premium"
    });

    return NextResponse.json({ success: true, message: "Armazón actualizado impecable" });
  } catch (error: any) {
    console.error("❌ Error en la ruta PUT de administración:", error);
    return NextResponse.json(
      { error: "No se pudo actualizar el producto", detalles: error.message },
      { status: 500 }
    );
  }
}