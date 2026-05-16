"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdminArmazonesPage() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [stock, setStock] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje("");

    try {
      const res = await fetch("/api/armazones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          precio: Number(precio),
          imagen,
          stock: Number(stock),
          descripcion,
        }),
      });

      if (!res.ok) throw new Error("Error al guardar el armazón");

      setMensaje("✅ ¡Armazón guardado con éxito!");
      setNombre("");
      setPrecio("");
      setImagen("");
      setStock("");
      setDescripcion("");
    } catch (error) {
      console.error(error);
      setMensaje("❌ Hubo un problema al guardar.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#001529] text-white relative overflow-hidden flex flex-col justify-between p-4 md:p-8">
      {/* Fondo con grilla de cruces decorativas tipo Óptica Premium */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#051e34] via-[#001529] to-[#001529]"></div>
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Header del Panel */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex justify-between items-center mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-[#c5a059] font-black tracking-widest text-lg">ÓPTICA DANNY</span>
          <span className="bg-[#c5a059]/10 text-[#c5a059] text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-[#c5a059]/20">Studio</span>
        </div>
        <Link href="/" className="text-xs text-neutral-400 hover:text-[#c5a059] uppercase tracking-widest transition-colors flex items-center gap-1 group">
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Volver a la Web
        </Link>
      </header>

      {/* Contenedor Principal */}
      <main className="relative z-10 w-full max-w-xl mx-auto my-auto">
        <div className="relative group rounded-3xl overflow-hidden bg-gradient-to-b from-[#c5a059]/20 to-transparent p-[1px] transition-all duration-500 hover:shadow-[0_0_50px_rgba(197,160,89,0.1)]">
          
          {/* Cuerpo del Formulario */}
          <div className="bg-[#021120]/90 p-6 md:p-10 rounded-[23px] backdrop-blur-xl relative z-10">
            <div className="text-center mb-8">
              <span className="text-[10px] text-[#c5a059] font-black uppercase tracking-[0.4em] block mb-2">Internal Management</span>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight uppercase text-white">
                Ingreso de Stock
              </h1>
              <div className="h-0.5 w-12 bg-gradient-to-r from-[#c5a059] to-transparent mx-auto mt-3 opacity-80"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Campo Nombre */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Nombre del Armazón</label>
                <input 
                  type="text" 
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value)} 
                  required 
                  className="w-full bg-[#001529]/60 border border-white/10 rounded-xl p-3.5 text-sm font-medium text-white placeholder-neutral-600 focus:border-[#c5a059] focus:bg-[#001529] focus:ring-1 focus:ring-[#c5a059]/20 outline-none transition-all" 
                  placeholder="Ej: Ray-Ban Meta Wayfarer Gen.2" 
                />
              </div>

              {/* Grid Precio y Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Precio (MXN)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 text-sm font-bold">$</span>
                    <input 
                      type="number" 
                      value={precio} 
                      onChange={(e) => setPrecio(e.target.value)} 
                      required 
                      className="w-full bg-[#001529]/60 border border-white/10 rounded-xl p-3.5 pl-7 text-sm font-medium text-white placeholder-neutral-600 focus:border-[#c5a059] focus:bg-[#001529] outline-none transition-all" 
                      placeholder="3899" 
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Unidades en Stock</label>
                  <input 
                    type="number" 
                    value={stock} 
                    onChange={(e) => setStock(e.target.value)} 
                    required 
                    className="w-full bg-[#001529]/60 border border-white/10 rounded-xl p-3.5 text-sm font-medium text-white placeholder-neutral-600 focus:border-[#c5a059] focus:bg-[#001529] outline-none transition-all" 
                    placeholder="5" 
                  />
                </div>
              </div>

              {/* Campo Imagen */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-bold">URL del render (PNG Transparente)</label>
                <input 
                  type="url" 
                  value={imagen} 
                  onChange={(e) => setImagen(e.target.value)} 
                  required 
                  className="w-full bg-[#001529]/60 border border-white/10 rounded-xl p-3.5 text-sm font-mono text-xs text-neutral-300 placeholder-neutral-600 focus:border-[#c5a059] focus:bg-[#001529] outline-none transition-all" 
                  placeholder="https://images.unsplash.com/..." 
                />
              </div>

              {/* Campo Descripción */}
              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Descripción del Producto</label>
                <textarea 
                  value={descripcion} 
                  onChange={(e) => setDescripcion(e.target.value)} 
                  rows={3} 
                  className="w-full bg-[#001529]/60 border border-white/10 rounded-xl p-3.5 text-sm font-medium text-white placeholder-neutral-600 focus:border-[#c5a059] focus:bg-[#001529] outline-none transition-all resize-none leading-relaxed" 
                  placeholder="Detalles de los materiales, ergonomía, color de cristales o si admite graduación..." 
                />
              </div>

              {/* Botón de Envió con Feedback visual */}
              <button 
                type="submit" 
                disabled={cargando} 
                className="w-full relative group/btn overflow-hidden bg-gradient-to-r from-[#c5a059] to-[#dfba75] disabled:from-neutral-700 disabled:to-neutral-800 text-black font-black text-xs uppercase tracking-[0.2em] p-4 rounded-xl transition-all shadow-lg active:scale-[0.98]"
              >
                <span className="relative z-10">
                  {cargando ? "Guardando en la nube..." : "Publicar Armazón"}
                </span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ease-out z-0"></div>
              </button>
            </form>

            {/* Mensajes flotantes de éxito/error */}
            {mensaje && (
              <div className={`mt-6 p-3 rounded-xl text-xs font-bold uppercase tracking-wider text-center border animate-fade-in ${
                mensaje.includes("✅") 
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                  : "bg-rose-500/10 border-rose-500/20 text-rose-400"
              }`}>
                {mensaje}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer corporativo sutil */}
      <footer className="relative z-10 w-full text-center text-[10px] text-neutral-600 uppercase tracking-widest mt-6">
        © 2026 Óptica Danny — Todos los derechos reservados.
      </footer>
    </div>
  );
}