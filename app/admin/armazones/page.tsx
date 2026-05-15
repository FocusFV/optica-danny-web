"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Armazon {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  stock: number;
  descripcion: string;
}

export default function DetalleArmazonPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [armazon, setArmazon] = useState<Armazon | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function cargarDetalle() {
      try {
        // Le pegamos a la API dinámica que creamos antes
        const res = await fetch(`/api/armazones/${id}`);
        if (!res.ok) {
          throw new Error("No se encontró el armazón");
        }
        const data = await res.json();
        setArmazon(data);
      } catch (error) {
        console.error("Error al cargar el detalle:", error);
      } finally {
        setCargando(false);
      }
    }

    cargarDetalle();
  }, [id]);

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#001529] text-white flex items-center justify-center">
        <p className="text-[#c5a059] animate-pulse tracking-widest uppercase text-sm">Cargando detalles premium...</p>
      </div>
    );
  }

  if (!armazon) {
    return (
      <div className="min-h-screen bg-[#001529] text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold text-amber-500 mb-4">El armazón no existe o fue eliminado</h2>
        <Link href="/" className="text-white/70 border border-white/20 px-4 py-2 rounded hover:bg-white/10 transition-colors">
          Volver al Inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001529] text-white relative overflow-hidden flex items-center justify-center p-6">
      {/* Fondo estético igual al Home */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#051e34] via-[#001529] to-[#001529]"></div>

      <div className="relative z-10 w-full max-w-4xl bg-[#001529]/60 border border-[#c5a059]/10 p-8 rounded-3xl shadow-2xl backdrop-blur-md grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Columna Izquierda: Imagen Gigante */}
        <div className="aspect-square w-full overflow-hidden rounded-2xl bg-neutral-900 border border-white/5 flex items-center justify-center">
          <img 
            src={armazon.imagen || "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop"} 
            alt={armazon.nombre} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Columna Derecha: Información Técnica */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-[#c5a059] font-black uppercase tracking-[0.3em]">
              {armazon.stock > 0 ? `Disponibles en Óptica: ${armazon.stock} unidades` : "Agotado temporalmente"}
            </span>
            
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mt-2 mb-4">
              {armazon.nombre}
            </h1>

            <div className="h-px w-20 bg-[#c5a059] mb-6 opacity-60"></div>

            <p className="text-neutral-300 text-sm leading-relaxed mb-6">
              {armazon.descripcion || "Este modelo cuenta con un diseño ergonómico y cristales de alta definición, ideal para asegurar el máximo confort y estilo en tu día a día."}
            </p>
          </div>

          <div>
            <div className="bg-[#051e34]/50 border border-[#c5a059]/10 rounded-xl p-4 mb-6 flex justify-between items-center">
              <span className="text-neutral-400 text-xs uppercase tracking-wider">Precio Exclusivo</span>
              <span className="text-[#c5a059] font-black text-2xl">${armazon.precio} MXN</span>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => router.back()}
                className="w-1/3 border border-white/10 text-white/70 text-xs font-bold uppercase tracking-widest p-3 rounded-xl hover:bg-white/5 transition-all text-center"
              >
                Volver
              </button>
              
              <Link
                href="/#contacto"
                className="w-2/3 bg-[#c5a059] hover:bg-[#b08e4f] text-black font-black text-xs uppercase tracking-widest p-3 rounded-xl transition-all text-center flex items-center justify-center"
              >
                Consultar por WhatsApp
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}