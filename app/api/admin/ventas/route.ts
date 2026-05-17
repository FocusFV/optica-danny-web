import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function GET() {
  try {
    const ventasRef = collection(db, "ventas");
    // Traemos las ventas ordenadas de la más nueva a la más vieja
    const q = query(ventasRef, orderBy("fecha", "desc"));
    const querySnapshot = await getDocs(q);

    const ventas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
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