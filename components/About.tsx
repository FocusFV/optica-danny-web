"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Target, Zap, ChevronDown, ChevronUp, X, Info, Sparkles } from 'lucide-react';

const versionDetails = {
  kids: {
    title: "Improflow Kids",
    subtitle: "El Laboratorio de la Imaginación Empática",
    age: "7 a 11 años",
    description: "Un espacio donde el juego es la herramienta principal para trabajar la inteligencia emocional. A través de dinámicas de improvisación adaptadas, los chicos exploran la resolución de conflictos de forma creativa.",
    points: [
      "Fomento de la imaginación y curiosidad.",
      "Desarrollo de habilidades sociales básicas.",
      "Metodología lúdica sin presiones pedagógicas directas."
    ]
  },
  teen: {
    title: "Improflow Teen",
    subtitle: "Espect-Actores: Tu Voz en Escena",
    age: "12 a 18 años",
    description: "Una experiencia de alto impacto que utiliza el Teatro Foro para abordar temáticas adolescentes. Es aquí donde la Inteligencia Artificial entra en juego para visualizar sus ideas en tiempo real.",
    points: [
      "Prevención activa del Bullying y Cyberbullying.",
      "Uso de IA para proyección de mundos narrativos.",
      "Participación crítica mediante la técnica de 'STOP'."
    ]
  }
};

