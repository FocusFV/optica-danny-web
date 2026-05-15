import { NextResponse } from "next/server";
import admin from "firebase-admin";
import path from "path";

export const dynamic = "force-dynamic";

if (!admin.apps.length) {
  // Si estamos en Vercel, la llave viene como un texto plano en las variables de entorno
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : require(path.join(process.cwd(), "firebase-key.json")); // Si falla (en local), busca tu archivo

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

const dbAdmin = admin.firestore();

// 👇 ACÁ ESTÁ EL CAMBIO: Tipamos 'context' exactamente como lo pide Vercel
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> } // <-- Le decimos que params es una Promesa
) {
  try {
    // Esperamos a la promesa de los params de forma segura
    const params = await context.params;
    const id = params?.id;
    
    console.log("======================================");
    console.log(`🔍 BUSCANDO EN FIREBASE EL ID: "${id}"`);
    console.log("======================================");

    if (!id) {
      return NextResponse.json({ error: "Falta el ID" }, { status: 400 });
    }

    const docRef = dbAdmin.collection("armazones").doc(id);
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
      descripcion: data?.descripcion || ""
    });

  } catch (error) {
    console.error("❌ ERROR EN API DETALLE:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}