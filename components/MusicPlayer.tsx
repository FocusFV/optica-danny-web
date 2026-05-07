"use client";

import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = forwardRef((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ESTA ES LA MAGIA: Exponemos la función al mundo exterior
  useImperativeHandle(ref, () => ({
    playMusic: () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3; // Volumen tranqui
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.error("Error al reproducir:", err));
      }
    }
  }));

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[1000000] flex items-center gap-4">
      {/* Asegurate que el archivo esté en /public/music/Improflow Audio.mp3 */}
      <audio ref={audioRef} src="/music/Improflow Audio.mp3" loop />
      
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-3 rounded-full bg-white/5 border border-[#c5a059]/30 backdrop-blur-md text-[#c5a059] shadow-2xl hover:bg-[#c5a059]/10 transition-all"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>

      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="hidden md:flex gap-1 items-end h-4"
          >
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ height: [4, 16, 8, 14, 4] }}
                transition={{ repeat: Infinity, duration: 0.5 + i * 0.1 }}
                className="w-1 bg-[#c5a059] rounded-full"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

MusicPlayer.displayName = "MusicPlayer";
export default MusicPlayer;