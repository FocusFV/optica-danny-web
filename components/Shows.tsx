import React from 'react';

export default function Shows() {
  const eventos = [
    { 
      title: "Masterclass: Presencia Escénica", 
      date: "30 ABR", 
      time: "18:00 - 21:00 HS",
      location: "Mérida, Yucatán", 
      type: "Formación",
      status: "Últimos lugares",
      desc: "Técnica vocal y corporal aplicada al manejo del espacio. Diseñado para actores y oradores que buscan dominar el escenario.",
      price: "$800 MXN"
    },
    { 
      title: "Improflow: El Show Fusión", 
      date: "12 MAY", 
      time: "21:30 HS",
      location: "Teatro Principal, CDMX", 
      type: "Espectáculo",
      status: "Venta Abierta",
      desc: "Lo espontáneo de México se cruza con la profundidad del teatro argentino en un formato único de improvisación estructurada.",
      price: "$350 MXN"
    },
    { 
      title: "Business Lab: Estrategia Ágil", 
      date: "05 JUN", 
      time: "09:00 - 14:00 HS",
      location: "Virtual / Zoom", 
      type: "Corporativo",
      status: "Próximamente",
      desc: "Herramientas de improvisación teatral al servicio de la toma de decisiones, liderazgo y resiliencia en equipos corporativos.",
      price: "Consultar"
    },
  ];

  return (
    <section id="shows" className="py-24 relative overflow-hidden">
      {/* Luces de fondo (Efectos Premium escondidos) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabecera de la sección */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c5a059] mb-4">
              Cartelera Oficial
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
              Próximos <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Encuentros</span>
            </h3>
          </div>
          <button className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-[#c5a059] transition-colors mt-6 md:mt-0">
            Ver calendario completo 
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </button>
        </div>

        {/* Grilla de Eventos (Estilo Bento/Cards complejas) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
          {eventos.map((e, i) => (
            <div 
              key={i} 
              className="group relative flex flex-col justify-between bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 p-8 rounded-2xl hover:bg-[#0f172a]/80 hover:border-[#c5a059]/40 transition-all duration-500 overflow-hidden"
            >
              {/* Resplandor superior en hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c5a059]/0 to-transparent group-hover:via-[#c5a059]/70 transition-all duration-700"></div>

              <div>
                {/* Header de la tarjeta: Fecha y Estado */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex flex-col">
                    <span className="text-[#c5a059] font-black text-2xl tracking-tighter">{e.date.split(' ')[0]}</span>
                    <span className="text-gray-400 text-[10px] tracking-widest uppercase">{e.date.split(' ')[1]}</span>
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border 
                    ${e.status === 'Últimos lugares' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                      e.status === 'Próximamente' ? 'bg-white/5 text-gray-400 border-white/10' : 
                      'bg-[#c5a059]/10 text-[#c5a059] border-[#c5a059]/20'}`}>
                    {e.status}
                  </span>
                </div>

                {/* Contenido principal */}
                <div className="mb-6 space-y-4">
                  <span className="inline-block text-[10px] tracking-widest text-white/50 uppercase border-b border-white/10 pb-1">
                    {e.type}
                  </span>
                  <h4 className="text-2xl font-bold text-white leading-tight group-hover:text-[#c5a059] transition-colors duration-300">
                    {e.title}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    {e.desc}
                  </p>
                </div>
              </div>

              {/* Footer de la tarjeta: Info extra y Botón */}
              <div className="pt-6 border-t border-white/5 mt-auto">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c5a059]"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span className="truncate">{e.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#c5a059]"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span>{e.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white font-mono text-sm">{e.price}</span>
                  <button className="relative overflow-hidden px-6 py-2 bg-transparent text-white text-[10px] uppercase tracking-[0.2em] font-bold border border-white/20 group-hover:border-[#c5a059] rounded-sm transition-all duration-300 before:absolute before:inset-0 before:bg-[#c5a059] before:-z-10 before:translate-y-full group-hover:before:translate-y-0 before:transition-transform before:duration-300 group-hover:text-black">
                    Asegurar Lugar
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}