"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, Sparkles, Target, Zap } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Columna Izquierda: El Manifiesto */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="absolute -left-6 top-0 w-1.5 h-full bg-gradient-to-b from-[#c5a059] to-transparent hidden md:block"></div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[12px] font-bold uppercase tracking-[0.6em] text-[#c5a059] mb-8">
              Nuestra Filosofía
            </h2>
            <h3 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8">
              El error no existe, <br />
              <span className="text-gray-500 font-light italic">es una oportunidad.</span>
            </h3>
            <p className="text-gray-400 text-sm md:text-lg tracking-widest uppercase font-light leading-relaxed max-w-md">
              Un puente cultural entre Argentina y México que transforma la educación a través del arte de la espontaneidad.
            </p>
          </motion.div>
        </div>

        {/* Columna Derecha: Contenido Potenciado */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Card Principal: Espect-Actores */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] p-10 rounded-3xl border border-white/10 hover:border-[#c5a059]/40 transition-all duration-500 group shadow-2xl"
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="p-4 bg-[#c5a059]/10 rounded-2xl group-hover:bg-[#c5a059]/20 transition-colors shadow-inner">
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
          
          {/* Grid de Pilares y Datos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-4 p-6 border-l-2 border-[#c5a059]/30 bg-white/[0.01]"
            >
              <div className="flex items-center gap-3">
                <Target className="text-[#c5a059]" size={20} />
                <span className="text-white text-[12px] uppercase tracking-widest font-black italic">Resultados Reales</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Estudios demuestran una reducción del <strong>-52% en agresión física</strong> tras aplicar metodologías de participación activa como la nuestra.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 p-6 border-l-2 border-[#c5a059]/30 bg-white/[0.01]"
            >
              <div className="flex items-center gap-3">
                <Zap className="text-[#c5a059]" size={20} />
                <span className="text-white text-[12px] uppercase tracking-widest font-black italic">Versión Teen + IA</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Fusionamos la actuación con <strong>Inteligencia Artificial</strong> en tiempo real, proyectando mundos visuales creados por las ideas de los estudiantes.
              </p>
            </motion.div>
          </div>

          {/* Sección de Versiones (Nuevo) */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="pt-10 border-t border-white/5"
          >
            <div className="flex flex-wrap gap-4">
              <span className="px-6 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:border-[#c5a059] hover:text-[#c5a059] transition-all">
                Improflow Kids (7-11 años)
              </span>
              <span className="px-6 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:border-[#c5a059] hover:text-[#c5a059] transition-all">
                Improflow Teen (12-18 años)
              </span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}