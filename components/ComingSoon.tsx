"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Glasses, Eye, Truck, ArrowRight, Lock, MessageCircle } from "lucide-react";
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

  const handleRegistroVip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreVip.trim()) return;

    const mensajeVip = `¡Hola ${BUSINESS_INFO.name}! 👋\n\nSoy *${nombreVip.trim()}*${
      telefonoVip ? ` (WhatsApp: ${telefonoVip.trim()})` : ""
    }.\n\nVi el anuncio de la nueva web y me gustaría que me anoten para el *15% de descuento de apertura* en mis próximos lentes 👓✨`;

    window.open(buildWhatsAppLink(mensajeVip), "_blank");
    setNombreVip("");
    setTelefonoVip("");
  };

  const linkWhatsAppConsulta = buildWhatsAppLink(
    `¡Hola ${BUSINESS_INFO.name}! 👋 Vi que están armando la tienda online. Quería consultarles por modelos de lentes y cómo hacer para pedir con mi graduación en Mérida.`
  );

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
      
      {/* Fondo sutil luxury */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#05233d] via-[#001529] to-[#000d1a]"></div>
      
      {/* Resplandor dorado de fondo */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#c5a059]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* HEADER SUPERIOR */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 md:py-8 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <img 
            src="/ojo_danny_dorado.png" 
            alt="Logo Óptica Danny" 
            className="w-8 h-8 object-contain drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]" 
          />
          <div className="flex flex-col">
            <span className="text-white font-black tracking-[0.3em] text-xs md:text-sm uppercase leading-tight">
              ÓPTICA DANNY
            </span>
            <span className="text-[9px] text-[#c5a059] font-medium tracking-wider">
              Mérida, Yucatán
            </span>
          </div>
        </div>

        <a
          href={linkWhatsAppConsulta}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-neutral-200 hover:text-[#c5a059] border border-white/10 hover:border-[#c5a059]/40 bg-white/5 px-4 py-2 rounded-full font-semibold transition-all"
        >
          <MessageCircle size={15} className="text-[#c5a059]" />
          <span>Escribinos por WhatsApp</span>
        </a>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-10 md:py-16 flex flex-col items-center text-center space-y-10">
        
        {/* LOGO EN BREATHE LOOP: ISOTIPO DEL OJO + NOMBRE */}
        <div className="relative flex flex-col items-center justify-center pt-2">
          
          {/* Luz dorada de fondo en loop suave */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.25, 0.65, 0.25],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-60 h-60 md:w-80 md:h-80 bg-[#c5a059]/20 rounded-full blur-[90px] pointer-events-none"
          />

          <motion.div
            animate={{
              scale: [1, 1.04, 1],
              y: [0, -6, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 flex flex-col items-center cursor-default"
          >
            {/* OJO OFICIAL */}
            <img
              src="/ojo_danny_dorado.png"
              alt="Logo Óptica Danny"
              className="w-24 md:w-32 h-auto object-contain mb-3 drop-shadow-[0_0_30px_rgba(197,160,89,0.6)]"
            />
            {/* TIPOGRAFÍA OFICIAL */}
            <img
              src="/logodannyblanco.png"
              alt="Óptica Danny"
              className="w-56 md:w-80 h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
            />
          </motion.div>
        </div>

        {/* MENSAJE CÁLIDO Y HUMANO */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/25 text-xs font-semibold text-[#c5a059]">
            <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
            <span>Estamos armando la tienda online</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            Tus próximos lentes, <br />
            <span className="texto-gradient-gold">directo a tus manos en Mérida</span>
          </h1>

          <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-light">
            En Óptica Danny estamos preparando la web para que puedas ver todos nuestros armazones en fotos reales, elegir el que mejor te quede y pedir tus cristales graduados sin vueltas.
          </p>
        </div>

        {/* 3 PASOS CLAROS DE CÓMO FUNCIONA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full pt-2 text-left">
          
          <div className="p-6 rounded-2xl bg-[#021120]/80 border border-white/5 backdrop-blur-md hover:border-[#c5a059]/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center mb-4">
              <Glasses size={20} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white mb-2">
              Armazones Seleccionados
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Modelos de receta y de sol para todos los días: marcos cómodos, resistentes y con diseño actual para renovar tu mirada.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#021120]/80 border border-white/5 backdrop-blur-md hover:border-[#c5a059]/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center mb-4">
              <Eye size={20} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white mb-2">
              Lentes con tu Receta
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Nos mandás la foto de tu receta por WhatsApp y te cotizamos los cristales exactos para tus ojos (antirreflejante, filtro azul o fotocromáticos).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#021120]/80 border border-white/5 backdrop-blur-md hover:border-[#c5a059]/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center mb-4">
              <Truck size={20} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white mb-2">
              Entregas en Mérida
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Te entregamos tus lentes listos para usar en el punto que te quede más cómodo de la ciudad.
            </p>
          </div>

        </div>

        {/* REGISTRO SIMPLE DE APERTURA */}
        <div className="w-full max-w-xl bg-gradient-to-b from-[#021120] to-[#010c17] border border-[#c5a059]/30 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-5 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-[10px] text-[#c5a059] font-bold uppercase tracking-widest block">
              Descuento de Inauguración
            </span>
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white">
              ¿Querés que te avisemos cuando inauguremos?
            </h2>
            <p className="text-xs text-neutral-400">
              Dejanos tu nombre y te guardamos un <strong className="text-[#c5a059]">15% de descuento</strong> para tu primer par de armazones o lentes.
            </p>
          </div>

          <form onSubmit={handleRegistroVip} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={nombreVip}
                onChange={(e) => setNombreVip(e.target.value)}
                placeholder="Tu Nombre"
                className="w-full bg-[#001529] border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-[#c5a059] transition-all"
              />
              <input
                type="tel"
                value={telefonoVip}
                onChange={(e) => setTelefonoVip(e.target.value)}
                placeholder="WhatsApp (opcional)"
                className="w-full bg-[#001529] border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-[#c5a059] transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#c5a059] hover:bg-[#dfba75] text-black font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Avisarme y guardar mi 15% OFF</span>
              <ArrowRight size={15} />
            </button>
          </form>

          <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-neutral-400">
            <span>¿Necesitás lentes ahora mismo?</span>
            <a
              href={linkWhatsAppConsulta}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c5a059] hover:underline font-bold flex items-center gap-1.5"
            >
              <MessageCircle size={14} />
              <span>Escribinos al WhatsApp</span>
            </a>
          </div>
        </div>

      </main>

      {/* FOOTER DISCRETO */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
        <p>© 2026 {BUSINESS_INFO.name} — Mérida, Yucatán</p>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setMostrarModalAcceso(true)}
            className="text-neutral-500 hover:text-white transition-colors flex items-center gap-1 font-semibold"
            title="Vista previa del equipo"
          >
            <Lock size={12} />
            <span>Vista Previa</span>
          </button>

          <Link
            href="/admin/productos"
            className="text-neutral-500 hover:text-[#c5a059] transition-colors font-semibold"
          >
            Panel de Inventario →
          </Link>
        </div>
      </footer>

      {/* MODAL PARA ACTIVAR VISTA PREVIA RÁPIDA */}
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

            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Desbloquear Vista Previa
            </h3>
            <p className="text-xs text-neutral-400">
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
