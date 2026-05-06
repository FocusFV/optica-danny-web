"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getLocalTime = () => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatTime = (offset: number) => {
    const d = new Date(time.getTime() + (time.getTimezoneOffset() * 60000) + (offset * 3600000));
    return d.getHours().toString().padStart(2, '0') + ":" + 
           d.getMinutes().toString().padStart(2, '0');
  };

  if (!mounted) return null;

  return (
    <footer className="py-16 bg-transparent relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-start text-center md:text-left">
          
          {/* Columna 1: El Logo reemplaza a las letras */}
          <div className="space-y-4">
            <div className="relative w-32 h-20 mx-auto md:mx-0">
              <Image 
                src="/ImproflowLogo.png" 
                alt="Improflow Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed tracking-widest uppercase font-light max-w-xs mx-auto md:mx-0">
              Fusión teatral de Argentina y México. Elevando el arte de la improvisación a un estándar cinematográfico.
            </p>
          </div>

          {/* Columna 2: Redes Sociales (Sin cambios) */}
          <div className="flex flex-col items-center space-y-6">
            <span className="text-[11px] tracking-[0.5em] text-white/60 uppercase font-bold">Seguinos</span>
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <a href="https://facebook.com/Improflow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/80 hover:text-[#c5a059] transition-all group">
                <FaFacebookF size={16} className="group-hover:scale-125 transition-transform" /> 
                <span className="font-medium">Facebook</span>
              </a>
              <a href="https://instagram.com/improflowteatro" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/80 hover:text-[#c5a059] transition-all group">
                <FaInstagram size={16} className="group-hover:scale-125 transition-transform" /> 
                <span className="font-medium">Instagram</span>
              </a>
              <a href="https://tiktok.com/@Improflow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/80 hover:text-[#c5a059] transition-all group">
                <FaTiktok size={16} className="group-hover:scale-125 transition-transform" /> 
                <span className="font-medium">TikTok</span>
              </a>
              <a href="https://youtube.com/@improflow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/80 hover:text-[#c5a059] transition-all group">
                <FaYoutube size={16} className="group-hover:scale-125 transition-transform" /> 
                <span className="font-medium">YouTube</span>
              </a>
            </div>
          </div>

          {/* Columna 3: Relojes (Sin cambios) */}
          <div className="md:text-right space-y-4">
            <span className="text-[14px] tracking-[0.5em] text-white/60 uppercase block mb-4 font-bold">Local Time</span>
            <div className="text-sm tracking-[0.2em] text-gray-400 uppercase font-mono space-y-2">
              <p className="text-[12px]">Tu Hora <span className="text-white ml-2">{getLocalTime()} HS</span></p>
              <p className="text-[12.1px]">Mérida <span className="text-white/70 ml-2">{formatTime(-6)} HS</span></p>
              <p className="text-[12px]">Buenos Aires <span className="text-[#c5a059] ml-2">{formatTime(-3)} HS</span></p>
            </div>
          </div>
        </div>

        {/* Firma con Logo FocusFV (Sin cambios) */}
        <div className="pt-10 border-t border-white/10 flex flex-col items-center">
          <div className="flex flex-col items-center group mb-8">
            <span className="text-[9px] tracking-[1em] text-gray-500 uppercase mb-6">Produced by</span>
            <div className="relative w-48 h-24 transition-transform duration-500 group-hover:scale-105">
              <Image 
                src="/FocusFVLogo.png" 
                alt="FocusFV Logo"
                fill
                className="object-contain drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]"
              />
            </div>
          </div>
          
          <div className="text-[10px] tracking-[0.5em] text-gray-400 uppercase flex flex-col items-center gap-4">
            <p className="font-medium">© 2026 Improflow. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-3 text-gray-600 text-[9px]">
              <p>Mérida</p><span>•</span>
              <p>Rosario</p><span>•</span>
              <p>Buenos Aires</p><span></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}