"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom"; // 👇 El truco para sacarlo del "agujero negro" del detalle
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 400, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("button") || 
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.classList.contains("clickable")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", () => setIsVisible(false));
    document.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  // Si no está montado en el cliente o no se movió el mouse, no renderiza nada
  if (!mounted || !isVisible) return null;

  // 🏛️ Teletransportamos el cursor directo al final del <body> de la app
  return createPortal(
    <>
      <style jsx global>{`
        *, *::before, *::after {
          cursor: none !important;
        }
        @media (max-width: 768px) {
          *, *::before, *::after { cursor: auto !important; }
          .ojo-cursor-luxury-portal { display: none !important; }
        }
      `}</style>

      <motion.div
        className="ojo-cursor-luxury-portal hidden md:flex items-center justify-center mix-blend-screen"
        style={{ 
          x: cursorX, 
          y: cursorY, 
          translateX: "-50%", 
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 999999999, // Arriba de absolutamente TODO
          pointerEvents: "none"
        }}
      >
        <div className="relative w-12 h-12 flex items-center justify-center">
          
          {/* PÁRPADO SUPERIOR */}
          <motion.div
            className="absolute border-t border-[#c5a059] w-9 h-4 rounded-t-full"
            animate={{
              y: isClicked ? 0 : isHovered ? -8 : -2,
              scaleY: isClicked ? 0 : isHovered ? 1.4 : 1,
              borderColor: isHovered ? "#FFFFFF" : "#c5a059",
            }}
            transition={{ type: "spring", damping: 20, stiffness: 350 }}
          />

          {/* PUPILA INTELIGENTE CON REFLEJO DE CRISTAL */}
          <motion.div
            className="absolute bg-[#c5a059] rounded-full flex items-start justify-start overflow-hidden"
            animate={{
              width: isHovered ? 16 : 6,
              height: isHovered ? 16 : 6,
              backgroundColor: isHovered ? "#FFFFFF" : "#c5a059",
              boxShadow: isHovered 
                ? "0 0 20px rgba(255, 255, 255, 0.8)" 
                : "0 0 0px rgba(0,0,0,0)"
            }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
          >
            <div className="w-1 h-1 bg-white/50 rounded-full ml-0.5 mt-0.5 blur-[0.2px]" />
          </motion.div>

          {/* PÁRPADO INFERIOR */}
          <motion.div
            className="absolute border-b border-[#c5a059] w-9 h-4 rounded-b-full"
            animate={{
              y: isClicked ? 0 : isHovered ? 8 : 2,
              scaleY: isClicked ? 0 : isHovered ? 1.4 : 1,
              borderColor: isHovered ? "#FFFFFF" : "#c5a059",
            }}
            transition={{ type: "spring", damping: 20, stiffness: 350 }}
          />

        </div>
      </motion.div>
    </>,
    document.body
  );
}