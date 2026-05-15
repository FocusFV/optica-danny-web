"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Armazon } from '../lib/armazones';
// 👇 IMPORTAMOS EL LINK PARA PODER NAVEGAR EN NEXT.JS
import Link from 'next/link';

interface GalleryProps {
  armazones: Armazon[];
  cargando: boolean;
}

export default function Gallery({ armazones, cargando }: GalleryProps) {
  return (
    <section id="marcos" className="py-24 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16 text-center">
          <h2 className="text-[#c5a059] font-bold uppercase tracking-[0.5em] text-[10px] mb-4">Colección Exclusiva</h2>
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
            <p className="text-gray-400 text-sm tracking-widest uppercase">No hay armazones disponibles por el momento.</p>
          </div>
        ) : (
          /* 3. GRID DINÁMICO */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {armazones.map((lente, i) => (
              <motion.div 
                key={lente.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative aspect-[4/5] overflow-hidden bg-[#001529] border border-[#c5a059]/10 cursor-pointer rounded-2xl shadow-2xl"
              >
                <img 
                  src={lente.imagen || "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop"} 
                  alt={lente.nombre}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Capa de gradiente interactiva */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001529] via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
                
                {/* Contenedor de Textos Dinámicos de Firestore */}
                <div className="absolute bottom-6 left-6 right-6 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.3em]">
                    {lente.stock > 0 ? `Disponibles: ${lente.stock}` : "Agotado"}
                  </span>
                  
                  <h4 className="text-white text-xl font-bold mt-1 uppercase tracking-tight">{lente.nombre}</h4>
                  
                  {/* Descripción del producto al hacer Hover */}
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                    {lente.descripcion}
                  </p>
                  
                  <div className="mt-3 pt-2 border-t border-[#c5a059]/10 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="text-[#c5a059] font-black text-lg">${lente.precio} MXN</span>
                    
                    {/* 🔥 CAMBIAZO ACÁ: Transformamos el span plano en un Link dinámico apuntando al ID de Firebase */}
                    <Link 
                      href={`/armazones/${lente.id}`}
                      className="text-[10px] text-white/50 uppercase tracking-widest border border-white/10 px-2 py-1 rounded hover:bg-white/10 hover:text-white transition-all duration-300"
                    >
                      Ver Detalle
                    </Link>
                  </div>
                </div>

                <div className="absolute inset-0 border border-[#c5a059]/0 group-hover:border-[#c5a059]/30 rounded-2xl transition-all duration-500 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}