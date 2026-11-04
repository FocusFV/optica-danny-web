import { NextResponse } from "next/server";
import { adminStorage } from "@/lib/firebase-admin";
import { verifyAdminAuth } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "No autorizado. Solo el administrador puede subir archivos." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No se encontró ningún archivo" }, { status: 400 });
    }

    const bucket = adminStorage.bucket();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const nombreArchivo = `armazones/${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    const fileRef = bucket.file(nombreArchivo);

    await fileRef.save(buffer, {
      metadata: { contentType: file.type },
    });

    await fileRef.makePublic();

    const urlPublica = `https://storage.googleapis.com/${bucket.name}/${nombreArchivo}`;

    return NextResponse.json({ success: true, url: urlPublica });
  } catch (error) {
    console.error("❌ ERROR AL SUBIR IMAGEN:", error);
    return NextResponse.json({ error: "Error interno al subir archivo" }, { status: 500 });
  }
}