const StatCard = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="relative group p-6 border-l-2 border-[#c5a059]/30 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#c5a059]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default function About() {
  const [selectedVersion, setSelectedVersion] = useState<null | 'kids' | 'teen'>(null);

  useEffect(() => {
    const handleScrollLock = () => {
      if (selectedVersion && window.innerWidth >= 768) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    };

    handleScrollLock();
    window.addEventListener('resize', handleScrollLock); 
    
    return () => {
      window.removeEventListener('resize', handleScrollLock);
      document.body.style.overflow = 'unset';
    };
  }, [selectedVersion]);

  return (
    <section id="about" className="py-20 md:py-32 relative">
      {/* FIX CURSOR: Prioridad máxima para el cursor custom */}
      <style jsx global>{`
        #custom-cursor, 
        .custom-cursor, 
        [class*="cursor"] { 
          z-index: 9999999 !important; 
        }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Columna Izquierda */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 mb-10 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="absolute -left-6 top-0 w-1.5 h-full bg-gradient-to-b from-[#c5a059] to-transparent hidden md:block"></div>
            <h2 className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.6em] text-[#c5a059] mb-6 md:mb-8">
              Nuestra Filosofía
            </h2>
            <h3 className="text-4xl md:text-7xl font-black text-white leading-[1.1] md:leading-[0.9] tracking-tighter mb-6 md:mb-8">
               El error no existe, <br />
               <span className="text-gray-500 font-light italic">es una oportunidad.</span>
            </h3>
            <p className="text-gray-400 text-sm md:text-lg tracking-widest uppercase font-light leading-relaxed max-w-md">
              Un puente cultural entre Argentina y México que transforma la educación a través del arte de la espontaneidad.
            </p>
          </motion.div>
        </div>

        {/* Columna Derecha */}
        <div className="lg:col-span-7 space-y-10 md:space-y-12">
          <motion.div className="bg-white/[0.03] backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
              <div className="p-4 bg-[#c5a059]/10 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                <Users className="text-[#c5a059]" size={28} />
              </div>
              <div>
                <strong className="text-white font-bold block mb-3 uppercase tracking-[0.2em] text-xs md:text-sm">
                  Metodología: Espect-Actores
                </strong>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
                  Basados en el <strong>Teatro Foro de Augusto Boal</strong>, rompemos la cuarta pared. El público no solo mira: interviene, propone y cambia el destino de cada historia.
                </p>
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <StatCard delay={0.2}>
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-[#c5a059]" size={20} />
                <span className="text-white text-[12px] uppercase tracking-widest font-black italic">Resultados Reales</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Estudios demuestran una reducción del <strong className="text-white">-52% en agresión física</strong> tras aplicar metodologías de participación activa.
              </p>
            </StatCard>

            <StatCard delay={0.4}>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-[#c5a059]" size={20} />
                <span className="text-white text-[12px] uppercase tracking-widest font-black italic">Versión Teen + IA</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Fusionamos la actuación con <strong>Inteligencia Artificial</strong> en tiempo real, proyectando mundos visuales creados por los estudiantes.
              </p>
            </StatCard>
          </div>

          <div className="pt-10 border-t border-white/5">
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-6 font-bold">Detalles de las versiones:</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <button 
                onClick={() => setSelectedVersion(selectedVersion === 'kids' ? null : 'kids')}
                className={`px-6 py-3 rounded-full border text-[10px] uppercase tracking-[0.3em] font-black transition-all flex items-center gap-2 ${
                  selectedVersion === 'kids' 
                    ? 'border-[#c5a059] bg-[#c5a059]/10 text-[#c5a059]' 
                    : 'border-white/10 text-white bg-white/5 hover:border-[#c5a059]/50'
                }`}
              >
                Improflow Kids 
                <span className="md:hidden">{selectedVersion === 'kids' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</span>
                <span className="hidden md:block"><Info size={12} className="text-[#c5a059]" /></span>
              </button>
              
              <button 
                onClick={() => setSelectedVersion(selectedVersion === 'teen' ? null : 'teen')}
                className={`px-6 py-3 rounded-full border text-[10px] uppercase tracking-[0.3em] font-black transition-all flex items-center gap-2 ${
                  selectedVersion === 'teen' 
                    ? 'border-[#c5a059] bg-[#c5a059]/10 text-[#c5a059]' 
                    : 'border-white/10 text-white bg-white/5 hover:border-[#c5a059]/50'
                }`}
              >
                Improflow Teen 
                <span className="md:hidden">{selectedVersion === 'teen' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</span>
                <span className="hidden md:block"><Info size={12} className="text-[#c5a059]" /></span>
              </button>
            </div>

            {/* ACORDEÓN MOBILE */}
            <div className="block md:hidden">
              <AnimatePresence mode="wait">
                {selectedVersion && (
                  <motion.div
                    key={selectedVersion}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-[#0a0a0a] border border-[#c5a059]/30 rounded-[2rem] p-6 shadow-lg">
                      <div className="space-y-4">
                        <div>
                          <span className="text-[#c5a059] text-[10px] uppercase tracking-[0.4em] font-bold">
                            {versionDetails[selectedVersion].age}
                          </span>
                          <h4 className="text-2xl font-black text-white tracking-tighter uppercase mt-2 leading-none">
                            {versionDetails[selectedVersion].title}
                          </h4>
                          <p className="text-[#c5a059] italic text-sm mt-2">{versionDetails[selectedVersion].subtitle}</p>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed font-light">
                          {versionDetails[selectedVersion].description}
                        </p>
                        <div className="pt-2">
                          <p className="text-white text-[9px] uppercase tracking-[0.3em] font-bold opacity-50 mb-3">Ejes principales:</p>
                          <ul className="space-y-3">
                            {versionDetails[selectedVersion].points.map((p, i) => (
                              <li key={i} className="flex items-start gap-3 text-[11px] text-gray-300 uppercase tracking-widest leading-relaxed">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#c5a059] shrink-0 mt-1.5" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL PC CON PORTAL (VERSIÓN COMPLETA) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedVersion && (
            <div className="hidden md:flex fixed inset-0 z-[99999] items-center justify-center pointer-events-auto">
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedVersion(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full max-w-xl bg-[#0a0a0a] border border-[#c5a059]/30 rounded-[2.5rem] shadow-[0_0_50px_rgba(197,160,89,0.2)] flex flex-col max-h-[85vh] z-[100000] overflow-hidden"
              >
                {/* Header Fijo */}
                <div className="p-8 border-b border-white/5 flex justify-between items-start bg-[#0a0a0a]">
                  <div>
                    <span className="text-[#c5a059] text-[10px] uppercase tracking-[0.4em] font-bold">
                      {versionDetails[selectedVersion].age}
                    </span>
                    <h4 className="text-4xl font-black text-white tracking-tighter uppercase mt-1 leading-none">
                      {versionDetails[selectedVersion].title}
                    </h4>
                  </div>
                  <button 
                    onClick={() => setSelectedVersion(null)}
                    className="text-gray-500 hover:text-white p-2 transition-colors"
                  >
                    <X size={28} />
                  </button>
                </div>

                {/* Cuerpo con scroll propio y todos los textos */}
                <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-[#0a0a0a]">
                  <p className="text-[#c5a059] italic text-base mb-6">{versionDetails[selectedVersion].subtitle}</p>
                  <p className="text-gray-400 text-lg leading-relaxed font-light mb-8">
                    {versionDetails[selectedVersion].description}
                  </p>
                  <div className="space-y-4">
                    <p className="text-white text-[11px] uppercase tracking-[0.3em] font-bold opacity-50 mb-4">Ejes fundamentales:</p>
                    <ul className="space-y-4">
                      {versionDetails[selectedVersion].points.map((p, i) => (
                        <li key={i} className="flex items-start gap-4 text-sm text-gray-300 uppercase tracking-widest leading-relaxed">
                          <Sparkles size={18} className="text-[#c5a059] shrink-0 mt-0.5" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Fijo */}
                <div className="p-6 border-t border-white/5 bg-[#0a0a0a]">
                  <button 
                    onClick={() => setSelectedVersion(null)}
                    className="w-full py-5 bg-[#c5a059] text-black font-black uppercase text-[11px] tracking-[0.4em] rounded-2xl hover:bg-white transition-all shadow-lg"
                  >
                    Cerrar Detalle
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}