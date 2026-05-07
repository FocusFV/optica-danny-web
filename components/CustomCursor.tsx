"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Física de rayo
  const springConfig = { damping: 28, stiffness: 400, mass: 0.05 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  const particles = [
    { id: 1, x: [0, 15, -10, 0], y: [0, -10, 15, 0], scale: [1, 1.4, 1], duration: 4 },
    { id: 2, x: [0, -20, 10, 0], y: [0, 15, -5, 0], scale: [1, 0.8, 1], duration: 5 },
    { id: 3, x: [0, 10, 20, 0], y: [0, 20, -10, 0], scale: [1, 1.2, 1], duration: 3.5 },
    { id: 4, x: [0, -15, -15, 0], y: [0, -15, 10, 0], scale: [1, 1.6, 1], duration: 6 },
  ];

  return (
    <>
      <style jsx global>{`
        body, a, button { cursor: none !important; }
        @media (max-width: 768px) {
          body { cursor: auto !important; }
          .custom-cursor-wrapper { display: none; }
        }
      `}</style>

      <motion.div
        className="custom-cursor-wrapper fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      >
        {/* PARTICULAS DORADAS */}
        {!isHovering && !isClicked && particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{ x: p.x, y: p.y, scale: p.scale, opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-1 h-1 bg-[#c5a059] rounded-full blur-[0.4px]"
          />
        ))}

        {/* EFECTO DE ONDA AL CLICKEAR (Ripple) */}
        <AnimatePresence>
          {isClicked && (
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute w-8 h-8 border border-[#c5a059] rounded-full"
            />
          )}
        </AnimatePresence>

        {/* EL CURSOR PRINCIPAL */}
        <motion.div
          animate={{
            scale: isClicked ? 0.8 : 1, // Se achica un poquito al clickear
          }}
          className="relative rounded-full flex items-center justify-center transition-all duration-150"
          style={{
            width: isHovering ? '30px' : '24px',
            height: isHovering ? '30px' : '24px',
            border: isHovering ? '2px solid #c5a059' : '1px solid #ffffff',
            backgroundColor: isHovering ? 'rgba(197, 160, 89, 1)' : 'transparent',
            backdropFilter: isHovering ? 'blur(4px)' : 'blur(0px)',
            boxShadow: isHovering ? '0 0 20px rgba(197, 160, 89, 0.4)' : 'none',
          }}
        >
          <motion.div 
            animate={{ opacity: isHovering ? 0 : 1, scale: isHovering ? 0 : 1 }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </>
  );
}