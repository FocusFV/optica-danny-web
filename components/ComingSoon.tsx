"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Glasses, Sparkles, Eye, ShieldCheck, ArrowRight, Lock, CheckCircle2, MessageCircle } from "lucide-react";
import { BUSINESS_INFO, buildWhatsAppLink } from "@/lib/constants";
import Link from "next/link";

interface ComingSoonProps {
  onUnlockPreview?: () => void;
}

export default function ComingSoon({ onUnlockPreview }: ComingSoonProps) {
  const [nombreVip, setNombreVip] = useState("");
  const [telefonoVip, setTelefonoVip] = useState("");
  const [mostrarModalAcceso, setMostrarModalAcceso] = useState(false);
  const [claveIngresada, setClaveIngresada] = useState("");
  const [errorClave, setErrorClave] = useState("");

  // Acción para unirse a la lista VIP de apertura por WhatsApp
  const handleRegistroVip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreVip.trim()) return;

    const mensajeVip = `¡Hola ${BUSINESS_INFO.name}! 🌟✨\n\nMi nombre es *${nombreVip.trim()}*${
      telefonoVip ? ` (Tel: ${telefonoVip.trim()})` : ""
    }.\n\nVi el adelanto de su nueva tienda online y *quiero registrarme para el beneficio de apertura (15% OFF)*.\n\n¡Espero las novedades de la inauguración! 👓`;

    window.open(buildWhatsAppLink(mensajeVip), "_blank");
    setNombreVip("");
    setTelefonoVip("");
  };

  // Mensaje para consulta directa rápida
  const linkWhatsAppConsulta = buildWhatsAppLink(
    `¡Hola ${BUSINESS_INFO.name}! 👋 Vi el adelanto de la tienda web y tengo una consulta sobre armazones y turnos para examen de la vista en Mérida.`
  );

  // Intentar desbloquear preview con la clave rápida
  const manejarDesbloqueo = (e: React.FormEvent) => {
    e.preventDefault();
    if (claveIngresada.trim() === "2026" || claveIngresada.trim().toLowerCase() === "danny") {
      if (onUnlockPreview) {
        onUnlockPreview();
      }
    } else {
      setErrorClave("Clave incorrecta");
    }
  };

  return (
    <div className="min-h-screen bg-[#001529] text-white relative overflow-hidden flex flex-col justify-between selection:bg-[#c5a059] selection:text-black">
      
      {/* Luces y fondos difusos luxury */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#05233d] via-[#001529] to-[#000d1a]"></div>
      
      {/* Resplandor radial dorado suave de fondo */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c5a059]/10 rounded-full blur-[160px] pointer-events-none z-0"></div>

      {/* Trama dorada sutil */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.025] pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5a059' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
        }}
      ></div>

      {/* HEADER SUPERIOR MINIMALISTA */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-white font-black tracking-[0.4em] text-xs md:text-sm uppercase">
            ÓPTICA DANNY
          </span>
          <span className="text-[8px] bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30 font-black tracking-widest px-2.5 py-1 rounded-full uppercase">
            Mérida • Próximamente
          </span>
        </div>

        <a
          href={linkWhatsAppConsulta}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 text-[10px] text-neutral-300 hover:text-[#c5a059] border border-white/10 hover:border-[#c5a059]/40 bg-white/5 px-4 py-2 rounded-full uppercase tracking-widest font-bold transition-all"
        >
          <MessageCircle size={13} className="text-[#c5a059]" />
          <span>Atención Directa</span>
        </a>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center text-center space-y-12">
        
        {/* LOGO EN BREATHE LOOP CON RESPLANDOR DORADO */}
        <div className="relative flex items-center justify-center pt-4">
          
          {/* Luz pulsante detrás del logo (Breathe Glow) */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.3, 0.75, 0.3],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-56 h-56 md:w-80 md:h-80 bg-[#c5a059]/25 rounded-full blur-[90px] pointer-events-none"
          />

          {/* Logo con respiración armónica */}
          <motion.div
            animate={{
              scale: [1, 1.045, 1],
              y: [0, -6, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 w-64 md:w-96 cursor-default"
          >
            <img
              src="/logodannyblanco.png"
              alt="Óptica Danny"
              className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] filter"
            />
          </motion.div>
        </div>

        {/* TITULARES Y DESCRIPCIÓN */}
        <div className="space-y-5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-ping" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#c5a059]">
              Boutique Digital en Preparación
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            Una nueva experiencia visual <br />
            <span className="texto-gradient-gold">está por comenzar</span>
          </h1>

          <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-light">
            Estamos afinando los últimos detalles de nuestra plataforma en línea. Muy pronto vas a poder explorar colecciones exclusivas de armazones, consultar disponibilidad en tiempo real y coordinar tu salud visual en Mérida con el estándar que merecés.
          </p>
        </div>

        {/* QUÉ VA A TENER EL SITIO (SNEAK PEEK / 3 PILARES) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full pt-4 text-left">
          
          <div className="p-6 rounded-2xl bg-[#021120]/80 border border-white/5 backdrop-blur-md hover:border-[#c5a059]/30 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Glasses size={20} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white mb-2">
              Modelos Exclusivos
            </h3>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
              Armazones oftálmicos y de sol de marcas internacionales (Ray-Ban, Oakley, acetato premium y smart glasses).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#021120]/80 border border-white/5 backdrop-blur-md hover:border-[#c5a059]/30 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Eye size={20} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white mb-2">
              Exámenes Computarizados
            </h3>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
              Diagnóstico refractivo digital de alta precisión en nuestro consultorio en Mérida, Yucatán.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#021120]/80 border border-white/5 backdrop-blur-md hover:border-[#c5a059]/30 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles size={20} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white mb-2">
              Concierge & Entrega
            </h3>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
              Asesoramiento personalizado de calce y graduación con entregas coordinadas a tu medida.
            </p>
          </div>

        </div>

        {/* LEAD MAGNET / PRE-REGISTRO VIP & WHATSAPP */}
        <div className="w-full max-w-xl bg-gradient-to-b from-[#021120] to-[#010c17] border border-[#c5a059]/30 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="space-y-1">
            <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em] block">
              Club de Apertura
            </span>
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white">
              Asegurá tu Beneficio de Lanzamiento
            </h2>
            <p className="text-[11px] text-neutral-400">
              Registrate en la lista anticipada y recibí un <strong className="text-[#c5a059]">15% OFF</strong> en tu próximo armazón cuando la web abra sus puertas.
            </p>
          </div>

          <form onSubmit={handleRegistroVip} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={nombreVip}
                onChange={(e) => setNombreVip(e.target.value)}
                placeholder="Tu Nombre completo"
                className="w-full bg-[#001529] border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-neutral-600 outline-none focus:border-[#c5a059] transition-all"
              />
              <input
                type="tel"
                value={telefonoVip}
                onChange={(e) => setTelefonoVip(e.target.value)}
                placeholder="WhatsApp (opcional)"
                className="w-full bg-[#001529] border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-neutral-600 outline-none focus:border-[#c5a059] transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#c5a059] to-[#dfba75] text-black font-black text-xs uppercase tracking-[0.2em] py-4 rounded-xl shadow-xl hover:from-[#dfba75] hover:to-[#c5a059] transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Quiero el Beneficio de Apertura</span>
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-neutral-400">
            <span>¿Tenés una consulta inmediata?</span>
            <a
              href={linkWhatsAppConsulta}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c5a059] hover:underline font-bold flex items-center gap-1"
            >
              <MessageCircle size={12} />
              <span>Chatear por WhatsApp ahora</span>
            </a>
          </div>
        </div>

      </main>

      {/* FOOTER DISCRETO CON ENLACE DE EQUIPO */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-neutral-500 uppercase tracking-widest">
        <p>© 2026 {BUSINESS_INFO.name} — {BUSINESS_INFO.city}</p>

        <div className="flex items-center gap-5">
          {/* Botón para abrir modal de preview si estás en la web pública */}
          <button
            type="button"
            onClick={() => setMostrarModalAcceso(true)}
            className="text-neutral-500 hover:text-white transition-colors flex items-center gap-1 font-bold"
            title="Vista previa del equipo"
          >
            <Lock size={11} />
            <span>Vista Previa</span>
          </button>

          {/* Enlace directo al panel de control */}
          <Link
            href="/admin/productos"
            className="text-neutral-500 hover:text-[#c5a059] transition-colors font-bold"
          >
            Panel de Inventario →
          </Link>
        </div>
      </footer>

      {/* MODAL PARA ACTIVAR VISTA PREVIA RÁPIDA (BYPASS) */}
      {mostrarModalAcceso && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xs bg-[#021120] border border-white/10 p-6 rounded-3xl shadow-2xl space-y-4 text-center">
            <button
              onClick={() => setMostrarModalAcceso(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-sm font-bold"
            >
              ✕
            </button>

            <div className="w-10 h-10 rounded-full bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center mx-auto mb-2">
              <Lock size={18} />
            </div>

            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Desbloquear Vista Previa
            </h3>
            <p className="text-[11px] text-neutral-400">
              Ingresá el PIN de Óptica Danny para ver la tienda completa.
            </p>

            <form onSubmit={manejarDesbloqueo} className="space-y-3">
              <input
                type="password"
                autoFocus
                value={claveIngresada}
                onChange={(e) => setClaveIngresada(e.target.value)}
                placeholder="PIN"
                className="w-full bg-[#001529] border border-white/10 rounded-xl p-3 text-center text-sm font-bold text-white outline-none focus:border-[#c5a059]"
              />
              {errorClave && (
                <p className="text-[10px] text-rose-400 font-bold uppercase">{errorClave}</p>
              )}
              <button
                type="submit"
                className="w-full bg-[#c5a059] text-black font-black text-xs uppercase tracking-widest py-3 rounded-xl hover:bg-[#dfba75] transition-all"
              >
                Acceder a la Tienda
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
