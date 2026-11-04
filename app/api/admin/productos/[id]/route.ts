import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyAdminAuth } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "No autorizado. Se requieren credenciales de administrador." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const productoRef = adminDb.collection("armazones").doc(id);

    const datosActualizados: Record<string, unknown> = {
      nombre: body.nombre,
      precio: Number(body.precio),
      stock: Number(body.stock),
      descripcion: body.descripcion || "",
      material: body.material || "Acetato Premium",
      categoria: body.categoria || "oftalmico",
      genero: body.genero || "unisex",
      marca: body.marca || "Óptica Danny",
      actualizadoEn: new Date(),
    };

    if (body.imagen) {
      datosActualizados.imagen = body.imagen;
    }

    await productoRef.update(datosActualizados);

    return NextResponse.json({ success: true, message: "Armazón actualizado correctamente" });
  } catch (error: any) {
    console.error("❌ Error en la ruta PUT de administración:", error);
    return NextResponse.json(
      { error: "No se pudo actualizar el producto", detalles: error.message },
      { status: 500 }
    );
  }
}
