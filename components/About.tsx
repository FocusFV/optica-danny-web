export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Columna Izquierda: El Manifiesto */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-[#c5a059] to-transparent hidden md:block"></div>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c5a059] mb-6">
            Nuestra Filosofía
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tighter mb-6">
            El error no existe, <br />
            <span className="text-gray-500 font-light italic">es una oportunidad.</span>
          </h3>
        </div>

        {/* Columna Derecha: El Detalle Técnico */}
        <div className="lg:col-span-7 space-y-8 text-gray-400 text-sm md:text-base leading-relaxed font-light">
          <p className="bg-white/[0.02] p-8 rounded-2xl border border-white/5 hover:border-[#c5a059]/30 transition-colors">
            <strong className="text-white font-medium block mb-2 uppercase tracking-widest text-[10px]">El Colectivo</strong>
            Somos un equipo creativo que fusiona la espontaneidad de la improvisación teatral 
            con el rigor estratégico del mundo corporativo. Conectamos la calidez de México 
            con la profundidad de Argentina.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-0 md:pl-8">
            <div>
              <span className="text-[#c5a059] block mb-2">01. Escenarios</span>
              <p className="text-xs">Formación técnica para actores y oradores que buscan dominar su presencia.</p>
            </div>
            <div>
              <span className="text-[#c5a059] block mb-2">02. Empresas</span>
              <p className="text-xs">Herramientas ágiles para liderazgo, comunicación y resiliencia en equipos.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}