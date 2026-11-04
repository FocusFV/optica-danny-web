// Definición formal y estructurada de un Armazón en Óptica Danny
export interface Armazon {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  stock: number;
  descripcion: string;
  categoria?: "oftalmico" | "sol" | "inteligente" | string;
  genero?: "hombre" | "mujer" | "unisex" | string;
  marca?: string;
  material?: string;
}

// Consulta de armazones hacia la API interna
export async function obtenerArmazones(): Promise<Armazon[]> {
  try {
    const respuesta = await fetch("/api/armazones");
    if (!respuesta.ok) {
      throw new Error("Error al consultar la API de armazones");
    }
    const datos = await respuesta.json();
    return datos as Armazon[];
  } catch (error) {
    console.error("Error en obtenerArmazones cliente:", error);
    return [];
  }
}
