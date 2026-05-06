"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Gallery() {
  // Tus links de Imgur
  const images = [
    "https://i.imgur.com/Tc8rCPq.jpeg",
    "https://i.imgur.com/mNRWI8h.jpeg",
    "https://i.imgur.com/Eincx0J.jpeg",
    "https://i.imgur.com/i7muAde.png",
    "https://i.imgur.com/f2UoeD2.png",
    "https://i.imgur.com/rJPGnYp.png"
  ];

  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado */}
        <div className="mb-16 text-center">
          <h2 className="text-[#c5a059] font-bold uppercase tracking-[0.5em] text-[10px] mb-4">Galería Visual</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
            La <span className="text-gray-500 italic font-light">Energía</span> en escena
          </h3>
          <div className="w-px h-12 bg-gradient-to-b from-[#c5a059] to-transparent mx-auto mt-8"></div>
        </div>

        {/* Grilla Premium con Revelado Dinámico */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <motion.div 
              key={i} 
              // CONFIGURACIÓN DE REVELADO (Efecto Reflector)
              initial={{ 
                filter: 'grayscale(100%) brightness(0.4)', 
                scale: 0.92 
              }}
              whileInView={{ 
                filter: 'grayscale(0%) brightness(1)', 
                scale: 1 
              }}
              viewport={{ 
                once: false, // Se repite para que la web se sienta "viva" al subir y bajar
                amount: 0.6  // Se activa cuando el 60% de la foto está en pantalla (ideal para celu)
              }}
              transition={{ 
                duration: 0.9, 
                ease: [0.22, 1, 0.36, 1] // Quintic ease-out para suavidad premium
              }}
              className="group relative aspect-[4/3] overflow-hidden bg-gray-900 border border-white/5 cursor-pointer rounded-2xl shadow-2xl"
            >
              <img 
                src={src} 
                alt={`Improflow Galería ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out md:group-hover:scale-110"
              />
              
              {/* Overlay de degradado sutil */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500"></div>
              
              {/* Efecto de borde iluminado al hacer hover (opcional para desktop) */}
              <div className="absolute inset-0 border border-[#c5a059]/0 group-hover:border-[#c5a059]/20 transition-colors duration-500 rounded-2xl pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}