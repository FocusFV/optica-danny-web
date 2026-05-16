import { NextResponse } from "next/server";
import admin from "firebase-admin";
import path from "path";

// Inicializamos Firebase Admin si no está (usando la lógica segura que armamos ayer)
if (!admin.apps.length) {
  let credential: admin.ServiceAccount;
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    credential = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    const fs = require("fs");
    const path = require("path");
    const rutaLlave = path.join(process.cwd(), "firebase-key.json");
    credential = JSON.parse(fs.readFileSync(rutaLlave, "utf8"));
  }

  admin.initializeApp({
    credential: admin.credential.cert(credential),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // El bucket que agregamos
  });
}

const bucket = admin.storage().bucket();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No se encontró ningún archivo" }, { status: 400 });
    }

    // Convertimos el archivo a un Buffer para que Node lo pueda procesar
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Creamos un nombre único para que no se pisen las fotos
    const nombreArchivo = `armazones/${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    const fileRef = bucket.file(nombreArchivo);

    // Subimos el archivo al Storage de Firebase
    await fileRef.save(buffer, {
      metadata: { contentType: file.type },
    });

    // Hacemos el archivo público para poder usar la URL en la web
    await fileRef.makePublic();

    // Esta es la URL pública oficial de Google de tu imagen
    const urlPublica = `https://storage.googleapis.com/${bucket.name}/${nombreArchivo}`;

    return NextResponse.json({ success: true, url: urlPublica });

  } catch (error) {
    console.error("❌ ERROR AL SUBIR IMAGEN:", error);
    return NextResponse.json({ error: "Error interno al subir archivo" }, { status: 500 });
  }
}