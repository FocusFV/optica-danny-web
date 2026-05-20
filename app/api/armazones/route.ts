import { NextResponse } from "next/server";
import admin from "firebase-admin";
import path from "path";

export const dynamic = "force-dynamic";

if (!admin.apps.length) {
  let credential: admin.ServiceAccount;

  // Si la variable de Vercel existe, la usamos directamente
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    credential = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    // Si estamos en tu compu local, leemos el archivo usando fs de forma asíncrona 
    // para que el compilador no intente meterlo a la fuerza en el build
    const fs = require("fs");
    const path = require("path");
    const rutaLlave = path.join(process.cwd(), "firebase-key.json");
    credential = JSON.parse(fs.readFileSync(rutaLlave, "utf8"));
  }

  admin.initializeApp({
    credential: admin.credential.cert(credential),
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

// 3. EL PUT NUEVO (Para editar el armazón directo en un solo viaje con Firebase Admin)
export async function PUT(request: Request) {
  try {
    console.log("=== ACTUALIZANDO ARMAZÓN CON ADMIN ===");
    const body = await request.json();
    const { id, nombre, precio, stock, descripcion, imagen } = body;

    if (!id) {
      return NextResponse.json({ error: "Falta el ID del armazón" }, { status: 400 });
    }

    // Buscamos el documento por su ID en Firestore
    const productoRef = dbAdmin.collection("armazones").doc(id);

    // Mapeamos los datos básicos para la actualización
    const datosActualizados: any = {
      nombre: nombre || "Sin nombre",
      precio: Number(precio) || 0,
      stock: Number(stock) || 0,
      descripcion: descripcion || ""
    };

    // Si pasaste una nueva URL de imagen desde Cloudinary, la incluimos en el update
    if (imagen) {
      datosActualizados.imagen = imagen;
    }

    // Impactamos los cambios de una
    await productoRef.update(datosActualizados);

    return NextResponse.json({ success: true, message: "Armazón actualizado impecable" });
  } catch (error: any) {
    console.error("❌ ERROR AL ACTUALIZAR ARMAZÓN:", error);
    return NextResponse.json({ error: "No se pudo actualizar el producto", detalles: error.message }, { status: 500 });
  }
}

// 🔥 4. EL DELETE NUEVO (Para borrar el armazón de Firestore al tocar el tachito)
export async function DELETE(request: Request) {
  try {
    console.log("=== ELIMINANDO ARMAZÓN CON ADMIN ===");
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Falta el ID del armazón a eliminar" }, { status: 400 });
    }

    // Apuntamos al documento exacto en la colección de la base de datos
    const productoRef = dbAdmin.collection("armazones").doc(id);

    // Lo borramos de la faz de la tierra
    await productoRef.delete();

    return NextResponse.json({ success: true, message: "Modelo eliminado correctamente" });
  } catch (error: any) {
    console.error("❌ ERROR AL ELIMINAR ARMAZÓN:", error);
    return NextResponse.json({ error: "No se pudo eliminar el producto", detalles: error.message }, { status: 500 });
  }
}