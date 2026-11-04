import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const isAuth = await verifyAdminAuth(request);
  return NextResponse.json({ authenticated: isAuth });
}
