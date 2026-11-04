import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyAdminAuth } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Falta el ID" }, { status: 400 });
    }

    const docRef = adminDb.collection("armazones").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: "No se encontró el modelo" }, { status: 404 });
    }

    const data = docSnap.data();

    return NextResponse.json({
      id: docSnap.id,
      nombre: data?.nombre || "Sin nombre",
      precio: Number(data?.precio) || 0,
      imagen: data?.imagen || "",
      stock: Number(data?.stock) || 0,
      descripcion: data?.descripcion || "",
      material: data?.material || "Acetato Premium",
      categoria: data?.categoria || "oftalmico",
      genero: data?.genero || "unisex",
      marca: data?.marca || "Óptica Danny",
    });
  } catch (error) {
    console.error("❌ ERROR EN API DETALLE:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "No autorizado. Se requieren credenciales de administrador." },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Falta el ID" }, { status: 400 });
    }

    const docRef = adminDb.collection("armazones").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: "El armazón no existe" }, { status: 404 });
    }

    await docRef.delete();

    return NextResponse.json({ success: true, message: "Armazón eliminado correctamente" });
  } catch (error) {
    console.error("❌ ERROR AL BORRAR ARMAZÓN:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
