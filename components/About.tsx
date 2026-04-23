export default function About() {
  return (
    <section className="py-20 px-6 bg-white text-center"> {/* Cambié a bg-white */}
      <h2 className="text-4xl font-bold mb-8 text-black">¿Qué es Improflow?</h2> {/* Agregué text-black */}
      <p className="max-w-2xl mx-auto text-lg text-gray-800 leading-relaxed"> {/* Agregué text-gray-800 */}
        Somos un colectivo creativo que fusiona la espontaneidad de la improvisación teatral 
        con el rigor estratégico del mundo empresarial. En Improflow, transformamos el error 
        y la creatividad en herramientas de liderazgo, comunicación y resiliencia.
      </p>
      <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-800 leading-relaxed">
        Liderado por Federico Villalba en la parte operativa, el actor profesional Alesis Fleitas 
        y la visión estratégica de Eduardo "Lalo" Hernández, creamos experiencias donde la 
        improvisación no es solo juego, es un activo táctico para emprendedores.
      </p>
    </section>
  );
}