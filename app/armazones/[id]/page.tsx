"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";

interface Armazon {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
  stock: number;
  material?: string;
  dimensiones?: string;
}

export default function ArmazonDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [armazon, setArmazon] = useState<Armazon | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  
  // Estado para controlar qué pestaña técnica está abierta
  const [pestaniaActiva, setPestaniaActiva] = useState("detalles");

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        const res = await fetch(`/api/armazones/${id}`);
        if (!res.ok) throw new Error("No se encontró el modelo");
        const data = await res.json();
        setArmazon(data);
      } catch (err) {
        console.error(err);
        setError("El armazón que buscás no existe o fue retirado del stock.");
      } finally {
        setCargando(false);
      }
    };

    if (id) cargarDetalle();
  }, [id]);

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#001424] flex flex-col justify-center items-center text-white">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-[#c5a059]/10"></div>
          <div className="absolute inset-0 rounded-full border-t-2 border-[#c5a059] animate-spin"></div>
        </div>
        <p className="text-[10px] uppercase tracking-[0.5em] text-[#c5a059] mt-6 font-bold animate-pulse">Cargando Experiencia Premium</p>
      </div>
    );
  }

  if (error || !armazon) {
    return (
      <div className="min-h-screen bg-[#001424] flex flex-col justify-center items-center text-white p-4 text-center">
        <p className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-6">{error || "Error de conexión"}</p>
        <Link href="/" className="text-xs text-[#c5a059] uppercase tracking-widest border border-[#c5a059]/30 px-6 py-3 rounded-full bg-[#c5a059]/5 hover:bg-[#c5a059]/20 transition-all font-black">
          ← Volver al Catálogo
        </Link>
      </div>
    );
  }

  // WhatsApp setup
  const numeroTelefono = "529990000000"; // Cambialo por el tuyo de Mérida
  const textoMensaje = encodeURIComponent(
    `¡Hola Óptica Danny! 👋 Me enamoré de este modelo: "${armazon.nombre}". Quiero consultar la disponibilidad para pasar a probármelo.\n\nEnlace: https://optica-danny.vercel.app/armazones/${armazon.id}`
  );
  const linkWhatsApp = `https://wa.me/${numeroTelefono}?text=${textoMensaje}`;

  return (
    <div className="min-h-screen bg-[#000e1a] text-white relative overflow-hidden flex flex-col justify-between selection:bg-[#c5a059] selection:text-black">
      
      {/* Fondos dinámicos y luces de estudio óptico */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#0b2b47] via-[#000e1a] to-[#000e1a]"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#c5a059]/5 rounded-full blur-[150px] z-0 pointer-events-none"></div>
      <div className="absolute inset-0 z-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* NAVBAR SUPERIOR FLOATING */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 flex justify-between items-center backdrop-blur-sm border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-white font-black tracking-[0.3em] text-sm md:text-base group-hover:text-[#c5a059] transition-colors">ÓPTICA DANNY</span>
          <span className="text-[8px] font-black uppercase text-[#c5a059] bg-[#c5a059]/10 px-2 py-0.5 rounded-md tracking-widest border border-[#c5a059]/20">CATÁLOGO 2026</span>
        </Link>
        <Link href="/" className="text-xs text-neutral-400 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2 font-bold group">
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Volver a la galería
        </Link>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* BLOQUE IZQUIERDO: VISOR DE PRODUCTO LUXURY (6 COLUMNAS) */}
        <div className="lg:col-span-7 space-y-4 w-full">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/10 via-transparent to-transparent p-[1px] shadow-2xl">
            <div className="bg-[#031627]/40 rounded-[23px] backdrop-blur-xl p-8 md:p-16 flex items-center justify-center aspect-square relative group">
              
              {/* Badge de stock flotante */}
              <div className="absolute top-4 left-4 z-20">
                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md border ${
                  armazon.stock > 0 
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.1)]" 
                    : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                }`}>
                  {armazon.stock > 0 ? "Disponible en Tienda" : "Bajo Pedido Especial"}
                </span>
              </div>

              {/* Imagen central con reflejo y sombra pesada */}
              <img 
                src={armazon.imagen} 
                alt={armazon.nombre} 
                className="w-full h-full max-h-[300px] md:max-h-[360px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-700 ease-out z-10 relative"
              />
              
              {/* Brillo de fondo interactivo */}
              <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>
          </div>

          {/* Galería de vistas secundarias (Preparado para cuando haya más fotos) */}
          <div className="grid grid-cols-4 gap-3">
            <div className="border border-[#c5a059]/40 bg-[#031627]/80 rounded-2xl p-2 aspect-square flex items-center justify-center cursor-pointer opacity-100 transition-all hover:border-[#c5a059]">
              <img src={armazon.imagen} alt="Vista principal" className="w-full h-full object-contain max-h-[50px]" />
            </div>
            {/* Espacios vacíos elegantes simulando un catálogo real */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-white/5 bg-[#031627]/20 rounded-2xl p-2 aspect-square flex items-center justify-center opacity-40 hover:opacity-60 transition-all border-dashed">
                <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Ángulo {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BLOQUE DERECHO: DATOS, PRECIO Y CHECKOUT EXPERIMENTAL (5 COLUMNAS) */}
        <div className="lg:col-span-5 space-y-6 md:space-y-8 w-full">
          
          {/* Nombre y Precio */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em]">High-End Eyewear</span>
              <div className="h-px flex-1 bg-[#c5a059]/20"></div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white leading-tight">
              {armazon.nombre}
            </h1>
            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-3xl md:text-4xl font-black text-white tracking-tight">
                ${armazon.precio.toLocaleString("es-MX")}
              </span>
              <span className="text-xs font-black text-[#c5a059] uppercase tracking-widest">MXN</span>
            </div>
          </div>

          {/* PESTAÑAS DE DESCRIPCIÓN TÉCNICA AVANZADA */}
          <div className="border border-white/5 bg-[#031627]/30 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="flex border-b border-white/5 bg-black/20 text-xs font-bold uppercase tracking-wider">
              <button 
                onClick={() => setPestaniaActiva("detalles")}
                className={`flex-1 py-3 text-center transition-all ${pestaniaActiva === "detalles" ? "text-[#c5a059] bg-[#031627]/60 border-b border-[#c5a059]" : "text-neutral-500 hover:text-white"}`}
              >
                Descripción
              </button>
              <button 
                onClick={() => setPestaniaActiva("ficha")}
                className={`flex-1 py-3 text-center transition-all ${pestaniaActiva === "ficha" ? "text-[#c5a059] bg-[#031627]/60 border-b border-[#c5a059]" : "text-neutral-500 hover:text-white"}`}
              >
                Ficha Técnica
              </button>
            </div>
            
            <div className="p-5 text-sm leading-relaxed text-neutral-300 font-medium min-h-[110px]">
              {pestaniaActiva === "detalles" ? (
                <p className="animate-fade-in">
                  {armazon.descripcion || "Este modelo exclusivo combina líneas de vanguardia con una ingeniería de calce perfecta. Ideal tanto para cristales graduados como para filtros solares de alta gama, asegurando ligereza absoluta."}
                </p>
              ) : (
                <div className="space-y-2 text-xs uppercase tracking-wider text-neutral-400 font-bold animate-fade-in">
                  <div className="flex justify-between border-b border-white/5 pb-1"><span>Material:</span> <span className="text-white">{armazon.material || "Acetato Italiano Macizo / Titanio"}</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-1"><span>Bisagras:</span> <span className="text-white">Flex Premium de 5 ejes</span></div>
                  <div className="flex justify-between border-b border-white/5 pb-1"><span>Protección sugerida:</span> <span className="text-white">Blue Defense / Antirreflejante</span></div>
                  <div className="flex justify-between text-[#c5a059]"><span>ID Único:</span> <span className="font-mono text-[10px]">{armazon.id.substring(0,8).toUpperCase()}...</span></div>
                </div>
              )}
            </div>
          </div>

          {/* BOTÓN DE ACCIÓN CENTRAL: WHATSAPP PREMIUM */}
          <div className="space-y-3">
            <a 
              href={linkWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full relative group/btn overflow-hidden bg-gradient-to-r from-[#c5a059] to-[#dfba75] text-black font-black text-xs uppercase tracking-[0.25em] p-4 rounded-xl transition-all shadow-[0_10px_30px_rgba(197,160,89,0.15)] flex items-center justify-center gap-3 active:scale-[0.99] hover:shadow-[0_15px_40px_rgba(197,160,89,0.3)]"
            >
              <span className="relative z-10">Apartar por WhatsApp</span>
              <span className="relative z-10 text-base">💬</span>
              <div className="absolute inset-0 bg-white/30 transform -skew-x-12 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-out z-0"></div>
            </a>
            
            {/* Texto informativo sutil de E-commerce futuro */}
            <p className="text-[10px] text-center text-neutral-500 uppercase tracking-widest font-semibold">
              🔒 Próximamente: Compra directa con tarjeta de crédito/débito
            </p>
          </div>

          {/* GARANTÍAS DE MARCA LUXURY */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-center">
            <div className="p-3 rounded-xl border border-white/5 bg-white/[0.01]">
              <span className="block text-base mb-1">🛡️</span>
              <span className="block text-[8px] font-black uppercase tracking-wider text-neutral-400">Garantía Danny</span>
            </div>
            <div className="p-3 rounded-xl border border-white/5 bg-white/[0.01]">
              <span className="block text-base mb-1">👁️</span>
              <span className="block text-[8px] font-black uppercase tracking-wider text-neutral-400">Ajuste Óptico</span>
            </div>
            <div className="p-3 rounded-xl border border-white/5 bg-white/[0.01]">
              <span className="block text-base mb-1">💳</span>
              <span className="block text-[8px] font-black uppercase tracking-wider text-neutral-400">Meses s/ Interés</span>
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full text-center text-[9px] text-neutral-600 uppercase tracking-widest py-6 border-t border-white/5 mt-12">
        © 2026 Óptica Danny — Luxury Eyewear Experience.
      </footer>
    </div>
  );
}