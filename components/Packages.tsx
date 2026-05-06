"use client";

import React, { useState } from 'react';
import { Check, Zap, Star, Users, Trophy, X } from 'lucide-react';

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
  const [formData, setFormData] = useState({ nombre: '', celular: '', institucion: '', ciudad: '' });

  // CONFIGURÁ TU TELÉFONO ACÁ (Sin el +, solo números)
  const WHATSAPP_NUMBER = "521999XXXXXXX"; 

  const handleOpen = (pkgName: string) => {
    setSelectedPkg(pkgName);
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mensaje = `Hola Fede! Soy ${formData.nombre} de la institución ${formData.institucion} (${formData.ciudad}). Me interesa el ${selectedPkg}. Mi cel es ${formData.celular}.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <section className="py-24 px-6 relative bg-transparent" id="paquetes">
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
            <div 
              key={pkg.id}
              className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-700 hover:-translate-y-3 ${
                pkg.recommended 
                ? 'bg-white/[0.08] border-[#c5a059]/50 shadow-[0_20px_50px_rgba(197,160,89,0.15)]' 
                : 'bg-black/20 border-white/5 hover:border-white/20 shadow-2xl'
              } backdrop-blur-2xl`}
            >
              {pkg.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c5a059] text-black text-[9px] font-black px-6 py-1 rounded-full uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(197,160,89,0.5)] z-20">
                  Más Elegido
                </div>
              )}

              {/* ICONO RENDERIZADO COMO COMPONENTE - Soluciona error TS */}
              <div className={`mb-8 p-3 rounded-xl w-fit ${pkg.recommended ? 'bg-[#c5a059]/20' : 'bg-white/5'}`}>
                <pkg.icon 
                  size={24} 
                  className={pkg.recommended ? "text-[#c5a059]" : "text-white/40"} 
                />
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
                    ? 'from-white via-[#c5a059] to-[#866d3c] drop-shadow-[0_0_10px_rgba(197,160,89,0.3)]' 
                    : 'from-white via-gray-400 to-gray-600'
                  }`}>
                    {pkg.price}
                  </span>
                </div>

                <button 
                  onClick={() => handleOpen(pkg.name)}
                  className={`w-full py-4 text-[9px] uppercase tracking-[0.4em] font-black transition-all duration-500 rounded-lg shadow-sm active:scale-95 ${
                    pkg.recommended 
                    ? 'bg-[#c5a059] text-black hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]' 
                    : 'bg-transparent border border-white/10 text-white hover:bg-white hover:text-black'
                  }`}
                >
                  {pkg.recommended ? 'Reservar Experiencia' : 'Solicitar Info'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL POP-UP */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 p-10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,1)]">
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-6 right-6 text-gray-500 hover:text-[#c5a059] transition-colors"
            >
              <X size={24}/>
            </button>

            <div className="mb-8">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">
                Solicitar <span className="text-[#c5a059]">{selectedPkg}</span>
              </h3>
              <div className="w-12 h-[2px] bg-[#c5a059] mb-4"></div>
              <p className="text-[9px] text-gray-500 uppercase tracking-[0.3em] font-bold">
                Dejanos tus datos para coordinar
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest text-gray-600 ml-1">Nombre Completo</label>
                <input required type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-xs uppercase tracking-widest focus:border-[#c5a059] focus:bg-white/[0.07] outline-none transition-all" onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest text-gray-600 ml-1">WhatsApp</label>
                <input required type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-xs uppercase tracking-widest focus:border-[#c5a059] focus:bg-white/[0.07] outline-none transition-all" onChange={(e) => setFormData({...formData, celular: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest text-gray-600 ml-1">Institución / Empresa</label>
                <input required type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-xs uppercase tracking-widest focus:border-[#c5a059] focus:bg-white/[0.07] outline-none transition-all" onChange={(e) => setFormData({...formData, institucion: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest text-gray-600 ml-1">Ciudad</label>
                <input required type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-xs uppercase tracking-widest focus:border-[#c5a059] focus:bg-white/[0.07] outline-none transition-all" onChange={(e) => setFormData({...formData, ciudad: e.target.value})} />
              </div>

              <button 
                type="submit" 
                className="w-full py-5 bg-[#c5a059] text-black font-black uppercase text-[10px] tracking-[0.4em] rounded-xl hover:bg-white hover:scale-[1.02] active:scale-95 transition-all mt-6"
              >
                Enviar vía WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}