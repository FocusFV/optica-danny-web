import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "optica-danny-merida-secret-2026";
const ADMIN_PIN = process.env.ADMIN_PIN || "2026";

/**
 * Genera un token firmado para la sesión de administrador.
 */
export function generateAdminSessionToken(): string {
  const hmac = crypto.createHmac("sha256", ADMIN_SECRET);
  hmac.update(`admin-authenticated:${ADMIN_PIN}`);
  return hmac.digest("hex");
}

/**
 * Valida si el PIN ingresado por el usuario es correcto.
 */
export function isValidPin(pin: string): boolean {
  if (!pin) return false;
  return pin.trim() === ADMIN_PIN.trim();
}

/**
 * Verifica si un token corresponde a una sesión de administrador válida.
 */
export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const expectedToken = generateAdminSessionToken();
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(expectedToken)
  );
}

/**
 * Valida la sesión de administrador en una ruta API leyendo cookies o header Authorization.
 */
export async function verifyAdminAuth(request?: Request): Promise<boolean> {
  try {
    // 1. Revisar cookie HTTP-Only 'admin_session'
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("admin_session");
    if (sessionCookie?.value && isValidSessionToken(sessionCookie.value)) {
      return true;
    }

    // 2. Revisar header Authorization si se envía desde clientes API o fetch
    if (request) {
      const authHeader = request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);
        if (isValidSessionToken(token)) {
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    console.error("Error al verificar autenticación admin:", error);
    return false;
  }
}
