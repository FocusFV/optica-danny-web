"use client";

import React, { useState } from "react";
import { MapPin, Phone, Navigation, Send } from "lucide-react";
import { BUSINESS_INFO, buildWhatsAppLink } from "@/lib/constants";

export default function Contact() {
  const [nombre, setNombre] = useState("");
  const [consulta, setConsulta] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consulta.trim()) return;

    const textoMensaje = `¡Hola ${BUSINESS_INFO.name}! 👋\n\nMi nombre es *${
      nombre.trim() || "un cliente"
    }*.\n\n*Consulta:* ${consulta.trim()}\n\n📍 Me gustaría recibir más información.`;

    const url = buildWhatsAppLink(textoMensaje);
    window.open(url, "_blank");
    setConsulta("");
  };

  const linkWhatsAppDirecto = buildWhatsAppLink(
    `¡Hola ${BUSINESS_INFO.name}! 👋 Quiero consultar por modelos de lentes y cómo hacer un pedido en Mérida.`
  );

  return (
    <div className="py-24 px-6 relative overflow-hidden">
      {/* Luz de fondo sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c5a059]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Columna Izquierda: Info de Contacto */}
          <div className="text-left">
            <h2 className="text-[#c5a059] font-bold uppercase tracking-[0.5em] text-[10px] mb-4">Atención y Entregas</h2>
            <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6 leading-tight">
              PEDÍ TUS LENTES <br /> EN <span className="text-[#c5a059]">MÉRIDA</span>
            </h3>

            <p className="text-neutral-400 text-sm font-light leading-relaxed mb-10 max-w-md">
              Elegí tus armazones, mandanos tu receta médica por WhatsApp y coordinamos la entrega de tus lentes listos en el punto de Mérida que te quede más cómodo.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <MapPin className="text-[#c5a059]" size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Zona de Cobertura</p>
                  <p className="text-white text-base font-light tracking-wide">
                    Mérida, Yucatán (Entregas personales y envíos)
                  </p>
                </div>
              </div>

              <a
                href={linkWhatsAppDirecto}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 group cursor-pointer"
              >
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-[#c5a059]/50 transition-colors">
                  <Phone className="text-[#c5a059]" size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">WhatsApp de Atención</p>
                  <p className="text-white text-base font-light tracking-wide group-hover:text-[#c5a059] transition-colors">
                    {BUSINESS_INFO.whatsappDisplay}
                  </p>
                </div>
              </a>
            </div>

            <div className="mt-10">
              <a 
                href={linkWhatsAppDirecto}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#c5a059] text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-[#dfba75] transition-all shadow-[0_10px_20px_rgba(197,160,89,0.2)] active:scale-95"
              >
                <Send size={15} />
                Consultar por WhatsApp
              </a>
            </div>
          </div>

          {/* Columna Derecha: Formulario Simplificado con envío real a WhatsApp */}
          <div className="bg-[#001529]/50 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <h4 className="text-white text-xl font-bold mb-2 uppercase tracking-tight">Envianos un mensaje</h4>
            <p className="text-xs text-neutral-400 mb-8">Te responderemos a la brevedad por WhatsApp.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold ml-1">Tu Nombre</label>
                <input 
                  type="text" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Diana Sánchez"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#c5a059] outline-none transition-all placeholder-neutral-600" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold ml-1">Consulta o Pregunta</label>
                <textarea 
                  rows={4} 
                  required
                  value={consulta}
                  onChange={(e) => setConsulta(e.target.value)}
                  placeholder="Ej: ¿Tienen disponibilidad de este modelo? ¿Puedo pedir con antirreflejante y mi graduación?..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#c5a059] outline-none transition-all resize-none placeholder-neutral-600"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-5 bg-[#c5a059] text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-xl hover:bg-[#dfba75] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Enviar por WhatsApp</span>
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Footer info sutil */}
        <div className="mt-24 pt-10 border-t border-white/5 text-center">
          <p className="text-[10px] text-gray-500 tracking-[0.5em] uppercase">
            {BUSINESS_INFO.city} • {BUSINESS_INFO.slogan}
          </p>
        </div>
      </div>
    </div>
  );
}
