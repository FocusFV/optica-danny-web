// Datos comerciales y constantes oficiales de Óptica Danny (Mérida, Yucatán)
export const BUSINESS_INFO = {
  name: "Óptica Danny",
  slogan: "Luz para tus ojos — Alta Gama Visual",
  city: "Mérida, Yucatán, México",
  address: "Mérida, Yucatán, México",
  // Teléfono oficial para WhatsApp en formato internacional sin espacios ni signos
  whatsappNumber: "529992207996",
  // Formato visual amigable para mostrar en la interfaz
  whatsappDisplay: "+52 999 220 7996",
  // Enlaces oficiales
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Optica+Danny+Merida",
  instagramUrl: "https://instagram.com/opticadanny", // Reemplazar con el handle oficial
  facebookUrl: "https://facebook.com/opticadanny",
} as const;

// Helper para generar enlaces de WhatsApp con mensajes preformateados
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
