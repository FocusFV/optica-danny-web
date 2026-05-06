import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Círculo de luz de fondo muy sutil para dar profundidad */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c5a059]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Encabezado */}
        <div className="mb-20 text-center">
          <h2 className="text-[#c5a059] font-bold uppercase tracking-[0.5em] text-[10px] mb-4">Contacto</h2>
          <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6 leading-tight">
            ¿LISTOS PARA <br /> EL <span className="text-[#c5a059]">SIGUIENTE</span> SHOW?
          </h3>
          <p className="text-gray-400 text-xs tracking-[0.3em] uppercase font-light">
            Contrataciones • Talleres • Colaboraciones Internacionales
          </p>
        </div>

        {/* Formulario Estilo Agencia */}
        <form className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group">
              <label className="block text-[9px] uppercase tracking-[0.4em] text-white-500 mb-2 group-focus-within:text-[#c5a059] transition-colors">Nombre completo</label>
              <input 
                type="text" 
                placeholder="ESCRIBÍ TU NOMBRE"
                className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/5 focus:outline-none focus:border-[#c5a059] transition-all text-sm tracking-widest"
              />
            </div>
            <div className="group">
              <label className="block text-[9px] uppercase tracking-[0.4em] text-white-500 mb-2 group-focus-within:text-[#c5a059] transition-colors">Email de contacto</label>
              <input 
                type="email" 
                placeholder="TU@EMAIL.COM"
                className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/5 focus:outline-none focus:border-[#c5a059] transition-all text-sm tracking-widest"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-[9px] uppercase tracking-[0.4em] text-white-500 mb-2 group-focus-within:text-[#c5a059] transition-colors">Tu propuesta o consulta</label>
            <textarea 
              rows={3}
              placeholder="CONTANOS SOBRE TU EVENTO O ESCENARIO..."
              className="w-full bg-transparent border-b border-white/10 py-4 text-white placeholder:text-white/5 focus:outline-none focus:border-[#c5a059] transition-all resize-none text-sm tracking-widest"
            ></textarea>
          </div>

          {/* Botón de Envío Premium */}
          <div className="flex justify-center pt-10">
            <button 
              type="button"
              className="group relative px-16 py-5 bg-transparent border border-[#c5a059] overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.15)]"
            >
              <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.6em] text-[#c5a059] group-hover:text-black transition-colors duration-500">
                Enviar Mensaje
              </span>
              {/* Efecto de llenado del botón */}
              <div className="absolute inset-0 bg-[#c5a059] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
            </button>
          </div>
        </form>

        {/* Info extra sutil */}
        <div className="mt-24 text-center">
          <p className="text-[10px] text-gray-600 tracking-[0.5em] uppercase">
            Mérida, México • Buenos Aires, Argentina
          </p>
        </div>
      </div>
    </section>
  );
}