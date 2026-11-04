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
  title: `${BUSINESS_INFO.name} — Luxury Eyewear & Alta Gama Visual`,
  description:
    "Óptica Danny en Mérida, Yucatán. Armazones exclusivos, marcas internacionales, examen de la vista computarizado y tecnología de vanguardia para tu mirada.",
  keywords: [
    "Óptica Danny",
    "Lentes Mérida",
    "Armazones Mérida",
    "Examen de la vista Mérida",
    "Lentes de Sol",
    "Ray-Ban Mérida",
    "Oakley",
    "Alta Gama Visual",
  ],
  authors: [{ name: "Óptica Danny" }],
  openGraph: {
    title: `${BUSINESS_INFO.name} — Alta Gama Visual en Mérida`,
    description:
      "Descubrí tu estilo con nuestra colección exclusiva de armazones oftálmicos, de sol y smart glasses.",
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
