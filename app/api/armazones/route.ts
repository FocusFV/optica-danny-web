import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyAdminAuth } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

// 1. GET: Consulta de todos los armazones del catálogo (PÚBLICO)
export async function GET() {
  try {
    const snapshot = await adminDb.collection("armazones").get();
    
    const lista = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        nombre: data.nombre || "",
        precio: Number(data.precio) || 0,
        imagen: data.imagen || "",
        stock: Number(data.stock) || 0,
        descripcion: data.descripcion || "",
        categoria: data.categoria || "oftalmico",
        genero: data.genero || "unisex",
        marca: data.marca || "Óptica Danny",
        material: data.material || "Acetato Premium",
      };
    });
    
    return NextResponse.json(lista);
  } catch (error) {
    console.error("❌ ERROR EN GET DE ARMAZONES:", error);
    return NextResponse.json({ error: "Error en la consulta" }, { status: 500 });
  }
}

// 2. POST: Guardar un nuevo armazón en el catálogo (PROTEGIDO)
export async function POST(request: Request) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "No autorizado. Se requieren credenciales de administrador." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { nombre, precio, imagen, stock, descripcion, categoria, genero, marca, material } = body;

    const nuevoDoc = await adminDb.collection("armazones").add({
      nombre: nombre || "Sin nombre",
      precio: Number(precio) || 0,
      imagen: imagen || "",
      stock: Number(stock) || 0,
      descripcion: descripcion || "",
      categoria: categoria || "oftalmico",
      genero: genero || "unisex",
      marca: marca || "Óptica Danny",
      material: material || "Acetato Premium",
      creadoEn: new Date(),
    });

    return NextResponse.json({ 
      success: true, 
      message: "Armazón guardado correctamente", 
      id: nuevoDoc.id 
    });
  } catch (error) {
    console.error("❌ ERROR AL CREAR ARMAZÓN:", error);
    return NextResponse.json({ error: "No se pudo guardar el producto" }, { status: 500 });
  }
}

// 3. PUT: Actualizar un armazón existente (PROTEGIDO)
export async function PUT(request: Request) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "No autorizado. Se requieren credenciales de administrador." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, nombre, precio, stock, descripcion, imagen, categoria, genero, marca, material } = body;

    if (!id) {
      return NextResponse.json({ error: "Falta el ID del armazón" }, { status: 400 });
    }

    const productoRef = adminDb.collection("armazones").doc(id);

    const datosActualizados: Record<string, unknown> = {
      nombre: nombre || "Sin nombre",
      precio: Number(precio) || 0,
      stock: Number(stock) || 0,
      descripcion: descripcion || "",
      actualizadoEn: new Date(),
    };

    if (categoria) datosActualizados.categoria = categoria;
    if (genero) datosActualizados.genero = genero;
    if (marca) datosActualizados.marca = marca;
    if (material) datosActualizados.material = material;
    if (imagen) datosActualizados.imagen = imagen;

    await productoRef.update(datosActualizados);

    return NextResponse.json({ success: true, message: "Armazón actualizado correctamente" });
  } catch (error: any) {
    console.error("❌ ERROR AL ACTUALIZAR ARMAZÓN:", error);
    return NextResponse.json(
      { error: "No se pudo actualizar el producto", detalles: error.message },
      { status: 500 }
    );
  }
}

// 4. DELETE: Eliminar un armazón por ID (PROTEGIDO)
export async function DELETE(request: Request) {
  try {
    const isAuthorized = await verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "No autorizado. Se requieren credenciales de administrador." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Falta el ID del armazón a eliminar" }, { status: 400 });
    }

    const productoRef = adminDb.collection("armazones").doc(id);
    await productoRef.delete();

    return NextResponse.json({ success: true, message: "Modelo eliminado correctamente" });
  } catch (error: any) {
    console.error("❌ ERROR AL ELIMINAR ARMAZÓN:", error);
    return NextResponse.json(
      { error: "No se pudo eliminar el producto", detalles: error.message },
      { status: 500 }
    );
  }
}
