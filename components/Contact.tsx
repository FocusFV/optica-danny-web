"use client";

import React from 'react';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';

export default function Contact() {
  // Ajusté los datos a tu ubicación actual en Mérida
  const address = "Mérida, Yucatán, México";
  const mapLink = "https://www.google.com/maps/search/?api=1&query=Optica+Danny+Merida";

  return (
    <section id="contacto" className="py-32 px-6 relative overflow-hidden">
      {/* Luz de fondo sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c5a059]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Columna Izquierda: Info de Contacto */}
          <div className="text-left">
            <h2 className="text-[#c5a059] font-bold uppercase tracking-[0.5em] text-[10px] mb-4">Ubicación y contacto</h2>
            <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-8 leading-tight">
              VISITANOS <br /> EN EL <span className="text-[#c5a059]">LOCAL</span>
            </h3>
            
            <div className="space-y-8 mt-12">
              <div className="flex items-center gap-6 group">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-[#c5a059]/50 transition-colors">
                  <MapPin className="text-[#c5a059]" size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Dirección</p>
                  <p className="text-white text-lg font-light tracking-wide">{address}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-[#c5a059]/50 transition-colors">
                  <Phone className="text-[#c5a059]" size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">WhatsApp</p>
                  <p className="text-white text-lg font-light tracking-wide">+52 984 471 9240</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <a 
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#c5a059] text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all shadow-[0_10px_20px_rgba(197,160,89,0.2)]"
              >
                <Navigation size={16} />
                Cómo llegar con Maps
              </a>
            </div>
          </div>

          {/* Columna Derecha: Formulario Simplificado */}
          <div className="bg-[#001529]/50 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <h4 className="text-white text-xl font-bold mb-8 uppercase tracking-tight">Envianos un mensaje</h4>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-gray-500 ml-1">Tu Nombre</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#c5a059] outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-gray-500 ml-1">Consulta</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#c5a059] outline-none transition-all resize-none"></textarea>
              </div>
              <button className="w-full py-5 bg-transparent border border-[#c5a059] text-[#c5a059] font-black uppercase text-[10px] tracking-[0.4em] rounded-xl hover:bg-[#c5a059] hover:text-black transition-all">
                Enviar Consulta
              </button>
            </form>
          </div>
        </div>

        {/* Footer info sutil */}
        <div className="mt-24 pt-10 border-t border-white/5 text-center">
          <p className="text-[10px] text-gray-600 tracking-[0.5em] uppercase">
            Mérida, Yucatán • Luz para tus ojos
          </p>
        </div>
      </div>
    </section>
  );
}