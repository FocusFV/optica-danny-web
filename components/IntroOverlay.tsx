"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

interface IntroOverlayProps {
  onEnter: () => void;
}

export default function IntroOverlay({ onEnter }: IntroOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleStart = () => {
    setIsVisible(false);
    onEnter(); // Esta función va a activar el play del audio
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[2000000] bg-black flex flex-col items-center justify-center p-6 text-center"
        >
          {/* Fondo sutil con brillo */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c5a059]/10 rounded-full blur-[120px] opacity-50" />
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10"
          >
            <h1 className="text-white text-[10px] font-black uppercase tracking-[0.8em] mb-4 opacity-60">
              Bienvenido a la Experiencia
            </h1>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-12">
              IMPRO<span className="text-[#c5a059]">FLOW</span>
            </h2>

            <motion.button
              onClick={handleStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-5 bg-transparent border border-[#c5a059]/50 rounded-full overflow-hidden transition-all hover:border-[#c5a059]"
            >
              {/* Efecto de llenado al hacer hover */}
              <div className="absolute inset-0 bg-[#c5a059] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              
              <span className="relative z-10 flex items-center gap-3 text-white group-hover:text-black font-black uppercase text-xs tracking-[0.4em]">
                <Play size={16} fill="currentColor" />
                Entrar al Flow
              </span>
            </motion.button>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 text-white text-[9px] uppercase tracking-[0.3em]"
          >
            Se recomienda el uso de auriculares para una mejor experiencia
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}