"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Equipo', href: '#creators' },
    { name: 'Galería', href: '#gallery' },
    { name: 'Paquetes', href: '#paquetes' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'py-2 bg-black/80 backdrop-blur-xl border-b border-white/5' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO DE IMPROFLOW (Izquierda) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center flex-1"
        >
          <a href="#">
            <img 
              src="/ImproflowLogo.png" // Asegurate de que el nombre coincida con el archivo en /public
              alt="Improflow Logo"
              className={`transition-all duration-500 object-contain ${
                isScrolled ? 'h-12' : 'h-20' // Se achica un poco al scrollear para no molestar
              }`}
            />
          </a>
        </motion.div>

        {/* LINKS CENTRADOS (Desktop) */}
        <div className="hidden md:flex items-center justify-center gap-8 flex-[2]">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.4em] text-gray-400 hover:text-[#c5a059] transition-colors duration-300 font-medium whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* BOTÓN (Derecha) */}
        <div className="flex justify-end items-center flex-1">
          <a 
            href="#contact"
            className="hidden md:block px-6 py-2 border border-[#c5a059]/50 text-[#c5a059] text-[10px] uppercase tracking-[0.3em] font-black rounded-full hover:bg-[#c5a059] hover:text-black transition-all duration-500"
          >
            Contacto
          </a>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 py-10 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 items-center text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-[0.5em] text-white font-light hover:text-[#c5a059]"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}