"use client";

import React, { useEffect, useState } from 'react';
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

// Importamos la función de la librería que acabamos de limpiar
import { obtenerArmazones, Armazon } from '../lib/armazones';

export default function Home() {
  const [armazones, setArmazones] = useState<Armazon[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const datos = await obtenerArmazones();
        setArmazones(datos);
      } catch (error) {
        console.error("Error cargando armazones en el Home:", error);
      } finally {
        setCargando(false);
      }
    }
    cargarDatos();
  }, []);

  return (
    <main className="min-h-screen bg-[#001529] text-white relative selection:bg-[#c5a059] selection:text-black">
      
      <CustomCursor />

      {/* Fondos con el azul de la Óptica */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#051e34] via-[#001529] to-[#001529]"></div>
      
      {/* Trama de puntos dorada sutil */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5a059' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")` }}></div>

      <div className="relative z-10">
        <Navbar />
        <Hero />

        <div className="max-w-7xl mx-auto px-6 pt-40 pb-20">
          <FadeIn><section id="about"><About /></section></FadeIn>
        </div>

        <Marquee />

        <div className="max-w-7xl mx-auto px-6 space-y-40 pb-40 pt-20">
          
          <FadeIn>
            <section id="marcos">
              <Gallery armazones={armazones} cargando={cargando} />
            </section>
          </FadeIn>
          
          <FadeIn><section id="servicios"><Packages /></section></FadeIn>
          <FadeIn><section id="equipo"><Creators /></section></FadeIn>
          <FadeIn><section id="contacto"><Contact /></section></FadeIn>
        </div>

        <Footer />
      </div>
    </main>
  );
}