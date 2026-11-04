import { Armazon } from "./armazones";

export interface ArmazonEnriquecido extends Armazon {
  sku: string;
  calibre: number | null;
  puente: number | null;
  varilla: number | null;
  medidas: string | null;
  color: string;
  estilo: string;
  filtro_especial?: string;
  imagenes: string[];
}

// Catálogo base de referencia para enriquecer modelos conocidos de Óptica Danny
const DICCIONARIO_MODELOS: Record<
  string,
  {
    sku: string;
    calibre: number;
    puente: number;
    varilla: number;
    medidas: string;
    estilo: string;
    color: string;
    filtro_especial?: string;
    imagenesExtra?: string[];
  }
> = {
  Armenia_ARTM610Z_Magenta: {
    sku: "OPT-ARM-610Z",
    calibre: 47,
    puente: 21,
    varilla: 140,
    medidas: "47□21-140",
    estilo: "Redondo Clásico / Panto",
    color: "C4 Magenta Traslúcido & Dorado",
  },
  Caffsen_6016_GrisHumo: {
    sku: "OPT-CAF-6016",
    calibre: 55,
    puente: 18,
    varilla: 143,
    medidas: "55□18-143",
    estilo: "Cuadrado Oversize Traslúcido",
    color: "C3 Gris Humo Traslúcido",
  },
  DDElegance_GA626_NegroDegrade: {
    sku: "OPT-DDE-0626",
    calibre: 51,
    puente: 19,
    varilla: 134,
    medidas: "51□19-134",
    estilo: "Rectangular Soft Dégradé",
    color: "Negro Dégradé a Cristal & Silver",
  },
  Elegancia_E9876A_AzulDegrade: {
    sku: "OPT-ELE-9876",
    calibre: 56,
    puente: 18,
    varilla: 150,
    medidas: "56□18-150",
    estilo: "Cat-Eye Contemporáneo Dégradé",
    color: "Azul Noche a Verde Agua Dégradé",
  },
  Generico_RedondoAlambre_Plateado: {
    sku: "OPT-GEN-SILVER",
    calibre: 49,
    puente: 20,
    varilla: 140,
    medidas: "49□20-140",
    estilo: "Redondo Alambre Clásico Intelectual",
    color: "Plateado Brillante",
  },
  OlivePremium_Ocean303C_Burgundy: {
    sku: "OPT-OLI-303C",
    calibre: 53,
    puente: 16,
    varilla: 140,
    medidas: "53□16-140",
    estilo: "Cat-Eye Elegante con Strass",
    color: "Burgundy & Gold con Strass",
  },
  Seima_SM458_GunmetalDorado: {
    sku: "OPT-SEI-0458",
    calibre: 48,
    puente: 19,
    varilla: 135,
    medidas: "48□19-135",
    estilo: "Clubmaster con Alma Labrada",
    color: "Gunmetal & Dorado",
  },
};

export function limpiarMaterial(raw?: string): string {
  if (!raw) return "Acetato";
  const r = raw.toLowerCase();
  const hasAcetato = r.includes("acetato");
  const hasMetal =
    r.includes("metal") ||
    r.includes("alambre") ||
    r.includes("aleación") ||
    r.includes("acero") ||
    r.includes("gunmetal") ||
    r.includes("dorado") ||
    r.includes("plateado");
  const hasTR90 = r.includes("tr90") || r.includes("ultem") || r.includes("polímero");

  if (hasAcetato && hasMetal) return "Acetato + Metal";
  if (hasTR90 && hasMetal) return "TR90 + Metal";
  if (hasAcetato) return "Acetato";
  if (hasMetal) return "Metal";
  if (hasTR90) return "TR90";
  return "Acetato";
}

/**
 * Parser inteligente de medidas ópticas y atributos
 * Extrae calibre, puente, varilla y SKU a partir de la descripción o del diccionario
 */
