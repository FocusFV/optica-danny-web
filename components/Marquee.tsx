"use client";

import React from 'react';

export default function Marquee() {
  // Marcas facheritas para la óptica
  const text = " RAY-BAN • OAKLEY • VOGUE • ARMANI • PRADA • NIKE • RALPH LAUREN • ";
  // Repetimos el bloque para que no haya cortes en la animación
  const block = Array(4).fill(text).join("");

  return (
    <div className="relative w-full overflow-hidden bg-[#c5a059] py-6 my-24 -skew-y-1 border-y border-white/10 shadow-[0_0_60px_rgba(197,160,89,0.15)]">
      {/* Usamos la clase "cinta-infinita" que ya tenés en el globals.css */}
      <div className="flex whitespace-nowrap cinta-infinita w-max">
        <span className="text-black font-black text-3xl md:text-5xl uppercase tracking-[0.3em] px-4 flex items-center">
          {block}
        </span>
        <span className="text-black font-black text-3xl md:text-5xl uppercase tracking-[0.3em] px-4 flex items-center">
          {block}
        </span>
      </div>
      
      {/* Efecto de desvanecido en los bordes para que no corte de golpe */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#c5a059] to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#c5a059] to-transparent z-10"></div>
    </div>
  );
}