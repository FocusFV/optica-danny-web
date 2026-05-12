"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, ShieldCheck, Award } from 'lucide-react';

export default function Creators() {
  const [selectedMember, setSelectedMember] = useState<null | number>(null);

  const team = [
    {
      name: "Diana Sánchez",
      role: "Especialista en Optometría y Salud Visual",
      bio: "Experta en diagnóstico refractivo avanzado y adaptación de soluciones ópticas de alta precisión.",
      fullBio: "Con una sólida trayectoria en el cuidado de la visión, Diana combina el rigor clínico con una sensibilidad estética única. Su especialidad radica en la detección precisa de anomalías refractivas y la prescripción personalizada, asegurando que cada armazón no solo sea un accesorio, sino una herramienta de bienestar. Su enfoque se centra en la salud ocular integral, desde la evaluación optométrica detallada hasta la adaptación de lentes progresivos de última generación en el corazón de Mérida.",
      image: "https://i.imgur.com/OzSxH8T.png", // Después ponele una foto de ella bien profff
      highlights: ["Examen de la Vista Computarizado", "Adaptación de Lentes de Contacto", "Especialista en Salud Ocular"]
    }
  ];

  useEffect(() => {
    if (selectedMember !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedMember]);

  return (
    <section id="equipo" className="py-32 px-6 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        
        <div className="mb-20">
          <h2 className="text-[#c5a059] font-bold uppercase tracking-[0.5em] text-[10px] mb-4">Nuestra Especialista</h2>
          <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            SALUD VISUAL <br /> 
            EN MANOS <span className="text-[#c5a059]">EXPERTAS</span>
          </h3>
          <div className="w-12 h-[2px] bg-[#c5a059] mt-8 mx-auto"></div>
        </div>

        {/* Perfil Único de Diana */}
        <div className="max-w-md mx-auto group relative">
          <div className="cursor-pointer" onClick={() => setSelectedMember(0)}>
            <motion.div 
              initial={{ filter: 'grayscale(100%) brightness(0.3)', scale: 0.95 }}
              whileInView={{ filter: 'grayscale(0%) brightness(1)', scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-8 border border-white/5 rounded-3xl shadow-2xl transition-all duration-500 md:group-hover:border-[#c5a059]/30"
            >
              <img src={team[0].image} alt={team[0].name} className="w-full h-full object-cover transition-transform duration-700 ease-in-out md:group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001529] via-transparent to-transparent opacity-80" />
            </motion.div>

            <div className="space-y-4 px-2">
              <h4 className="text-4xl font-black text-white uppercase tracking-tighter group-hover:text-[#c5a059] transition-colors duration-500 leading-none">{team[0].name}</h4>
              <p className="text-[#c5a059] text-[11px] font-black uppercase tracking-[0.3em] mt-2 italic">{team[0].role}</p>
              <p className="text-gray-400 text-sm uppercase tracking-widest font-light leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity duration-500">{team[0].bio}</p>
            </div>
          </div>
        </div>
      </div>

      {typeof document !== 'undefined' && selectedMember !== null && createPortal(
        <AnimatePresence>
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-6 pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#001529] border border-[#c5a059]/20 rounded-[2.5rem] shadow-2xl z-[100000] max-h-[90vh] overflow-hidden flex flex-col"
            >
              <button 
                onClick={() => setSelectedMember(null)} 
                className="absolute top-4 right-4 md:top-8 md:right-8 text-[#c5a059] z-[60] bg-black/20 p-2 rounded-full"
              >
                <X size={24} />
              </button>
              
              <div className="overflow-y-auto modal-scroll">
                <div className="flex flex-col">
                  <div className="w-full aspect-video relative">
                    <img src={team[0].image} alt="" className="w-full h-full object-cover brightness-75" />
                  </div>
                  
                  <div className="p-8 md:p-12">
                    <span className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.5em] italic">{team[0].role}</span>
                    <h4 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mt-4 leading-none">{team[0].name}</h4>
                    <div className="w-10 h-[2px] bg-[#c5a059] my-8"></div>
                    
                    <p className="text-gray-300 text-base leading-relaxed font-light mb-8">
                      {team[0].fullBio}
                    </p>

                    <div className="space-y-4">
                      {team[0].highlights.map((h, idx) => (
                        <div key={idx} className="flex items-center gap-4 text-[10px] text-white uppercase tracking-[0.3em] font-bold opacity-80">
                          <Award size={16} className="text-[#c5a059] shrink-0" />
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}