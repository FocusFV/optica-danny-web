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

// 1. EL GET QUE YA TENEMOS (Para leer de "armazones")
export async function GET() {
  try {
    console.log("=== LEYENDO ARMAZONES CON FIREBASE ADMIN ===");
    const snapshot = await dbAdmin.collection("armazones").get();
    
    const lista = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        nombre: data.nombre || "",
        precio: Number(data.precio) || 0,
        imagen: data.imagen || "",
        stock: Number(data.stock) || 0,
        descripcion: data.descripcion || ""
      };
    });
    
    return NextResponse.json(lista);
  } catch (error) {
    console.error("❌ ERROR EN GET DE ARMAZONES:", error);
    return NextResponse.json({ error: "Error en la consulta" }, { status: 500 });
  }
}

// 2. EL POST NUEVO (Para guardar un armazón entero desde el código de un solo viaje)
export async function POST(request: Request) {
  try {
    console.log("=== AGREGANDO NUEVO ARMAZÓN CON ADMIN ===");
    
    // El código recibe el paquete de datos entero que viene desde el formulario
    const body = await request.json();
    
    // Desestructuramos los campos que te manda la web
    const { nombre, precio, imagen, stock, descripcion } = body;

    // Se guarda en Firebase todo junto en un milisegundo
    const nuevoDoc = await dbAdmin.collection("armazones").add({
      nombre: nombre || "Sin nombre",
      precio: Number(precio) || 0,
      imagen: imagen || "",
      stock: Number(stock) || 0,
      descripcion: descripcion || "",
      creadoEn: new Date() // Un extra para saber cuándo lo cargaste
    });

    return NextResponse.json({ 
      success: true, 
      message: "Armazón cargado de una", 
      id: nuevoDoc.id 
    });

  } catch (error) {
    console.error("❌ ERROR AL CREAR ARMAZÓN:", error);
    return NextResponse.json({ error: "No se pudo guardar el producto" }, { status: 500 });
  }
}