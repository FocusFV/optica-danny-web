// Definimos la estructura exacta que tiene un armazón
export interface Armazon {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  stock: number;
  descripcion: string;
}

// Esta función ahora solo hace un fetch a nuestra API interna
export async function obtenerArmazones(): Promise<Armazon[]> {
  try {
    const respuesta = await fetch('/api/armazones');
    if (!respuesta.ok) {
      throw new Error("Error al consultar la API interna");
    }
    const datos = await respuesta.json();
    return datos as Armazon[];
  } catch (error) {
    console.error("Error en obtenerArmazones cliente:", error);
    return [];
  }
}