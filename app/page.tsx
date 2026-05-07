"use client";

import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero'; 
import About from '../components/About';
import Creators from '../components/Creators';
import Packages from '../components/Packages'; 
import FadeIn from '../components/FadeIn';
import Footer from '../components/Footer';
import Marquee from '../components/Marquee';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import CustomCursor from '../components/CustomCursor';
import MusicPlayer from '../components/MusicPlayer';
import IntroOverlay from '../components/IntroOverlay';

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  // Definimos la referencia con el tipo correcto
  const musicPlayerRef = useRef<{ playMusic: () => void } | null>(null);

  const handleEnterFlow = () => {
    setHasEntered(true);
    // Disparamos la música DESDE la referencia
    if (musicPlayerRef.current) {
      musicPlayerRef.current.playMusic();
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white relative selection:bg-[#c5a059] selection:text-black">
      
      {!hasEntered && <IntroOverlay onEnter={handleEnterFlow} />}

      <CustomCursor />

      {/* Fondos */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#050505] to-[#050505]"></div>
      <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>

      {/* REVISAR ESTA LÍNEA: tiene que tener el ref */}
      <MusicPlayer ref={musicPlayerRef} />

      <div className="relative z-10">
        <Navbar />
        <Hero />

        <div className="max-w-7xl mx-auto px-6 pt-40 pb-20">
          <FadeIn><section id="about"><About /></section></FadeIn>
        </div>

        <Marquee />

        <div className="max-w-7xl mx-auto px-6 space-y-40 pb-40 pt-20">
          <FadeIn><section id="creators"><Creators /></section></FadeIn>
          <FadeIn><section id="gallery"><Gallery /></section></FadeIn>
          <FadeIn><section id="paquetes"><Packages /></section></FadeIn>
          <FadeIn><section id="contacto"><Contact /></section></FadeIn>
        </div>

        <Footer />
      </div>
    </main>
  );
}