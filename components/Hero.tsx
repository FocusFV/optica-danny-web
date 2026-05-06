"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  
  const scaleScroll = useTransform(scrollY, [0, 700], [1, 15]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const videoOpacity = useTransform(scrollY, [0, 600], [0.3, 1]);
  
  return (
    <section className="relative h-[190vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div 
          style={{ 
            opacity: videoOpacity, 
            filter: useTransform(scrollY, (value) => {
              const currentGray = scrollY.get() < 100 ? 100 : Math.max(0, 100 - (scrollY.get() - 100) / 4);
              const currentBlur = Math.max(0, 4 - scrollY.get() / 100);
              return `grayscale(${currentGray}%) blur(${currentBlur}px) saturate(1.1)`;
            })
          }}
          className="absolute inset-0 z-0"
        >
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/videominuto.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
        </motion.div>

        {/* LOGO GIGANTE */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center pointer-events-none px-6">
          <motion.div 
            style={{ scale: scaleScroll, opacity }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full max-w-[850px] flex justify-center relative"
          >
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#c5a059]/25 blur-[100px] rounded-full z-0"
            />
            <motion.img 
              src="/ImproflowLogo.png" 
              alt="Improflow" 
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.03, 1], // ACÁ ESTABA EL ERROR (borré el 'np' que sobraba)
                filter: [
                  "brightness(1) saturate(1.2) contrast(1)",
                  "brightness(1.5) saturate(2) contrast(1.1)",
                  "brightness(1) saturate(1.2) contrast(1)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.9)]"
            />
          </motion.div>
        </div>

        {/* INDICADOR DE SCROLL RENOVADO */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-10 left-0 w-full flex flex-col items-center justify-center gap-3 z-30 pointer-events-none"
        >
           <div className="flex flex-col items-center gap-3">
             <div className="px-4 py-1.5 bg-black/20 backdrop-blur-md rounded-full border border-white/5">
                <span className="text-[9px] md:text-[10px] text-white font-black uppercase tracking-[0.6em] whitespace-nowrap">
                  Scroll para revelar
                </span>
             </div>
             
             <div className="relative w-[1.5px] h-16 bg-white/10 overflow-hidden rounded-full">
                <motion.div 
                  animate={{ 
                    y: ["-100%", "100%"] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute inset-0 bg-[#c5a059]"
                />
             </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}