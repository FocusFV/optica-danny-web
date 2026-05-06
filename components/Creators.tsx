import React from 'react';

export default function Creators() {
  const team = [
    {
      name: "Alesis Fleitas",
      role: "Actor Profesional & Co-Fundador",
      bio: "Desde El Jagüel para el mundo. Especialista en teatro de improvisación con años de trayectoria transformando el escenario en puro juego.",
      image: "https://i.imgur.com/aQpfbal.jpeg", // Dejá el link que ya tenías puesto
      ig: "https://www.instagram.com/jonatanalesisfleitas/", // <-- PEGA EL LINK DE IG ACÁ
      in: "https://www.linkedin.com/in/alesis-fleitas-0983a4258/" // <-- PEGA EL LINK DE LINKEDIN ACÁ
    },
    {
      name: "Eduardo Hernández",
      role: "Estrategia & Dirección",
      bio: "La mente detrás de la fusión estratégica. Experto en coordinar la creatividad multicultural para que el impacto sea real.",
      image: "https://i.imgur.com/P1UgqX7.jpeg", // Dejá el link que ya tenías puesto
      ig: "https://www.instagram.com/laloimpro/", // <-- PEGA EL LINK DE IG ACÁ
      in: "https://linkedin.com/in/lalo_tu_usuario" // <-- PEGA EL LINK DE LINKEDIN ACÁ
    },
    {
      name: "Fede Villalba",
      role: "Producción Visual & Operativa",
      bio: "El ojo detrás de FocusFV. Responsable de la estructura, la técnica y de que cada detalle visual de Improflow sea impecable.",
      image: "https://i.imgur.com/T7gyife.png", // Dejá el link que ya tenías puesto
      ig: "https://www.instagram.com/villalba.fede/", // <-- PEGA EL LINK DE IG ACÁ
      in: "https://www.linkedin.com/in/federicovillalba/" // <-- PEGA EL LINK DE LINKEDIN ACÁ
    }
  ];

  return (
    <section id="creators" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="mb-20">
          <h2 className="text-[#c5a059] font-bold uppercase tracking-[0.5em] text-[10px] mb-4">El Equipo</h2>
          <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            LAS <span className="italic font-light text-gray-500">MENTES</span> <br /> 
            DETRÁS DEL <span className="text-[#c5a059]">FLOW</span>
          </h3>
        </div>

        {/* Grilla de Creadores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((member, i) => (
            <div key={i} className="group relative">
              
              {/* Contenedor de Imagen */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-900 mb-6 border border-white/5">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover grayscale active:grayscale-0 md:group-hover:grayscale-0 active:scale-105 md:group-hover:scale-110 transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Info del Miembro */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-bold text-white uppercase tracking-tighter group-hover:text-[#c5a059] transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-[#c5a059] text-[10px] font-bold uppercase tracking-widest mt-1">
                    {member.role}
                  </p>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed font-light pr-4">
                  {member.bio}
                </p>
                
                {/* Redes Sociales con íconos premium */}
                <div className="flex gap-4 pt-2 items-center">
                   <div className="w-8 h-[1px] bg-white/20"></div>
                   
                   {/* Icono de Instagram */}
                   <a href={member.ig} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label={`Instagram de ${member.name}`}>
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                       <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                       <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                     </svg>
                   </a>
                   
                   {/* Icono de LinkedIn */}
                   <a href={member.in} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label={`LinkedIn de ${member.name}`}>
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                       <rect x="2" y="9" width="4" height="12"></rect>
                       <circle cx="4" cy="4" r="2"></circle>
                     </svg>
                   </a>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}