export function enriquecerArmazon(item: Armazon): ArmazonEnriquecido {
  const conocido = DICCIONARIO_MODELOS[item.id];

  const desc = item.descripcion || "";
  const nombre = item.nombre || "";
  const str = `${desc} ${nombre}`;

  let calibre = conocido?.calibre ?? null;
  let puente = conocido?.puente ?? null;
  let varilla = conocido?.varilla ?? null;
  let medidas = conocido?.medidas ?? null;
  let estilo = conocido?.estilo ?? "";
  let color = conocido?.color ?? "";
  let sku = conocido?.sku ?? "";

  // Material 100% puro y limpio sin colores
  const materialLimpio = limpiarMaterial(item.material);

  // 1. Parser regex de respaldo si no está en el diccionario
  if (!calibre || !puente || !varilla) {
    const medSquare = str.match(/(\d{2})\s*□\s*(\d{2})\s*[-–\s]\s*(\d{3})/);
    if (medSquare) {
      calibre = calibre ?? parseInt(medSquare[1]);
      puente = puente ?? parseInt(medSquare[2]);
      varilla = varilla ?? parseInt(medSquare[3]);
      medidas = medidas ?? medSquare[0];
    }

    const medDash = str.match(/medidas\s*:?\s*(\d{2})[-–](\d{2})[-–](\d{3})/i);
    if (medDash) {
      calibre = calibre ?? parseInt(medDash[1]);
      puente = puente ?? parseInt(medDash[2]);
      varilla = varilla ?? parseInt(medDash[3]);
      medidas = medidas ?? `${medDash[1]}□${medDash[2]}-${medDash[3]}`;
    }

    const medOlive = str.match(/(\d{2})[-–]\d{2}[-–](\d{2})\s+(\d{3})/);
    if (medOlive) {
      calibre = calibre ?? parseInt(medOlive[1]);
      puente = puente ?? parseInt(medOlive[2]);
      varilla = varilla ?? parseInt(medOlive[3]);
      medidas = medidas ?? `${medOlive[1]}□${medOlive[2]}-${medOlive[3]}`;
    }

    const calMatch = str.match(/calibre\s*:?\s*(\d{2})/i);
    if (calMatch && !calibre) calibre = parseInt(calMatch[1]);

    const pteMatch = str.match(/puente\s*:?\s*(\d{2})/i);
    if (pteMatch && !puente) puente = parseInt(pteMatch[1]);

    const varMatch = str.match(/(?:patilla|varilla)\s*:?\s*(\d{3})/i);
    if (varMatch && !varilla) varilla = parseInt(varMatch[1]);
  }

  // Generar formato de medidas si faltaba
  if (calibre && puente && varilla && !medidas) {
    medidas = `${calibre}□${puente}-${varilla}`;
  }

  // Generar SKU limpio si no existía
  if (!sku) {
    const brandCode = (item.marca || "DANNY").substring(0, 3).toUpperCase();
    const cleanId = item.id.replace(/[^a-zA-Z0-9]/g, "").substring(0, 4).toUpperCase();
    sku = `OPT-${brandCode}-${cleanId}`;
  }

  // Estilo por defecto si no existía
  if (!estilo) {
    if (str.toLowerCase().includes("cat-eye") || str.toLowerCase().includes("cateye")) {
      estilo = "Cat-Eye Femenino";
    } else if (str.toLowerCase().includes("aviador")) {
      estilo = "Aviador Doble Puente";
    } else if (str.toLowerCase().includes("redondo") || str.toLowerCase().includes("panto")) {
      estilo = "Redondo / Panto Clásico";
    } else if (str.toLowerCase().includes("clubmaster") || str.toLowerCase().includes("browline")) {
      estilo = "Clubmaster Contemporáneo";
    } else if (str.toLowerCase().includes("rectangular") || str.toLowerCase().includes("wayfarer")) {
      estilo = "Rectangular Ejecutivo";
    } else if (str.toLowerCase().includes("cuadrado")) {
      estilo = "Cuadrado Moderno";
    } else {
      estilo = "Diseño Oftálmico";
    }
  }

  // Color por defecto si no existía
  if (!color) {
    const colMatch = str.match(/(?:color|tono)\s*:?\s*([^,.\n]+)/i);
    if (colMatch) {
      color = colMatch[1].trim();
    } else {
      color = item.material?.includes("Negro") ? "Negro" : item.material || "Acabado Pulido";
    }
  }

  // Array de imágenes
  const imagenes: string[] = [];
  if (item.imagen) {
    imagenes.push(item.imagen);
  }
  if (conocido?.imagenesExtra) {
    conocido.imagenesExtra.forEach((img) => {
      if (!imagenes.includes(img)) imagenes.push(img);
    });
  }

  return {
    ...item,
    sku,
    calibre,
    puente,
    varilla,
    medidas,
    color,
    material: materialLimpio,
    estilo,
    filtro_especial: str.toLowerCase().includes("uv420") || str.toLowerCase().includes("luz azul") 
      ? "UV420 Blue Light" 
      : undefined,
    imagenes: imagenes.length > 0 ? imagenes : [item.imagen || "/placeholder-lente.png"],
  };
}
