"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Importamos motion
import { Check, Zap, Star, Users, Trophy, X } from 'lucide-react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const packages = [
  {
    id: 1,
    name: "Show Único",
    icon: Zap,
    features: [
      "1 función de 60 minutos",
      "Hasta 300-400 estudiantes",
      "Material pedagógico post-show"
    ],
    price: "$5000 MXN",
    recommended: false
  },
  {
    id: 2,
    name: "Ciclo Improflow",
    icon: Star,
    features: [
      "3 funciones en 1 año (inicio, mitad, cierre)",
      "10% de descuento incluido",
      "Reunión de planificación incluida"
    ],
    price: "$13000 MXN",
    recommended: true
  },
  {
    id: 3,
    name: "Taller + Show",
    icon: Users,
    features: [
      "Show 60 min + Taller 90 min para docentes",
      "Certificado incluido",
      "Material de apoyo exclusivo"
    ],
    price: "$8000 MXN",
    recommended: false
  },
  {
    id: 4,
    name: "Residencia Artística",
    icon: Trophy,
    features: [
      "Semana completa: 2 shows + 2 talleres",
      "Sesión de planificación estratégica",
      "Reporte de impacto incluido"
    ],
    price: "Consultar",
    recommended: false
  }
];

export default function Packages() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState("");
  const [formData, setFormData] = useState({ nombre: '', institucion: '', ciudad: '' });
  const [phone, setPhone] = useState<string | undefined>();

  const WHATSAPP_NUMBER = "529992207996"; 

  const handleOpen = (pkgName: string) => {
    setSelectedPkg(pkgName);
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mensaje = `¡Hola equipo de Improflow! 🎭✨\n\nSoy *${formData.nombre}* de la institución *${formData.institucion}* (📍 ${formData.ciudad}).\n\nMe contacto porque nos interesa reservar la experiencia: 🌟 *${selectedPkg}* 🌟.\n\nLes dejo mi WhatsApp directo: 📱 ${phone}.\n\n¡Quedo a la espera para coordinar! 🤝`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <section className="py-24 px-6 relative bg-transparent" id="paquetes">
      <style jsx global>{`
        .PhoneInput {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
        }
        .PhoneInput:focus-within {
          border-color: #c5a059;
          background: rgba(255, 255, 255, 0.07);
        }
        .PhoneInputInput {
          background: transparent !important;
          border: none !important;
          color: white !important;
          font-size: 0.75rem !important;
          letter-spacing: 0.1em !important;
          outline: none !important;
          margin-left: 0.5rem;
        }
        .PhoneInputCountrySelect {
          background: #0a0a0a !important;
          color: white !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase mb-4">
            Nuestros <span className="text-[#c5a059]">Paquetes</span>
          </h2>
          <p className="text-gray-400 text-[10px] tracking-[0.4em] uppercase font-light">
            Inversiones diseñadas para transformar instituciones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <motion.div 
              key={pkg.id}
              // EFECTO DE ILUMINACIÓN POR SCROLL
              initial={{ 
                opacity: 0.6,
                borderColor: 'rgba(255, 255, 255, 0.05)',
                boxShadow: '0 0 0px rgba(0,0,0,0)'
              }}
              whileInView={{ 
                opacity: 1,
                borderColor: pkg.recommended ? 'rgba(197, 160, 89, 0.5)' : 'rgba(255, 255, 255, 0.2)',
                boxShadow: pkg.recommended 
                  ? '0 10px 40px rgba(197, 160, 89, 0.15)' 
                  : '0 10px 30px rgba(0,0,0,0.4)'
              }}
              viewport={{ 
                once: false, 
                amount: 0.5 // Se activa cuando la tarjeta está a mitad de pantalla
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-500 bg-[#0a0a0a]/40 backdrop-blur-2xl`}
            >
              {pkg.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c5a059] text-black text-[9px] font-black px-6 py-1 rounded-full uppercase tracking-[0.2em] z-20">
                  Más Elegido
                </div>
              )}

              <div className={`mb-8 p-3 rounded-xl w-fit ${pkg.recommended ? 'bg-[#c5a059]/20' : 'bg-white/5'}`}>
                <pkg.icon size={24} className={pkg.recommended ? "text-[#c5a059]" : "text-white/40"} />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-8 tracking-tight uppercase">
                {pkg.name}
              </h3>

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
                  <span className="text-[8px] tracking-[0.4em] text-gray-600 uppercase mb-1 font-bold">Inversión Cultural</span>
                  <span className={`text-2xl font-black tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-b ${
                    pkg.recommended 
                    ? 'from-white via-[#c5a059] to-[#866d3c]' 
                    : 'from-white via-gray-400 to-gray-600'
                  }`}>
                    {pkg.price}
                  </span>
                </div>

                <button 
                  onClick={() => handleOpen(pkg.name)}
                  className={`w-full py-4 text-[9px] uppercase tracking-[0.4em] font-black transition-all duration-500 rounded-lg ${
                    pkg.recommended 
                    ? 'bg-[#c5a059] text-black hover:bg-white' 
                    : 'bg-transparent border border-white/10 text-white hover:bg-white hover:text-black'
                  }`}
                >
                  {pkg.recommended ? 'Reservar Experiencia' : 'Solicitar Info'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL POP-UP (Se mantiene igual) */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 p-10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,1)]">
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-[#c5a059] transition-colors">
              <X size={24}/>
            </button>
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">
                Solicitar <span className="text-[#c5a059]">{selectedPkg}</span>
              </h3>
              <p className="text-[9px] text-gray-400 uppercase tracking-[0.3em] font-bold">
                Dejanos tus datos para coordinar
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest text-white-600 ml-1">Nombre Completo</label>
                <input required type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-xs uppercase tracking-widest focus:border-[#c5a059] outline-none transition-all" onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest text-white-600 ml-1">WhatsApp (con país)</label>
                <PhoneInput international defaultCountry="MX" countries={['AR', 'MX', 'ES', 'CO', 'CL', 'PE', 'UY', 'PY', 'BO', 'EC', 'VE', 'CU', 'DO', 'PR', 'GT', 'HN', 'SV', 'NI', 'CR', 'PA']} value={phone} onChange={setPhone} required className="premium-phone-input" />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest text-white-600 ml-1">Institución / Empresa</label>
                <input required type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-xs uppercase tracking-widest focus:border-[#c5a059] outline-none transition-all" onChange={(e) => setFormData({...formData, institucion: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest text-gray-600 ml-1">Ciudad</label>
                <input required type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-xs uppercase tracking-widest focus:border-[#c5a059] outline-none transition-all" onChange={(e) => setFormData({...formData, ciudad: e.target.value})} />
              </div>
              <button type="submit" className="w-full py-5 bg-[#c5a059] text-black font-black uppercase text-[10px] tracking-[0.4em] rounded-xl hover:bg-white transition-all mt-6 shadow-[0_10px_20px_rgba(197,160,89,0.2)]">
                Enviar vía WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}