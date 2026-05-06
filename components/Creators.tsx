"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Creators() {
  const team = [
    {
      name: "Alesis Fleitas",
      role: "Actor Profesional & Co-Fundador",
      bio: "Desde El Jagüel para el mundo. Especialista en teatro de improvisación con años de trayectoria transformando el escenario en puro juego.",
      image: "https://i.imgur.com/HyC1sj7.png", 
      ig: "https://www.instagram.com/jonatanalesisfleitas/", 
    },
    {
      name: "Eduardo Hernández",
      role: "Estrategia & Dirección",
      bio: "La mente detrás de la fusión estratégica. Experto en coordinar la creatividad multicultural para que el impacto sea real.",
      image: "https://i.imgur.com/WDS8qTX.png", 
      ig: "https://www.instagram.com/laloimpro/", 
    },
    {
      name: "Fede Villalba",
      role: "Producción Visual & Operativa",
      bio: "El ojo detrás de FocusFV. Responsable de la estructura, la técnica y de que cada detalle visual de Improflow sea impecable.",
      image: "https://i.imgur.com/T7gyife.png", 
      ig: "https://www.instagram.com/villalba.fede/", 
      in: "https://www.linkedin.com/in/federicovillalba/" 
    }
  ];

  return (
    <section id="creators" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="mb-20">
          <h2 className="text-[#c5a059] font-bold uppercase tracking-[0.5em] text-[10px] mb-4">El Equipo</h2>
          <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
            LAS <span className="italic font-light text-gray-500">MENTES</span> <br /> 
            DETRÁS DEL <span className="text-[#c5a059]">FLOW</span>
          </h3>
          <div className="w-12 h-[2px] bg-[#c5a059] mt-6"></div>
        </div>

        {/* Grilla de Creadores con Revelado Cinematográfico */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {team.map((member, i) => (
            <div key={i} className="group relative">
              
              {/* Contenedor de Imagen con Framer Motion */}
              <motion.div 
                // Efecto de iluminación al scrollear
                initial={{ 
                  filter: 'grayscale(100%) brightness(0.3)', 
                  scale: 0.95 
                }}
                whileInView={{ 
                  filter: 'grayscale(0%) brightness(1)', 
                  scale: 1 
                }}
                viewport={{ 
                  once: false, 
                  amount: 0.5 // Se activa cuando el miembro está bien centrado en el celu
                }}
                transition={{ 
                  duration: 1, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="relative aspect-[3/4] overflow-hidden bg-gray-900 mb-8 border border-white/5 rounded-2xl shadow-2xl"
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out md:group-hover:scale-110"
                />
                
                {/* Overlay degradado premium */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
              </motion.div>

              {/* Info del Miembro con pequeñas animaciones de texto */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0.5, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.8 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h4 className="text-3xl font-black text-white uppercase tracking-tighter group-hover:text-[#c5a059] transition-colors duration-500 leading-none">
                    {member.name}
                  </h4>
                  <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.3em] mt-2">
                    {member.role}
                  </p>
                </motion.div>

                <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light pr-4 uppercase tracking-widest opacity-80">
                  {member.bio}
                </p>
                
                {/* Redes Sociales con íconos premium */}
                <div className="flex gap-6 pt-4 items-center">
                   <div className="w-10 h-[1px] bg-gradient-to-r from-[#c5a059] to-transparent"></div>
                   
                   {/* Instagram */}
                   <a href={member.ig} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#c5a059] hover:scale-125 transition-all duration-300" aria-label={`Instagram de ${member.name}`}>
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                       <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                       <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                       <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                     </svg>
                   </a>
                   
                   {/* LinkedIn */}
                   <a href={member.in} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#c5a059] hover:scale-125 transition-all duration-300" aria-label={`LinkedIn de ${member.name}`}>
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                       <rect x="2" y="9" width="4" height="12"></rect>
                       <circle cx="4" cy="4" r="2"></circle>
                     </svg>
                   </a>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}