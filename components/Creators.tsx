"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target } from 'lucide-react';

export default function Creators() {
  const [selectedMember, setSelectedMember] = useState<null | number>(null);

  const team = [
    {
      name: "Alesis Fleitas",
      role: "Dirección Actoral y Técnica",
      bio: "Actor profesional con más de 23 años de trayectoria y 1,200 funciones realizadas.",
      fullBio: "Actor profesional con más de 23 años de trayectoria, protagonista de más de 1,200 funciones y 25 obras teatrales. Su experiencia se extiende a través de giras internacionales por Argentina, Chile, Colombia, Costa Rica y México, sumado a un recorrido consolidado en cine independiente, publicidad y producciones audiovisuales. Es un experto en técnicas de improvisación, destacándose por su destreza en la creación de personajes y un dominio impecable de la presencia escénica bajo presión.",
      image: "https://i.imgur.com/HyC1sj7.png", 
      ig: "https://www.instagram.com/jonatanalesisfleitas/",
      highlights: ["+1,200 Funciones", "Experto en Improvisación", "Giras Internacionales"]
    },
    {
      name: "Eduardo Hernández",
      role: "Desarrollo Creativo y Dinámicas",
      bio: "Gestor creativo especializado en infancias y adolescencias con 14 años de experiencia.",
      fullBio: "Gestor creativo y egresado de la Universidad de las Artes de Yucatán (UNAY), especializado en técnicas circenses, clown, máscara e improvisación. Con 14 años de experiencia en la escena y giras nacionales, ha dedicado su carrera a la creación de espectáculos enfocados en infancias y adolescencias, con un enfoque distintivo en la generación de lenguajes artísticos propios. Su visión estratégica es fundamental para la adaptabilidad de nuestras soluciones a diversas audiencias.",
      image: "https://i.imgur.com/WDS8qTX.png", 
      ig: "https://www.instagram.com/laloimpro/",
      highlights: ["Egresado UNAY", "Especialista en Clown", "Enfoque Pedagógico"]
    },
    {
      name: "Fede Villalba",
      role: "Estratega Operativo y Gestor de Proyectos",
      bio: "Especialista en viabilidad técnica, gerencia de proyectos y soluciones tecnológicas.",
      fullBio: "Especialista en la viabilidad técnica y comercial. Con trayectoria integral en la gerencia de proyectos escénicos, lidera desde la coordinación logística y estrategias de ventas hasta la producción integral de contenidos digitales y el diseño de soluciones tecnológicas, garantizando una estructura operativa sólida y eficiente para cada propuesta.",
      image: "https://i.imgur.com/T7gyife.png", 
      in: "https://www.linkedin.com/in/federicovillalba/",
      highlights: ["Gerencia de Proyectos", "Producción Digital", "Estrategia de Ventas"]
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
    <section id="creators" className="py-32 px-6 bg-black relative overflow-hidden">
      <style jsx global>{`
        #custom-cursor, .custom-cursor, [class*="cursor"] { z-index: 9999999 !important; }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-[#c5a059] font-bold uppercase tracking-[0.5em] text-[10px] mb-4">El Equipo</h2>
          <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            LAS <span className="italic font-light text-gray-500">MENTES</span> <br /> 
            DETRÁS DEL <span className="text-[#c5a059]">FLOW</span>
          </h3>
          <div className="w-12 h-[2px] bg-[#c5a059] mt-8 mx-auto md:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 max-w-6xl mx-auto">
          {team.map((member, i) => (
            <div key={i} className="group relative">
              <div 
                className="cursor-pointer" 
                onClick={() => setSelectedMember(i)}
              >
                {/* EFECTO DE SCROLL RESTAURADO: Pasa de grayscale(100) a grayscale(0) al entrar en pantalla */}
                <motion.div 
                  initial={{ filter: 'grayscale(100%) brightness(0.3)', scale: 0.95 }}
                  whileInView={{ filter: 'grayscale(0%) brightness(1)', scale: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-8 border border-white/5 rounded-3xl shadow-2xl transition-all duration-500 md:group-hover:border-[#c5a059]/30"
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out md:group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </motion.div>

                <div className="space-y-4 px-2">
                  <h4 className="text-3xl font-black text-white uppercase tracking-tighter group-hover:text-[#c5a059] transition-colors duration-500 leading-none">
                    {member.name}
                  </h4>
                  <p className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest font-light leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity duration-500 pr-4">
                    {member.bio}
                  </p>
                </div>
              </div>

              <div className="flex gap-6 pt-8 pb-4 items-center px-2">
                 <div className="w-10 h-[1px] bg-gradient-to-r from-[#c5a059] to-transparent"></div>
                 {member.ig && (
                   <a href={member.ig} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#c5a059] hover:scale-125 transition-all duration-300">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                   </a>
                 )}
                 {member.in && (
                   <a href={member.in} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#c5a059] hover:scale-125 transition-all duration-300">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                   </a>
                 )}
              </div>
            </div>
          ))}
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
              className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl z-[100000]"
            >
              <button onClick={() => setSelectedMember(null)} className="absolute top-8 right-8 text-white/50 hover:text-white z-50 transition-colors bg-black/50 p-2 rounded-full"><X size={28} /></button>
              
              <div className="flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-hidden">
                <div className="w-full md:w-[45%] aspect-[4/5] md:aspect-auto relative overflow-hidden">
                  {/* Foto a Color en el Modal - OK */}
                  <img src={team[selectedMember].image} alt="" className="w-full h-full object-cover brightness-90 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60"></div>
                </div>
                
                <div className="p-8 md:p-14 flex-1 flex flex-col justify-center">
                  <span className="text-[#c5a059] text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] italic">{team[selectedMember].role}</span>
                  <h4 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mt-4 leading-none">{team[selectedMember].name}</h4>
                  <div className="w-10 h-[2px] bg-[#c5a059] my-10"></div>
                  
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light mb-12 pr-6">
                    {team[selectedMember].fullBio}
                  </p>

                  <div className="grid grid-cols-1 gap-5">
                    {team[selectedMember].highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-4 text-[10px] md:text-[11px] text-white uppercase tracking-[0.3em] font-bold opacity-80">
                        <Target size={16} className="text-[#c5a059] shrink-0" />
                        {h}
                      </div>
                    ))}
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