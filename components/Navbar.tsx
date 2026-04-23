"use client";
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <span className="text-white font-bold tracking-[0.3em] text-xs uppercase cursor-pointer hover:text-[#c5a059] transition-colors">
          Impro<span className="text-[#c5a059]">flow</span>
        </span>

        {/* Links */}
        <div className="flex gap-8 text-[9px] tracking-[0.3em] font-medium text-gray-400 uppercase">
          <a href="#about" className="hover:text-white transition-colors relative group">
            Nosotros
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#c5a059] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#shows" className="hover:text-white transition-colors relative group">
            Cartelera
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#c5a059] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
      </div>
    </nav>
  );
}