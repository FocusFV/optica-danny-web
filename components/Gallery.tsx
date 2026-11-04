"use client";

import React from "react";
import { motion } from "framer-motion";
import { Armazon } from "../lib/armazones";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

interface GalleryProps {
  armazones: Armazon[];
  cargando: boolean;
}

export default function Gallery({ armazones, cargando }: GalleryProps) {
  const { agregarProducto } = useCart();

  return (
    <div className="py-12 px-2 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-[#c5a059] font-bold uppercase tracking-[0.5em] text-[10px] block mb-3">
            Colección Exclusiva
          </span>
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
            Tu <span className="text-gray-500 italic font-light">mirada</span>, tu estilo
          </h3>
          <div className="w-px h-12 bg-gradient-to-b from-[#c5a059] to-transparent mx-auto mt-8 opacity-50"></div>
        </div>

        {/* 1. ESTADO DE CARGA */}
        {cargando ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div 
                key={n} 
                className="animate-pulse aspect-[4/5] bg-[#051e34]/50 border border-[#c5a059]/10 rounded-2xl"
              />
            ))}
          </div>
        ) : armazones.length === 0 ? (
          /* 2. FALLBACK */
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm tracking-widest uppercase">
              No hay armazones que coincidan con los filtros seleccionados.
            </p>
          </div>
        ) : (
          /* 3. GRID DINÁMICO */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {armazones.map((lente, i) => (
              <div 
                key={lente.id}
                className="block group relative overflow-hidden rounded-2xl shadow-2xl"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[4/5] overflow-hidden bg-[#001529] border border-[#c5a059]/10 rounded-2xl"
                >
                  {/* Link a la página de detalle */}
                  <Link href={`/armazones/${lente.id}`} className="absolute inset-0 z-0">
                    <img 
                      src={lente.imagen || "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop"} 
                      alt={lente.nombre}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001529] via-transparent to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500"></div>
                  </Link>
                  
                  {/* Badge de stock */}
                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md border ${
                      lente.stock && lente.stock > 0
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                    }`}>
                      {lente.stock && lente.stock > 0 ? `Stock: ${lente.stock}` : "Agotado"}
                    </span>
                  </div>

                  {/* Contenedor de Textos */}
                  <div className="absolute bottom-6 left-6 right-6 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 z-10 pointer-events-none">
                    <Link href={`/armazones/${lente.id}`} className="pointer-events-auto block">
                      <h4 className="text-white text-xl font-bold uppercase tracking-tight group-hover:text-[#c5a059] transition-colors duration-300 truncate">
                        {lente.nombre}
                      </h4>
                    </Link>
                    
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                      {lente.descripcion || "Diseño ergonómico de alta gama."}
                    </p>
                    
                    {/* Precio y botones */}
                    <div className="mt-3 pt-2 border-t border-[#c5a059]/10 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span className="text-[#c5a059] font-black text-lg">
                        ${Number(lente.precio).toLocaleString("es-MX")}{" "}
                        <span className="text-[10px] text-gray-500 font-bold">MXN</span>
                      </span>
                      
                      <div className="flex items-center gap-2 pointer-events-auto">
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
                          className="p-2 rounded-lg bg-[#c5a059] text-black hover:bg-white transition-all shadow-md active:scale-95"
                          title="Agregar al carrito"
                        >
                          <ShoppingBag size={14} />
                        </button>

                        <Link
                          href={`/armazones/${lente.id}`}
                          className="text-[10px] text-white/70 hover:text-white uppercase tracking-widest px-2 py-1 rounded transition-colors font-bold"
                        >
                          Ver →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Borde Luxury sutil en hover */}
                  <div className="absolute inset-0 border border-[#c5a059]/0 group-hover:border-[#c5a059]/30 rounded-2xl transition-all duration-500 pointer-events-none"></div>
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
