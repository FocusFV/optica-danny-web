"use client";

import React, { useEffect, useState } from 'react';
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (offset: number) => {
    const d = new Date(time.getTime() + (time.getTimezoneOffset() * 60000) + (offset * 3600000));
    return d.getHours().toString().padStart(2, '0') + ":" + 
           d.getMinutes().toString().padStart(2, '0');
  };

  if (!mounted) return null;

  return (
    <footer className="py-20 bg-transparent relative overflow-hidden">
      {/* Línea divisoria superior con glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 text-center md:text-left">
          
          {/* Logo y Eslogan */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <h4 className="text-2xl font-black text-white tracking-tighter uppercase">
              ÓPTICA <span className="text-[#c5a059]">DANNY</span>
            </h4>
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] leading-relaxed max-w-[200px]">
              Elevando el estándar de la salud visual en Mérida.
            </p>
          </div>

          {/* Navegación Rápida */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-[#c5a059] text-[9px] font-black uppercase tracking-[0.5em] mb-2">Explorar</span>
            <div className="flex flex-col gap-3 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
              <a href="#about" className="hover:text-white transition-colors">Nosotros</a>
              <a href="#equipo" className="hover:text-white transition-colors">Especialistas</a>
              <a href="#paquetes" className="hover:text-white transition-colors">Servicios</a>
              <a href="#contacto" className="hover:text-white transition-colors">Ubicación</a>
            </div>
          </div>

          {/* Social y Hora Local */}
          <div className="flex flex-col items-center md:items-start gap-8">
            <div className="flex gap-6">
              <a href="#" className="text-white/30 hover:text-[#c5a059] transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="text-white/30 hover:text-[#c5a059] transition-colors"><FaWhatsapp size={20} /></a>
              <a href="#" className="text-white/30 hover:text-[#c5a059] transition-colors"><FaMapMarkerAlt size={20} /></a>
            </div>
            
            <div className="text-white font-black uppercase tracking-[0.3em]">
              <p className="text-[9px] text-gray-500 mb-2">Mérida Local Time</p>
              <p className="text-2xl">{formatTime(-6)} <span className="text-[#c5a059] animate-pulse">HS</span></p>
            </div>
          </div>
        </div>

        {/* Créditos y Firma */}
        <div className="pt-12 border-t border-white/5 flex flex-col items-center gap-10">
          <div className="flex flex-col items-center group cursor-default">
            <span className="text-[8px] tracking-[1em] text-gray-600 uppercase mb-4">Developed by</span>
            <div className="relative opacity-50 group-hover:opacity-100 transition-all duration-700 filter grayscale group-hover:grayscale-0">
               {/* Acá va tu logo de FocusFV */}
               <span className="text-xl font-black text-white tracking-tighter">FOCUS<span className="text-[#c5a059]">FV</span></span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between w-full items-center gap-6 text-[9px] tracking-[0.4em] text-gray-600 uppercase font-medium">
            <p>© 2026 ÓPTICA DANNY. TODOS LOS DERECHOS RESERVADOS.</p>
            <div className="flex gap-8">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}