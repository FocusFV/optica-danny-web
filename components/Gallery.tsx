"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Armazon } from "../lib/armazones";
import { enriquecerArmazon, ArmazonEnriquecido } from "../lib/catalog-enricher";
import { useCart } from "@/context/CartContext";
import { BUSINESS_INFO, buildWhatsAppLink } from "@/lib/constants";
import Link from "next/link";
import {
  Search,
  X,
  Heart,
  ShoppingBag,
  MessageCircle,
  Eye,
  Ruler,
  Info,
  Sparkles,
  Zap,
  Check,
  Flame,
  ArrowRight,
  Filter,
  SlidersHorizontal,
} from "lucide-react";

interface GalleryProps {
  armazones: Armazon[];
  cargando: boolean;
}

export default function Gallery({ armazones, cargando }: GalleryProps) {
  const { agregarProducto } = useCart();

  // Armazones enriquecidos con especificaciones ópticas
  const armazonesEnriquecidos = useMemo(() => {
    return armazones.map(enriquecerArmazon);
  }, [armazones]);

  // --- ESTADOS DE FILTRADO Y BÚSQUEDA ---
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todos"); // todos, oftalmico, sol, inteligente
  const [genero, setGenero] = useState("todos"); // todos, hombre, mujer, unisex, infantil
  const [material, setMaterial] = useState("todos"); // todos, acetato, metal, tr90, hibrido
  const [calibreRango, setCalibreRango] = useState("all"); // all, small (<50), medium (50-52), large (>52)
  const [marcaFiltro, setMarcaFiltro] = useState("all");
  const [orden, setOrden] = useState("default");
  const [soloStock, setSoloStock] = useState(false);
  const [filtroRapido, setFiltroRapido] = useState<string | null>(null);

  // --- ESTADO DE FAVORITOS (PERSISTIDO EN LOCALSTORAGE) ---
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [soloFavoritos, setSoloFavoritos] = useState(false);

  // --- ESTADOS DE MODALES ---
  const [modalLente, setModalLente] = useState<ArmazonEnriquecido | null>(null);
  const [modalMedidasAbierto, setModalMedidasAbierto] = useState(false);
  const [modalImagenActiva, setModalImagenActiva] = useState(0);

  // --- ÁNGULOS DE IMAGEN ACTIVOS POR CADA TARJETA ---
  const [imagenesActivas, setImagenesActivas] = useState<Record<string, number>>({});

  // Cargar favoritos al montar
  useEffect(() => {
    try {
      const guardados = localStorage.getItem("optica_danny_favoritos");
      if (guardados) {
        setFavoritos(JSON.parse(guardados));
      }
    } catch (e) {
      console.error("Error al leer favoritos:", e);
    }
  }, []);

  // Alternar favorito
  const toggleFavorito = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setFavoritos((prev) => {
      const nuevo = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem("optica_danny_favoritos", JSON.stringify(nuevo));
      } catch (err) {
        console.error("Error al guardar favoritos:", err);
      }
      return nuevo;
    });
  };

  // Botón WhatsApp: Cotizar con Cristales / Receta
  const handleCotizarCristales = (lente: ArmazonEnriquecido, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const skuTexto = lente.sku ? ` [SKU: ${lente.sku}]` : "";
    const mensaje = `¡Hola ${BUSINESS_INFO.name}! 👋\n\nMe gustó mucho el armazón *${lente.nombre}* (${lente.marca})${skuTexto}.\n\nQuisiera cotizarlo con cristales graduados para mis ojos. Te adjunto la foto de mi receta médica 👓📄✨`;
    window.open(buildWhatsAppLink(mensaje), "_blank");
  };

  // Botón WhatsApp: Consultar Favoritos
  const handleConsultarFavoritos = () => {
    const seleccionados = armazonesEnriquecidos.filter((l) => favoritos.includes(l.id));
    if (seleccionados.length === 0) return;
    const listaModelos = seleccionados.map((m) => `• *${m.nombre}* (${m.marca}) - ${m.medidas || ""}`).join("\n");
    const mensaje = `¡Hola ${BUSINESS_INFO.name}! 👋\n\nEstuve viendo su catálogo web y guardé estos modelos en mis favoritos para cotizar:\n\n${listaModelos}\n\n¿Tienen disponibilidad y me podrían asesorar para graduarlos? 👓✨`;
    window.open(buildWhatsAppLink(mensaje), "_blank");
  };

  // Marcas únicas disponibles
  const marcasDisponibles = useMemo(() => {
    const setMarcas = new Set<string>();
    armazonesEnriquecidos.forEach((item) => {
      if (item.marca) setMarcas.add(item.marca);
    });
    return Array.from(setMarcas).sort();
  }, [armazonesEnriquecidos]);

  // --- MOTOR DE FILTRADO COMBINADO ---
  const filtrados = useMemo(() => {
    return armazonesEnriquecidos.filter((item) => {
      // 1. Filtro Solo Favoritos
      if (soloFavoritos && !favoritos.includes(item.id)) return false;

      // 2. Filtro Solo con Stock
      if (soloStock && (!item.stock || item.stock <= 0)) return false;

      // 3. Filtro por Marca
      if (marcaFiltro !== "all" && item.marca !== marcaFiltro) return false;

      // 4. Filtro por Categoría
      if (categoria !== "todos") {
        const cat = (item.categoria || "").toLowerCase();
        if (categoria === "sol" && !cat.includes("sol")) return false;
        if (categoria === "oftalmico" && cat.includes("sol")) return false;
        if (categoria === "inteligente" && !cat.includes("inteligente") && !cat.includes("smart")) return false;
      }

      // 5. Filtro por Género
      if (genero !== "todos") {
        const gen = (item.genero || "").toLowerCase();
        const desc = (item.descripcion || "").toLowerCase();
        if (genero === "dama" && !gen.includes("mujer") && !gen.includes("dama") && !desc.includes("femenino")) return false;
        if (genero === "caballero" && !gen.includes("hombre") && !gen.includes("caballero") && !desc.includes("masculino")) return false;
        if (genero === "infantil" && !desc.includes("niño") && !desc.includes("infantil") && !desc.includes("kids")) return false;
        if (genero === "unisex" && !gen.includes("unisex")) return false;
      }

      // 6. Filtro por Material
      if (material !== "todos") {
        const mat = (item.material || "").toLowerCase();
        if (material === "acetato" && !mat.includes("acetato")) return false;
        if (material === "metal" && !mat.includes("metal") && !mat.includes("acero") && !mat.includes("alambre")) return false;
        if (material === "tr90" && !mat.includes("tr90") && !mat.includes("ultem")) return false;
        if (material === "hibrido" && !mat.includes("+") && !mat.includes("&") && !mat.includes("combinado")) return false;
      }

      // 7. Filtro por Calibre (Aro)
      if (calibreRango !== "all") {
        const cal = item.calibre;
        if (!cal) return true; // Si no tiene calibre exacto, no lo escondemos
        if (calibreRango === "small" && cal >= 50) return false;
        if (calibreRango === "medium" && (cal < 50 || cal > 52)) return false;
        if (calibreRango === "large" && cal <= 52) return false;
      }

      // 8. Búsqueda por texto libre
      if (busqueda.trim()) {
        const q = busqueda.toLowerCase().trim();
        const stringTotal = `${item.sku} ${item.nombre} ${item.marca} ${item.estilo} ${item.color} ${item.material} ${item.medidas} ${item.descripcion}`.toLowerCase();
        if (!stringTotal.includes(q)) return false;
      }

      // 9. Píldora de filtro rápido activa
      if (filtroRapido) {
        const q = filtroRapido.toLowerCase();
        const stringTotal = `${item.sku} ${item.nombre} ${item.marca} ${item.estilo} ${item.color} ${item.material} ${item.medidas} ${item.descripcion}`.toLowerCase();
        if (!stringTotal.includes(q)) return false;
      }

      return true;
    });
  }, [
    armazonesEnriquecidos,
    busqueda,
    categoria,
    genero,
    material,
    calibreRango,
    marcaFiltro,
    soloStock,
    soloFavoritos,
    favoritos,
    filtroRapido,
  ]);

  // Ordenamiento
  const armazonesOrdenados = useMemo(() => {
    const copia = [...filtrados];
    if (orden === "price-asc") {
      copia.sort((a, b) => (Number(a.precio) || 0) - (Number(b.precio) || 0));
    } else if (orden === "price-desc") {
      copia.sort((a, b) => (Number(b.precio) || 0) - (Number(a.precio) || 0));
    } else if (orden === "calibre-asc") {
      copia.sort((a, b) => (a.calibre || 0) - (b.calibre || 0));
    } else if (orden === "brand") {
      copia.sort((a, b) => (a.marca || "").localeCompare(b.marca || ""));
    }
    return copia;
  }, [filtrados, orden]);

  // Limpiar todos los filtros
  const resetFiltros = () => {
    setBusqueda("");
    setCategoria("todos");
    setGenero("todos");
    setMaterial("todos");
    setCalibreRango("all");
    setMarcaFiltro("all");
    setOrden("default");
    setSoloStock(false);
    setSoloFavoritos(false);
    setFiltroRapido(null);
  };

  const hayFiltrosActivos =
    busqueda ||
    categoria !== "todos" ||
    genero !== "todos" ||
    material !== "todos" ||
    calibreRango !== "all" ||
    marcaFiltro !== "all" ||
    orden !== "default" ||
    soloStock ||
    soloFavoritos ||
    filtroRapido !== null;

  return (
    <div className="py-8 px-2 bg-transparent">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER DE SECCIÓN & ACCESO A GUÍA DE MEDIDAS */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-4 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse"></span>
              <span className="text-[#c5a059] font-black uppercase tracking-[0.4em] text-[10px]">
                Inventario & Catálogo Óptico
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
              Catálogo de <span className="text-[#c5a059]">Armazones</span>
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 font-light mt-1 max-w-xl">
              Modelos seleccionados listos para entrega en Mérida o para cotizar tus cristales a medida con tu receta.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* BOTÓN GUÍA DE MEDIDAS (FEATURE #2) */}
            <button
              type="button"
              onClick={() => setModalMedidasAbierto(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c5a059]/10 hover:bg-[#c5a059]/20 border border-[#c5a059]/30 text-[#c5a059] text-xs font-bold transition-all shadow-lg shadow-[#c5a059]/5 active:scale-95"
            >
              <Ruler size={15} />
              <span>¿Cómo saber tu medida?</span>
            </button>

            {/* BOTÓN MIS FAVORITOS (FEATURE #4) */}
            <button
              type="button"
              onClick={() => setSoloFavoritos(!soloFavoritos)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
                soloFavoritos
                  ? "bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-lg shadow-rose-500/10"
                  : "bg-white/5 border-white/10 text-neutral-300 hover:text-white hover:border-white/20"
              }`}
            >
              <Heart
                size={15}
                className={soloFavoritos ? "fill-rose-400 text-rose-400" : "text-neutral-400"}
              />
              <span>Favoritos ({favoritos.length})</span>
            </button>
          </div>
        </div>

        {/* PANEL PRINCIPAL DE BÚSQUEDA Y FILTRADO */}
        <div className="bg-[#021120]/90 border border-white/10 rounded-3xl p-5 md:p-7 backdrop-blur-xl shadow-2xl space-y-5">
          
          {/* BUSCADOR INSTANTÁNEO GLOBAL */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por marca, modelo, código SKU, color, material o estilo (ej: Ray-Ban, Acetato, Aviador, Cat-Eye)..."
              className="w-full bg-[#001529] border border-white/10 rounded-2xl py-3.5 pl-12 pr-10 text-sm text-white placeholder-neutral-500 focus:border-[#c5a059] outline-none transition-all shadow-inner"
            />
            {busqueda && (
              <button
                type="button"
                onClick={() => setBusqueda("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
                title="Limpiar búsqueda"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* BARRA DE PÍLDORAS DE FILTRO RÁPIDO */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/5 text-xs">
            <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mr-1">
              Filtros rápidos:
            </span>

            {[
              { id: "acetato", label: "Acetato" },
              { id: "metal", label: "Metálicos" },
              { id: "cat-eye", label: "Cat-Eye" },
              { id: "redondo", label: "Redondo / Panto" },
              { id: "clubmaster", label: "Clubmaster" },
              { id: "aviador", label: "Aviador" },
              { id: "luz azul", label: "Filtro Luz Azul" },
            ].map((pildora) => {
              const activa = filtroRapido === pildora.id;
              return (
                <button
                  key={pildora.id}
                  type="button"
                  onClick={() => setFiltroRapido(activa ? null : pildora.id)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all ${
                    activa
                      ? "bg-[#c5a059] border-[#c5a059] text-black shadow-md shadow-[#c5a059]/20"
                      : "bg-[#001529] border-white/10 text-neutral-300 hover:border-[#c5a059]/40 hover:text-white"
                  }`}
                >
                  {pildora.label}
                </button>
              );
            })}

            {/* BOTÓN SOLO EN STOCK (FEATURE #5) */}
            <button
              type="button"
              onClick={() => setSoloStock(!soloStock)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all flex items-center gap-1.5 ${
                soloStock
                  ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/10"
                  : "bg-[#001529] border-white/10 text-neutral-300 hover:border-emerald-500/30 hover:text-emerald-300"
              }`}
            >
              <Zap size={13} className={soloStock ? "text-emerald-400" : "text-neutral-400"} />
              <span>Solo Disponibles</span>
            </button>

            {hayFiltrosActivos && (
              <button
                type="button"
                onClick={resetFiltros}
                className="ml-auto text-[11px] text-[#c5a059] hover:underline font-bold transition-colors"
              >
                Restablecer filtros
              </button>
            )}
          </div>

          {/* GRID DE SELECTORES DESPLEGABLES */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-3 border-t border-white/5 text-xs">
            
            {/* 1. Marca */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold block">
                Marca
              </label>
              <select
                value={marcaFiltro}
                onChange={(e) => setMarcaFiltro(e.target.value)}
                className="w-full bg-[#001529] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#c5a059] transition-all"
              >
                <option value="all">Todas las marcas</option>
                {marcasDisponibles.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Género / Estilo */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold block">
                Género
              </label>
              <select
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className="w-full bg-[#001529] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#c5a059] transition-all"
              >
                <option value="todos">Todos los géneros</option>
                <option value="dama">Dama / Mujer</option>
                <option value="caballero">Caballero / Hombre</option>
                <option value="unisex">Unisex</option>
                <option value="infantil">Infantil / Niños</option>
              </select>
            </div>

            {/* 3. Material */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold block">
                Material
              </label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full bg-[#001529] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#c5a059] transition-all"
              >
                <option value="todos">Todos los materiales</option>
                <option value="acetato">Acetato</option>
                <option value="metal">Metal / Alambre</option>
                <option value="tr90">TR90 / Polímero</option>
                <option value="hibrido">Combinado / Híbrido</option>
              </select>
            </div>

            {/* 4. Calibre (Aro) */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold block">
                Calibre (Aro)
              </label>
              <select
                value={calibreRango}
                onChange={(e) => setCalibreRango(e.target.value)}
                className="w-full bg-[#001529] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#c5a059] transition-all"
              >
                <option value="all">Cualquier medida</option>
                <option value="small">&lt; 50 mm (Chico)</option>
                <option value="medium">50 - 52 mm (Estándar)</option>
                <option value="large">&gt; 52 mm (Grande/Oversize)</option>
              </select>
            </div>

            {/* 5. Ordenar por */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold block">
                Ordenar por
              </label>
              <select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                className="w-full bg-[#001529] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#c5a059] transition-all"
              >
                <option value="default">Recomendados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="calibre-asc">Calibre: Menor a Mayor</option>
                <option value="brand">Marca (A-Z)</option>
              </select>
            </div>

          </div>

        </div>

        {/* BARRA DE CONTEO Y ESTADO */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs text-neutral-400 px-1">
          <p className="font-semibold text-neutral-300">
            Mostrando <span className="text-[#c5a059] font-bold">{armazonesOrdenados.length}</span> armazones
            {soloFavoritos && " guardados en tus favoritos ❤️"}
          </p>

          {soloFavoritos && favoritos.length > 0 && (
            <button
              type="button"
              onClick={handleConsultarFavoritos}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#c5a059] hover:underline"
            >
              <MessageCircle size={15} />
              <span>Consultar mis {favoritos.length} favoritos por WhatsApp →</span>
            </button>
          )}
        </div>

        {/* ESTADOS DE CARGA / VACÍO / GRID DE PRODUCTOS */}
        {cargando ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="animate-pulse bg-[#021120] border border-white/5 rounded-3xl p-5 h-[480px] flex flex-col justify-between"
              >
                <div className="w-full h-48 bg-white/5 rounded-2xl" />
                <div className="space-y-3">
                  <div className="w-1/3 h-4 bg-white/5 rounded" />
                  <div className="w-3/4 h-6 bg-white/5 rounded" />
                  <div className="w-full h-12 bg-white/5 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : armazonesOrdenados.length === 0 ? (
          /* ESTADO VACÍO ELEGANTE */
          <div className="text-center py-20 px-6 bg-[#021120]/50 border border-white/5 rounded-3xl space-y-4 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center mx-auto mb-2">
              {soloFavoritos ? <Heart size={28} /> : <Search size={28} />}
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-white">
              {soloFavoritos
                ? "No guardaste ningún favorito todavía"
                : "No encontramos armazones con esos filtros"}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {soloFavoritos
                ? "Tocá el icono de corazón ❤️ en cualquiera de los armazones del catálogo para guardarlo aquí y comparar tus favoritos."
                : "Probá cambiando el término de búsqueda, la marca o el material para ver más modelos disponibles."}
            </p>
            <button
              type="button"
              onClick={resetFiltros}
              className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-[#c5a059] text-black font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#dfba75] transition-all"
            >
              <span>Ver todos los modelos</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          /* GRID PROFESIONAL DE ARMAZONES */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {armazonesOrdenados.map((lente, i) => {
              const esFavorito = favoritos.includes(lente.id);
              const imgIndex = imagenesActivas[lente.id] || 0;
              const imagenPrincipal = lente.imagenes[imgIndex] || lente.imagen;

              return (
                <motion.div
                  key={lente.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                  className="group relative bg-[#021120]/90 border border-white/10 hover:border-[#c5a059]/40 rounded-3xl p-5 shadow-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 backdrop-blur-xl"
                >
                  <div>
                    {/* CABECERA DE LA TARJETA: SKU + GÉNERO + FAVORITO */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#c5a059]/10 text-[#c5a059] font-bold border border-[#c5a059]/25 tracking-wider">
                        {lente.sku}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400">
                          {lente.genero || "Unisex"}
                        </span>

                        {/* BOTÓN FAVORITOS (FEATURE #4) */}
                        <button
                          type="button"
                          onClick={(e) => toggleFavorito(lente.id, e)}
                          className={`p-2 rounded-full border transition-all ${
                            esFavorito
                              ? "bg-rose-500/20 border-rose-500/50 text-rose-400 shadow-md shadow-rose-500/20"
                              : "bg-white/5 border-white/10 text-neutral-400 hover:text-rose-400 hover:border-rose-400/30"
                          }`}
                          title={esFavorito ? "Quitar de favoritos" : "Guardar en favoritos"}
                        >
                          <Heart
                            size={14}
                            className={esFavorito ? "fill-rose-400" : ""}
                          />
                        </button>
                      </div>
                    </div>

                    {/* ESCENARIO FOTOGRÁFICO DE ALTA VISIBILIDAD */}
                    <div
                      onClick={() => {
                        setModalLente(lente);
                        setModalImagenActiva(imgIndex);
                      }}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#001529] border border-white/5 mb-3 flex items-center justify-center group/img cursor-pointer"
                    >
                      <img
                        src={imagenPrincipal}
                        alt={lente.nombre}
                        className="w-full h-full object-contain p-3 group-hover/img:scale-105 transition-transform duration-500"
                      />

                      {/* BADGE UV420 LUZ AZUL SI APLICA */}
                      {lente.filtro_especial && (
                        <span className="absolute top-2.5 left-2.5 bg-indigo-600/90 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow backdrop-blur">
                          {lente.filtro_especial}
                        </span>
                      )}

                      {/* HOVER OVERLAY DE FICHA RÁPIDA */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                        <span className="text-[11px] text-white font-bold flex items-center gap-1.5 bg-[#c5a059] text-black px-3 py-1 rounded-full shadow-lg">
                          <Eye size={13} />
                          <span>Ver Ficha Técnica</span>
                        </span>
                      </div>
                    </div>

                    {/* TIRA DE MINIATURAS INTERACTIVAS (ÁNGULOS) */}
                    {lente.imagenes.length > 1 && (
                      <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1">
                        {lente.imagenes.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setImagenesActivas((prev) => ({ ...prev, [lente.id]: idx }));
                            }}
                            className={`w-9 h-9 rounded-lg overflow-hidden border transition-all bg-[#001529] shrink-0 ${
                              imgIndex === idx
                                ? "border-[#c5a059] ring-1 ring-[#c5a059]"
                                : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                        <span className="text-[10px] text-neutral-500 ml-auto font-mono">
                          {lente.imagenes.length} vistas
                        </span>
                      </div>
                    )}

                    {/* MARCA, NOMBRE Y ESTILO */}
                    <div className="space-y-1 mb-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#c5a059] block">
                        {lente.marca}
                      </span>
                      <h3 className="text-base font-black text-white leading-tight uppercase group-hover:text-[#c5a059] transition-colors truncate">
                        {lente.nombre}
                      </h3>
                      <p className="text-xs text-neutral-400 line-clamp-1 font-light">
                        {lente.estilo}
                      </p>
                    </div>

                    {/* GRILLA DE MEDIDAS ÓPTICAS (LOS 3 BADGES CLAVE) */}
                    {lente.calibre && lente.puente && lente.varilla ? (
                      <div className="grid grid-cols-3 gap-1.5 mb-3 text-center text-[10px] font-mono">
                        <div className="p-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300">
                          <span className="text-[8px] uppercase tracking-wider block text-blue-400/80 font-sans font-bold">
                            Aro
                          </span>
                          <span className="font-bold">{lente.calibre} mm</span>
                        </div>
                        <div className="p-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                          <span className="text-[8px] uppercase tracking-wider block text-emerald-400/80 font-sans font-bold">
                            Puente
                          </span>
                          <span className="font-bold">{lente.puente} mm</span>
                        </div>
                        <div className="p-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
                          <span className="text-[8px] uppercase tracking-wider block text-amber-400/80 font-sans font-bold">
                            Varilla
                          </span>
                          <span className="font-bold">{lente.varilla} mm</span>
                        </div>
                      </div>
                    ) : null}

                    {/* ATRIBUTOS: COLOR Y MATERIAL */}
                    <div className="space-y-1 bg-[#001529]/70 p-2.5 rounded-xl border border-white/5 text-[11px] text-neutral-300 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Color:</span>
                        <span className="font-medium text-white truncate max-w-[170px]" title={lente.color}>
                          {lente.color}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Material:</span>
                        <span className="font-medium text-white truncate max-w-[170px]" title={lente.material}>
                          {lente.material}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* PIE DE TARJETA: PRECIO + STOCK + BOTONES DE ACCIÓN */}
                  <div className="pt-3 border-t border-white/10 space-y-3">
                    
                    {/* PRECIO & BADGE DE STOCK (FEATURE #5) */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-bold">
                          Precio
                        </span>
                        {Number(lente.precio) > 0 ? (
                          <span className="text-base font-black text-[#c5a059]">
                            ${Number(lente.precio).toLocaleString("es-MX")}{" "}
                            <span className="text-[10px] text-neutral-400 font-bold">MXN</span>
                          </span>
                        ) : (
                          <span className="text-xs font-black text-[#c5a059] uppercase tracking-wider">
                            Cotización directa
                          </span>
                        )}
                      </div>

                      {/* BADGE DE STOCK CON ALERTA DE ÚLTIMA PIEZA */}
                      <div>
                        {lente.stock === 1 ? (
                          <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 animate-pulse">
                            <Flame size={12} className="text-amber-400" />
                            <span>Última pieza</span>
                          </span>
                        ) : lente.stock && lente.stock > 1 ? (
                          <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-300">
                            <Check size={11} className="text-emerald-400" />
                            <span>En Stock</span>
                          </span>
                        ) : (
                          <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/35 text-rose-300">
                            Agotado
                          </span>
                        )}
                      </div>
                    </div>

                    {/* BOTONES DE ACCIÓN (FEATURE #1: COTIZAR CON CRISTALES) */}
                    <div className="grid grid-cols-6 gap-2">
                      
                      {/* BOTÓN COTIZAR CON CRISTALES (FEATURE #1) */}
                      <button
                        type="button"
                        onClick={(e) => handleCotizarCristales(lente, e)}
                        className="col-span-4 py-2.5 px-3 rounded-xl bg-[#c5a059] hover:bg-[#dfba75] text-black text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-lg active:scale-95"
                        title="Enviar mensaje con receta médica"
                      >
                        <MessageCircle size={14} />
                        <span>Cotizar c/ Cristales</span>
                      </button>

                      {/* BOTÓN FICHA TÉCNICA */}
                      <button
                        type="button"
                        onClick={() => {
                          setModalLente(lente);
                          setModalImagenActiva(imgIndex);
                        }}
                        className="col-span-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center justify-center transition-colors"
                        title="Ver ficha técnica completa"
                      >
                        <Eye size={15} />
                      </button>

                      {/* BOTÓN AGREGAR AL CARRITO */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          agregarProducto({
                            id: lente.id,
                            nombre: lente.nombre,
                            precio: lente.precio,
                            imagen: lente.imagen,
                          });
                        }}
                        className="col-span-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#c5a059] border border-white/10 hover:border-[#c5a059]/40 flex items-center justify-center transition-colors"
                        title="Agregar armazón al carrito"
                      >
                        <ShoppingBag size={15} />
                      </button>

                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* ============================================================== */}
      {/* MODAL 1: FICHA TÉCNICA HD DEL ARMAZÓN                          */}
      {/* ============================================================== */}
      <AnimatePresence>
        {modalLente && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#021120] border border-[#c5a059]/30 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
            >
              {/* HEADER DEL MODAL */}
              <div className="sticky top-0 z-20 bg-[#021120]/95 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#c5a059]/10 text-[#c5a059] font-mono text-xs font-bold border border-[#c5a059]/30">
                    {modalLente.sku}
                  </span>
                  <div>
                    <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-white leading-tight">
                      {modalLente.nombre}
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      {modalLente.marca} • {modalLente.genero || "Unisex"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalLente(null)}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* CUERPO DEL MODAL */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  
                  {/* COLUMNA FOTOS HD */}
                  <div className="space-y-3">
                    <div className="relative aspect-[4/3] rounded-2xl bg-[#001529] border border-white/10 overflow-hidden flex items-center justify-center">
                      <img
                        src={modalLente.imagenes[modalImagenActiva] || modalLente.imagen}
                        alt={modalLente.nombre}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>

                    {modalLente.imagenes.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {modalLente.imagenes.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setModalImagenActiva(idx)}
                            className={`w-14 h-14 rounded-xl overflow-hidden border bg-[#001529] shrink-0 transition-all ${
                              modalImagenActiva === idx
                                ? "border-[#c5a059] ring-2 ring-[#c5a059]/50"
                                : "border-white/10 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* COLUMNA ESPECIFICACIONES TÉCNICAS */}
                  <div className="space-y-4 text-xs">
                    
                    {/* CAJA DE MEDIDAS DE FÁBRICA */}
                    <div className="bg-[#001529] p-4 rounded-2xl border border-white/10 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#c5a059] flex items-center gap-1.5">
                          <Ruler size={14} />
                          <span>Medidas Ópticas de Fábrica</span>
                        </span>
                        {modalLente.medidas && (
                          <span className="font-mono text-neutral-400 text-[11px] font-bold">
                            {modalLente.medidas}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center font-mono">
                        <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                          <span className="text-[9px] text-blue-300 block font-sans font-bold">
                            Aro (Calibre)
                          </span>
                          <span className="text-sm font-black text-white">
                            {modalLente.calibre ? `${modalLente.calibre} mm` : "--"}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                          <span className="text-[9px] text-emerald-300 block font-sans font-bold">
                            Puente
                          </span>
                          <span className="text-sm font-black text-white">
                            {modalLente.puente ? `${modalLente.puente} mm` : "--"}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                          <span className="text-[9px] text-amber-300 block font-sans font-bold">
                            Varilla
                          </span>
                          <span className="text-sm font-black text-white">
                            {modalLente.varilla ? `${modalLente.varilla} mm` : "--"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* TABLA DE ATRIBUTOS */}
                    <div className="space-y-2 bg-[#001529]/60 p-4 rounded-2xl border border-white/5">
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-neutral-400">Material:</span>
                        <span className="font-semibold text-white">{modalLente.material}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-neutral-400">Color:</span>
                        <span className="font-semibold text-white">{modalLente.color}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-neutral-400">Estilo:</span>
                        <span className="font-semibold text-white">{modalLente.estilo}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-neutral-400">Precio Armazón:</span>
                        <span className="font-black text-[#c5a059] text-sm">
                          {Number(modalLente.precio) > 0
                            ? `$${Number(modalLente.precio).toLocaleString("es-MX")} MXN`
                            : "A cotizar"}
                        </span>
                      </div>
                    </div>

                    {/* DESCRIPCIÓN */}
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                        Descripción:
                      </span>
                      <p className="text-xs text-neutral-300 leading-relaxed font-light">
                        {modalLente.descripcion}
                      </p>
                    </div>

                    {/* ACCIONES DEL MODAL */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleCotizarCristales(modalLente)}
                        className="flex-1 py-3 px-4 rounded-xl bg-[#c5a059] hover:bg-[#dfba75] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                      >
                        <MessageCircle size={15} />
                        <span>Cotizar c/ Cristales por WhatsApp</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          agregarProducto({
                            id: modalLente.id,
                            nombre: modalLente.nombre,
                            precio: modalLente.precio,
                            imagen: modalLente.imagen,
                          });
                          setModalLente(null);
                        }}
                        className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10 transition-colors"
                      >
                        <ShoppingBag size={15} />
                        <span>Al Carrito</span>
                      </button>
                    </div>

                    <div className="text-center pt-1">
                      <Link
                        href={`/armazones/${modalLente.id}`}
                        className="text-[11px] text-[#c5a059] hover:underline font-semibold"
                      >
                        Ver página individual de este armazón →
                      </Link>
                    </div>

                  </div>

                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* MODAL 2: GUÍA VISUAL "¿CÓMO SABER TU MEDIDA?" (FEATURE #2)     */}
      {/* ============================================================== */}
      <AnimatePresence>
        {modalMedidasAbierto && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#021120] border border-[#c5a059]/40 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 text-white"
            >
              <button
                type="button"
                onClick={() => setModalMedidasAbierto(false)}
                className="absolute top-5 right-5 text-neutral-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center">
                  <Ruler size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight">
                    ¿Cómo saber tu medida de lentes?
                  </h3>
                  <p className="text-xs text-neutral-400">Guía práctica en 3 números</p>
                </div>
              </div>

              {/* LAS 3 MEDIDAS EXPLICADAS */}
              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-3.5 rounded-2xl bg-[#001529] border border-blue-500/20 space-y-1">
                  <div className="flex items-center justify-between text-blue-300 font-bold">
                    <span>1. Calibre / Aro (ej: 52 mm)</span>
                    <span className="text-[10px] uppercase font-mono">Ancho del lente</span>
                  </div>
                  <p className="text-neutral-300 font-light text-[11px]">
                    Es el ancho horizontal de cada cristal. Menos de 50mm es para caras delgadas/chicas, 50-52mm es estándar, y más de 52mm es amplio u oversize.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#001529] border border-emerald-500/20 space-y-1">
                  <div className="flex items-center justify-between text-emerald-300 font-bold">
                    <span>2. Puente (ej: 19 mm)</span>
                    <span className="text-[10px] uppercase font-mono">Apoyo nasal</span>
                  </div>
                  <p className="text-neutral-300 font-light text-[11px]">
                    La distancia entre ambos cristales sobre la nariz. Suele rondar entre 16mm y 21mm según tu fisonomía.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#001529] border border-amber-500/20 space-y-1">
                  <div className="flex items-center justify-between text-amber-300 font-bold">
                    <span>3. Varilla (ej: 140 mm)</span>
                    <span className="text-[10px] uppercase font-mono">Largo de patilla</span>
                  </div>
                  <p className="text-neutral-300 font-light text-[11px]">
                    El largo total de la patilla que apoya detrás de tus orejas. La medida estándar habitual es entre 135mm y 145mm.
                  </p>
                </div>
              </div>

              {/* TIP CLAVE DE ÓPTICA DANNY */}
              <div className="p-4 rounded-2xl bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs text-neutral-300 space-y-1">
                <span className="text-[#c5a059] font-black uppercase text-[10px] tracking-wider block">
                  💡 El truco infalible:
                </span>
                <p className="font-light text-[11px] leading-relaxed">
                  Fijate en la cara interna de la patilla de tus lentes actuales. Casi todos tienen grabados 3 números con un cuadrito en el medio (ej: <strong className="text-white font-mono">52□19 140</strong>). Esas son tus medidas ideales de referencia.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalMedidasAbierto(false)}
                className="w-full py-3.5 bg-[#c5a059] text-black font-black uppercase text-xs tracking-wider rounded-xl hover:bg-[#dfba75] transition-all"
              >
                Entendido, ver catálogo
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
