"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero'; 
import About from '../components/About';
import Creators from '../components/Creators';
import Packages from '../components/Packages'; 
import FadeIn from '../components/FadeIn';
import Footer from '../components/Footer';
import Marquee from '../components/Marquee';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import CustomCursor from '../components/CustomCursor';

import { obtenerArmazones, Armazon } from '../lib/armazones';

interface ArmazonExtendida extends Armazon {
  genero?: string;
  tipo?: string;
}

export default function Home() {
  const [armazones, setArmazones] = useState<ArmazonExtendida[]>([]);
  const [cargando, setCargando] = useState(true);

  // --- ESTADOS DE FILTRADO AVANZADO ---
  const [busqueda, setBusqueda] = useState("");
  const [tipoActivo, setTipoActivo] = useState("todos"); // todos, oftalmicos, sol, inteligentes
  const [generoActivo, setGeneroActivo] = useState("todos"); // todos, hombre, mujer, unisex
  const [precioMaximo, setPrecioMaximo] = useState<number>(12000); // Rango de precio
  
  // 🔥 NUEVO ESTADO: Controla si se ocultan los lentes sin stock
  const [soloDisponibles, setSoloDisponibles] = useState(false);

  // --- ESTADO DE PAGINACIÓN ---
  const [limiteVisible, setLimiteVisible] = useState(12); //

  useEffect(() => {
    async function cargarDatos() {
      try {
        const datos = await obtenerArmazones();
        setArmazones(datos);
      } catch (error) {
        console.error("Error cargando armazones en el Home:", error);
      } finally {
        setCargando(false);
      }
    }
    cargarDatos();
  }, []);

  // --- MOTOR DE FILTRADO INTELIGENTE COMBINADO MÁS STOCK ---
  const armazonesFiltrados = armazones.filter((item) => {
    const nombreLower = item.nombre.toLowerCase(); //
    const descLower = (item.descripcion || "").toLowerCase(); //

    // 1. Filtro por Buscador de Texto
    const coincideTexto = nombreLower.includes(busqueda.toLowerCase()) || descLower.includes(busqueda.toLowerCase()); //
    
    // 2. Filtro por Precio Máximo
    const coincidePrecio = item.precio <= precioMaximo; //

    // 3. Filtro Inteligente por Tipo de Lente
    let coincideTipo = true; //
    if (tipoActivo === "sol") { //
      coincideTipo = nombreLower.includes("sol") || descLower.includes("sol"); //
    } else if (tipoActivo === "inteligentes") { //
      coincideTipo = nombreLower.includes("smart") || nombreLower.includes("inteligente") || descLower.includes("smart") || descLower.includes("meta"); //
    } else if (tipoActivo === "oftalmicos") { //
      const esSol = nombreLower.includes("sol") || descLower.includes("sol"); //
      const esSmart = nombreLower.includes("smart") || nombreLower.includes("inteligente") || descLower.includes("smart"); //
      coincideTipo = !esSol && !esSmart; //
    }

    // 4. Filtro Inteligente por Género / Sexo
    let coincideGenero = true; //
    if (generoActivo === "hombre") { //
      coincideGenero = nombreLower.includes("hombre") || descLower.includes("hombre") || descLower.includes("masculino"); //
    } else if (generoActivo === "mujer") { //
      coincideGenero = nombreLower.includes("mujer") || descLower.includes("mujer") || descLower.includes("femenino") || nombreLower.includes("dama"); //
    } else if (generoActivo === "unisex") { //
      coincideGenero = nombreLower.includes("unisex") || descLower.includes("unisex") || (!nombreLower.includes("hombre") && !descLower.includes("mujer")); //
    }

    // 🔥 5. NUEVA REGLA: Filtro de Disponibilidad de Stock real
    // Si 'soloDisponibles' está activo, el item debe tener stock mayor a 0. Si no está activo, pasa de largo.
    const coincideStock = !soloDisponibles || (item.stock && item.stock > 0);

    // El elemento debe cumplir TODOS los filtros en simultáneo
    return coincideTexto && coincidePrecio && coincideTipo && coincideGenero && coincideStock;
  });

  const armazonesVisibles = armazonesFiltrados.slice(0, limiteVisible); //

  // Reseteamos la paginación si se toca cualquier filtro, incluido el de stock
  useEffect(() => {
    setLimiteVisible(12); //
  }, [busqueda, tipoActivo, generoActivo, precioMaximo, soloDisponibles]);

  return (
    <main className="min-h-screen bg-[#001529] text-white relative selection:bg-[#c5a059] selection:text-black">
      
      <CustomCursor />

      {/* Fondos */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#051e34] via-[#001529] to-[#001529]"></div>
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5a059' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")` }}></div>

      <div className="relative z-10">
        <Navbar />
        <Hero />

        <div className="max-w-7xl mx-auto px-6 pt-40 pb-20">
          <FadeIn><section id="about"><About /></section></FadeIn>
        </div>

        <Marquee />

        <div className="max-w-7xl mx-auto px-6 space-y-24 pb-40 pt-20">
          
          {/* PANEL DE HIPER-FILTRADO AVANZADO */}
          <FadeIn>
            <section id="marcos" className="space-y-10 scroll-mt-24">
              
              <div className="bg-[#021120]/90 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl max-w-5xl mx-auto w-full space-y-6">
                <div className="border-b border-white/5 pb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em] block mb-1">Advanced Search</span>
                    <h2 className="text-lg font-black uppercase tracking-wide text-white">Filtrar Colección</h2>
                  </div>
                  
                  {/* 🔥 NUEVO: Botón switch de disponibilidad con estilo luxury */}
                  <button
                    type="button"
                    onClick={() => setSoloDisponibles(!soloDisponibles)}
                    className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all self-start sm:self-center ${
                      soloDisponibles 
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/5" 
                        : "bg-black/20 border-white/5 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {soloDisponibles ? "⚡ Mostrando Solo Disponibles" : "👁️ Mostrar Sin Stock"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Columna 1: Buscador de texto libre */}
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Palabra clave</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 text-xs">🔍</span>
                      <input 
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Ej: Ray-Ban, Acetato, Aviador..."
                        className="w-full bg-[#001529] border border-white/10 rounded-xl py-3 pl-9 pr-4 text-xs font-medium placeholder-neutral-600 focus:border-[#c5a059] outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Columna 2: Selector de Categorías / Tipo */}
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Tipo de Armazón</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: "todos", label: "Todos" },
                        { id: "oftalmicos", label: "Oftálmicos" },
                        { id: "sol", label: "De Sol" },
                        { id: "inteligentes", label: "Smart" }
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTipoActivo(t.id)}
                          className={`py-2 text-[9px] font-black uppercase tracking-widest rounded-lg border transition-all ${
                            tipoActivo === t.id 
                              ? "bg-[#c5a059] border-[#c5a059] text-black" 
                              : "bg-black/20 border-white/5 text-neutral-400 hover:text-white"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Columna 3: Selector de Género / Sexo */}
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Estilo / Género</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: "todos", label: "Universo" },
                        { id: "hombre", label: "Hombre" },
                        { id: "mujer", label: "Mujer" },
                        { id: "unisex", label: "Unisex" }
                      ].map((g) => (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setGeneroActivo(g.id)}
                          className={`py-2 text-[9px] font-black uppercase tracking-widest rounded-lg border transition-all ${
                            generoActivo === g.id 
                              ? "bg-[#c5a059] border-[#c5a059] text-black" 
                              : "bg-black/20 border-white/5 text-neutral-400 hover:text-white"
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Filtro de Rango de Precio inferior sutil */}
                <div className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-white/5 text-xs text-neutral-400 font-medium">
                  <div className="flex items-center gap-2 w-full md:w-96">
                    <span className="uppercase tracking-widest text-[10px] font-bold shrink-0">Precio máx:</span>
                    <input 
                      type="range" 
                      min="500" 
                      max="15000" 
                      step="500"
                      value={precioMaximo}
                      onChange={(e) => setPrecioMaximo(Number(e.target.value))}
                      className="w-full h-1 bg-[#001529] accent-[#c5a059] rounded-lg appearance-none cursor-pointer border border-white/5"
                    />
                    <span className="text-[#c5a059] font-black text-xs shrink-0">${precioMaximo.toLocaleString("es-MX")} MXN</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">
                    Modelos encontrados: <span className="text-white">{armazonesFiltrados.length}</span>
                  </div>
                </div>
              </div>

              {/* GALERÍA DINÁMICA */}
              <Gallery armazones={armazonesVisibles} cargando={cargando} />

              {/* BOTÓN DE CARGAR MÁS */}
              {!cargando && armazonesFiltrados.length > limiteVisible && (
                <div className="text-center pt-6">
                  <button
                    onClick={() => setLimiteVisible((prev) => prev + 12)}
                    className="text-[10px] font-black uppercase tracking-[0.2em] border border-[#c5a059]/30 hover:border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black px-8 py-3.5 rounded-full transition-all shadow-lg shadow-[#c5a059]/5 active:scale-[0.98]"
                  >
                    Cargar más modelos
                  </button>
                </div>
              )}
            </section>
          </FadeIn>
          
          <FadeIn><section id="servicios"><Packages /></section></FadeIn>
          <FadeIn><section id="equipo"><Creators /></section></FadeIn>
          <FadeIn><section id="contacto"><Contact /></section></FadeIn>
        </div>

        <Footer />
      </div>
    </main>
  );
}