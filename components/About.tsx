"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Zap, Sparkles, Eye } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 relative bg-transparent">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto px-6">
        
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.6em] text-[#c5a059] mb-8">Nuestra Visión</h2>
            <h3 className="text-4xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8">
               Ver bien, <br />
               <span className="text-gray-500 font-light italic">sentirse mejor.</span>
            </h3>
            <p className="text-gray-400 text-sm tracking-widest uppercase font-light leading-relaxed">
              En Óptica Danny fusionamos la precisión tecnológica con las últimas tendencias en moda visual para cuidar tu mirada.
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-7 space-y-12">
          <div className="bg-white/[0.03] backdrop-blur-sm p-10 rounded-3xl border border-white/10">
            <div className="flex gap-6">
              <div className="p-4 bg-[#c5a059]/10 rounded-2xl"><Eye className="text-[#c5a059]" size={28} /></div>
              <div>
                <strong className="text-white font-bold block mb-3 uppercase tracking-[0.2em] text-sm">Tecnología de Vanguardia</strong>
                <p className="text-gray-300 text-lg leading-relaxed font-light">Utilizamos equipos de última generación para garantizar una graduación exacta y el máximo confort para tus ojos.</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border-l-2 border-[#c5a059]/30 bg-white/[0.01]">
              <div className="flex items-center gap-3 mb-4"><Target className="text-[#c5a059]" size={20} /><span className="text-white text-[12px] font-black italic uppercase">Precisión</span></div>
              <p className="text-gray-400 text-sm">Lentes tallados digitalmente para una claridad nítida en cada rincón del armazón.</p>
            </div>
            <div className="p-8 border-l-2 border-[#c5a059]/30 bg-white/[0.01]">
              <div className="flex items-center gap-3 mb-4"><Sparkles className="text-[#c5a059]" size={20} /><span className="text-white text-[12px] font-black italic uppercase">Estilo Único</span></div>
              <p className="text-gray-400 text-sm">Contamos con una selección exclusiva de marcos que se adaptan a tu personalidad.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}