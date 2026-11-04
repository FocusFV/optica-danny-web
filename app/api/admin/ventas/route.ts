import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyAdminAuth } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "No autorizado. Se requieren credenciales de administrador." },
        { status: 401 }
      );
    }

    const snapshot = await adminDb
      .collection("ventas")
      .orderBy("fecha", "desc")
      .get();

    const ventas = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(ventas);
  } catch (error: any) {
    console.error("❌ Error al traer el historial de ventas:", error);
    return NextResponse.json(
      { error: "No se pudo cargar el historial", detalles: error.message },
      { status: 500 }
    );
  }
}
