import React from 'react';

export default function Gallery() {
  // Acá después ponés tus links directos de Imgur (.jpg o .png)
  const images = [
    "https://i.imgur.com/Tc8rCPq.jpeg",
    "https://i.imgur.com/mNRWI8h.jpeg",
    "https://i.imgur.com/Eincx0J.jpeg",
    "https://i.imgur.com/i7muAde.png",
    "https://i.imgur.com/f2UoeD2.png",
    "https://i.imgur.com/oBIBZZJ.jpeg"
  ];

  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado */}
        <div className="mb-16 text-center">
          <h2 className="text-[#c5a059] font-bold uppercase tracking-[0.5em] text-[10px] mb-4">Galería Visual</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
            La <span className="text-gray-500 italic font-light">Energía</span> en escena
          </h3>
          <div className="w-px h-12 bg-gradient-to-b from-[#c5a059] to-transparent mx-auto mt-8"></div>
        </div>

        {/* Grilla Premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <div key={i} className="group relative aspect-[4/3] overflow-hidden bg-gray-900 border border-white/5 cursor-pointer">
              <img 
                src={src} 
                alt={`Improflow Galería ${i + 1}`}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out"
              />
              {/* Sombreado sutil en la base */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-50"></div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}