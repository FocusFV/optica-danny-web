"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Eye, shadow, Sparkles, X, Smartphone } from 'lucide-react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const packages = [
  {
    id: 1,
    name: "Examen de la Vista",
    icon: Eye,
    features: [
      "Evaluación computarizada",
      "Prueba de agudeza visual",
      "Diagnóstico profesional"
    ],
    price: "Gratis c/ compra",
    recommended: false
  },
  {
    id: 2,
    name: "Armazones Premium",
    icon: Sparkles,
    features: [
      "Marcas internacionales",
      "Garantía de 1 año",
      "Ajuste personalizado"
    ],
    price: "Desde $1200 MXN",
    recommended: true
  },
  {
    id: 3,
    name: "Lentes de Contacto",
    icon: Zap,
    features: [
      "Marcas: Acuvue, Biofinity",
      "Líquido de limpieza incluido",
      "Prueba de adaptación"
    ],
    price: "Desde $850 MXN",
    recommended: false
  }
];

export default function Packages() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState("");
  const [formData, setFormData] = useState({ nombre: '', ciudad: '' });
  const [phone, setPhone] = useState<string | undefined>();

  const WHATSAPP_NUMBER = "529992207996"; 

  const handleOpen = (pkgName: string) => {
    setSelectedPkg(pkgName);
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mensaje = `¡Hola Óptica Danny! 👓✨\n\nSoy *${formData.nombre}* de *${formData.ciudad}*.\n\nMe interesa consultar por: 🌟 *${selectedPkg}* 🌟.\n\nMi WhatsApp: ${phone}.\n\n¡Espero su respuesta!`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <section className="py-24 px-6 relative bg-transparent" id="servicios">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase mb-4">
            Nuestros <span className="text-[#c5a059]">Servicios</span>
          </h2>
          <p className="text-gray-400 text-[10px] tracking-[0.4em] uppercase font-light">
            Soluciones visuales con tecnología y estilo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <motion.div 
              key={pkg.id}
              className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-500 bg-[#001529]/40 backdrop-blur-2xl border-[#c5a059]/20`}
              whileHover={{ y: -10, borderColor: '#c5a059' }}
            >
              {pkg.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c5a059] text-black text-[9px] font-black px-6 py-1 rounded-full uppercase tracking-[0.2em] z-20">
                  Lo más buscado
                </div>
              )}
              <div className={`mb-8 p-3 rounded-xl w-fit ${pkg.recommended ? 'bg-[#c5a059]/20' : 'bg-white/5'}`}>
                <pkg.icon size={24} className={pkg.recommended ? "text-[#c5a059]" : "text-white/40"} />
              </div>
              <h3 className="text-xl font-bold text-white mb-8 tracking-tight uppercase">{pkg.name}</h3>
              <ul className="space-y-5 mb-10 flex-grow">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-[10px] text-gray-400 tracking-widest leading-relaxed uppercase font-medium">
                    <Check size={14} className="text-[#c5a059] shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8 border-t border-white/5 space-y-6">
                <div className="flex flex-col">
                  <span className="text-[8px] tracking-[0.4em] text-gray-600 uppercase mb-1 font-bold">Precio Estimado</span>
                  <span className="text-2xl font-black tracking-tighter italic text-[#c5a059]">{pkg.price}</span>
                </div>
                <button onClick={() => handleOpen(pkg.name)} className="w-full py-4 text-[9px] uppercase tracking-[0.4em] font-black bg-[#c5a059] text-black rounded-lg hover:bg-white transition-all">
                  Consultar ahora
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL SIMPLIFICADO */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#001529] border border-[#c5a059]/30 p-10 rounded-3xl">
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-[#c5a059]"><X size={24}/></button>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-6 text-center">Consultar <span className="text-[#c5a059]">{selectedPkg}</span></h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input placeholder="NOMBRE" required type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-xs" onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
              <PhoneInput international defaultCountry="MX" value={phone} onChange={setPhone} className="premium-phone-input" />
              <input placeholder="CIUDAD" required type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-xs" onChange={(e) => setFormData({...formData, ciudad: e.target.value})} />
              <button type="submit" className="w-full py-5 bg-[#c5a059] text-black font-black uppercase text-[10px] tracking-[0.4em] rounded-xl hover:bg-white transition-all mt-6">Enviar WhatsApp</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}