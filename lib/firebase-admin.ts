import admin from "firebase-admin";
import path from "path";
import fs from "fs";

/**
 * Inicializador singleton seguro de Firebase Admin para Next.js App Router.
 * Soporta credenciales inyectadas vía variable FIREBASE_SERVICE_ACCOUNT (Vercel)
 * o archivo local firebase-key.json en la raíz del proyecto.
 */
function initializeAdmin(): admin.app.App {
  if (admin.apps.length > 0) {
    return admin.apps[0]!;
  }

  let credential: admin.ServiceAccount | null = null;

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      credential = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (e) {
      console.error("❌ Error al parsear FIREBASE_SERVICE_ACCOUNT:", e);
    }
  } else {
    const rutaLlave = path.join(process.cwd(), "firebase-key.json");
    if (fs.existsSync(rutaLlave)) {
      try {
        const contenido = fs.readFileSync(rutaLlave, "utf8");
        credential = JSON.parse(contenido);
      } catch (e) {
        console.error("❌ Error al leer firebase-key.json:", e);
      }
    }
  }

  if (!credential) {
    console.warn("⚠️ No se encontraron credenciales de Firebase Admin (ni FIREBASE_SERVICE_ACCOUNT ni firebase-key.json).");
  }

  const app = admin.initializeApp({
    credential: credential ? admin.credential.cert(credential) : admin.credential.applicationDefault(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });

  return app;
}

const adminApp = initializeAdmin();

export const adminDb = adminApp.firestore();
export const adminStorage = adminApp.storage();

export default admin;
