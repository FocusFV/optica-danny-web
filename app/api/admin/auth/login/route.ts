import { NextResponse } from "next/server";
import { isValidPin, generateAdminSessionToken } from "@/lib/admin-auth";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pin } = body;

    if (!pin || !isValidPin(pin)) {
      return NextResponse.json(
        { error: "PIN incorrecto. Acceso denegado." },
        { status: 401 }
      );
    }

    const token = generateAdminSessionToken();

    // Guardar cookie HTTP-Only segura
    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días de validez
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Credenciales verificadas con éxito.",
      token,
    });
  } catch (error: any) {
    console.error("Error en login admin:", error);
    return NextResponse.json(
      { error: "Error interno al verificar credenciales" },
      { status: 500 }
    );
  }
}
