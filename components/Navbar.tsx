"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { buildWhatsAppLink } from "@/lib/constants";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#" },
    { name: "Servicios", href: "#servicios" },
    { name: "Modelos", href: "#marcos" },
    { name: "Contacto", href: "#contacto" },
  ];

  const linkConsulta = buildWhatsAppLink(
    "¡Hola Óptica Danny! 👋 Quisiera consultar por armazones y modelos de lentes en Mérida."
  );

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled 
          ? "py-3 bg-[#001529]/95 backdrop-blur-xl border-b border-[#c5a059]/20 shadow-lg" 
          : "py-6 bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO LUXURY CON OJO OFICIAL */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img 
            src="/ojo_danny_dorado.png" 
            alt="Logo Óptica Danny" 
            className="w-7 h-7 md:w-8 md:h-8 object-contain drop-shadow-[0_0_10px_rgba(197,160,89,0.5)] group-hover:scale-105 transition-transform" 
          />
          <div className="flex flex-col">
            <span className="text-white font-black tracking-[0.3em] text-xs md:text-sm group-hover:text-[#c5a059] transition-colors leading-tight">
              ÓPTICA DANNY
            </span>
            <span className="text-[8px] text-[#c5a059] uppercase tracking-[0.2em] font-bold">
              Mérida, Yucatán
            </span>
          </div>
        </Link>

        {/* MENÚ DESKTOP CON EFECTO INTERACTIVO */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-white/70 hover:text-[#c5a059] text-xs uppercase tracking-widest transition-all duration-300 font-bold relative group"
            >
              {link.name}
              <span className="absolute bottom-[-4px] left-0 w-0 h-px bg-[#c5a059] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* BOTÓN DE ACCIÓN, CARRITO Y MENÚ MÓVIL */}
        <div className="flex items-center gap-6">
          
          {/* 🛒 ICONO DE CARRITO DE COMPRAS CONECTADO AL CONTEXTO */}
          <button 
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative text-white/80 hover:text-[#c5a059] transition-colors duration-300 p-2 rounded-xl hover:bg-white/5"
            title="Ver carrito de compras"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-[#c5a059] text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-fade-in">
                {totalItems}
              </span>
            )}
          </button>

          {/* BOTÓN WHATSAPP OFICIAL */}
          <a 
            href={linkConsulta}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block px-5 py-2.5 bg-transparent border border-[#c5a059] text-[#c5a059] text-[10px] uppercase tracking-[0.25em] font-black rounded-full hover:bg-[#c5a059] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(197,160,89,0.1)] active:scale-95"
          >
            Escribinos
          </a>

          {/* MENÚ MÓVIL HAMBURGUESA */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-[#c5a059] p-2 transition-colors"
            title="Abrir menú"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* DESPLEGABLE MENÚ MÓVIL */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-[#001529]/98 backdrop-blur-2xl border-b border-[#c5a059]/20 py-8 px-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-6 items-center text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/80 hover:text-[#c5a059] text-sm uppercase tracking-widest transition-colors font-bold"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href={linkConsulta}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 w-full max-w-xs text-center px-8 py-3.5 bg-[#c5a059] text-black text-[11px] uppercase tracking-[0.3em] font-black rounded-full shadow-xl hover:bg-[#dfba75] transition-all"
              >
                Escribinos por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
