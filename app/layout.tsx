import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BUSINESS_INFO } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${BUSINESS_INFO.name} — Armazones y Lentes en Mérida`,
  description:
    "Óptica Danny en Mérida, Yucatán. Armazones seleccionados, cristales adaptados a tu receta médica y atención personalizada con entregas en Mérida.",
  keywords: [
    "Óptica Danny",
    "Lentes Mérida",
    "Armazones Mérida",
    "Lentes con receta Mérida",
    "Lentes de Sol Mérida",
    "Ray-Ban Mérida",
    "Óptica a domicilio Mérida",
  ],
  authors: [{ name: "Óptica Danny" }],
  openGraph: {
    title: `${BUSINESS_INFO.name} — Armazones y Lentes en Mérida`,
    description:
      "Elegí tus armazones, mandanos tu receta médica y te entregamos tus lentes listos para usar en Mérida.",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-[#001529] text-white antialiased`}>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
