"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  
  const scaleScroll = useTransform(scrollY, [0, 700], [1, 12]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  const filterStyle = useTransform(scrollY, (value) => {
    const currentBlur = Math.max(0, 4 - value / 100);
    return `blur(${currentBlur}px)`;
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative h-[190vh] bg-[#001529]">
      {isMounted ? (
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-onda-dorada">
          
          {/* CONTENEDOR LOGO CENTRAL */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center pointer-events-none px-6">
            <motion.div 
              style={{ scale: scaleScroll, opacity }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full max-w-[700px] flex flex-col items-center justify-center relative"
            >
              {/* Resplandor dorado de fondo */}
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[#c5a059]/15 blur-[120px] rounded-full z-0"
              />
              
              <motion.img 
                src="/logodannyblanco.png" 
                alt="Óptica Danny" 
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              />

              <motion.div className="mt-8 text-center relative z-20">
                <h2 className="texto-gradient-gold text-sm md:text-xl tracking-[0.8em] uppercase opacity-80">
                  Luz para tus ojos
                </h2>
              </motion.div>
            </motion.div>
          </div>

          {/* INDICADOR DE SCROLL TUNEADO */}
          <motion.div 
            style={{ opacity }}
            className="absolute bottom-10 left-0 w-full flex flex-col items-center justify-center gap-3 z-30 pointer-events-none"
          >
             <div className="flex flex-col items-center gap-3">
               <div className="px-4 py-1.5 bg-[#c5a059]/10 backdrop-blur-md rounded-full border border-[#c5a059]/20">
                  <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.6em] whitespace-nowrap">
                    Descubrí tu estilo
                  </span>
               </div>
               
               <div className="relative w-[1.5px] h-16 bg-[#c5a059]/10 overflow-hidden rounded-full">
                  <motion.div 
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[#c5a059]"
                  />
               </div>
             </div>
          </motion.div>
        </div>
      ) : (
        <div className="sticky top-0 h-screen w-full bg-[#001529]" />
      )}
    </section>
  );
}