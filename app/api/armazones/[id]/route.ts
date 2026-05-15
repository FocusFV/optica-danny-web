import { NextResponse } from "next/server";
import admin from "firebase-admin";
import path from "path";

export const dynamic = "force-dynamic";

if (!admin.apps.length) {
  const rutaLlave = path.join(process.cwd(), "firebase-key.json");
  admin.initializeApp({
    credential: admin.credential.cert(rutaLlave),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

const dbAdmin = admin.firestore();

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    // Forzamos a esperar los parámetros para evitar desajustes de Next.js
    const params = await context.params;
    const id = params?.id;
    
    console.log("======================================");
    console.log(`🔍 BUSCANDO EN FIREBASE EL ID: "${id}"`);
    console.log("======================================");

    if (!id) {
      return NextResponse.json({ error: "Falta el ID" }, { status: 400 });
    }

    // Buscamos en la colección exacta
    const docRef = dbAdmin.collection("armazones").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      console.log(`❌ ERROR: El ID "${id}" no existe en la colección armazones de Firestore.`);
      return NextResponse.json({ error: "No se encontró el modelo" }, { status: 404 });
    }

    const data = docSnap.data();
    
    return NextResponse.json({
      id: docSnap.id,
      nombre: data?.nombre || "Sin nombre",
      precio: Number(data?.precio) || 0,
      imagen: data?.imagen || "",
      stock: Number(data?.stock) || 0,
      descripcion: data?.descripcion || ""
    });

  } catch (error) {
    console.error("❌ ERROR EN API DETALLE:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}