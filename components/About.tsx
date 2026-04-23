export default function About() {
  return (
    <section className="py-20 px-6 md:px-20 border-b border-[#c5a059]/20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#c5a059] mb-8 uppercase tracking-widest">
          ¿Quiénes Somos?
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Improflow nace de la fusión cultural y creativa entre Argentina y México. 
              Somos un equipo de profesionales dedicados a la improvisación teatral 
              como herramienta de desarrollo humano y corporativo.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Creemos que la escucha, la aceptación y la creatividad son las claves 
              para transformar entornos de trabajo y escenarios artísticos.
            </p>
          </div>
          {/* Espacio para una imagen o logo */}
          <div className="bg-[#0f172a] h-64 rounded-lg border border-[#c5a059] flex items-center justify-center">
            <span className="text-[#c5a059]/50 font-bold">LOGO / FOTO</span>
          </div>
        </div>
      </div>
    </section>
  );
}