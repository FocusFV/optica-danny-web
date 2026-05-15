import { initializeApp, getApps, getApp } from "firebase/app";
// Usamos initializeFirestore para poder meterle la configuración forzada de HTTP
import { initializeFirestore } from "firebase/firestore"; 

// Configuramos el objeto usando de forma segura tus variables de entorno del .env.local
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Inicializamos la App de Firebase (evitando que Next.js la duplique al recargar)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 🔥 EL PARCHE CLAVE: Forzamos a Firestore a comunicarse por HTTP estándar (Long Polling)
// Esto salta cualquier bloqueo de puertos o firewalls que te causaba el error de GrpcConnection
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});