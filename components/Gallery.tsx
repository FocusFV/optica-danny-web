"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511499767350-a15941ea55b1?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509100104035-9e7ca97ca595?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=800&auto=format&fit=crop"
  ];

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[4/5] overflow-hidden bg-[#001529] border border-[#c5a059]/10 cursor-pointer rounded-2xl shadow-2xl"
            >
              <img 
                src={src} 
                alt={`Modelo Óptica Danny ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#001529] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
              
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.3em]">Nueva Colección</span>
                <p className="text-white text-lg font-bold mt-1">Armazones Premium</p>
              </div>

              <div className="absolute inset-0 border border-[#c5a059]/0 group-hover:border-[#c5a059]/30 rounded-2xl transition-all duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}