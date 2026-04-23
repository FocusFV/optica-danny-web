import Navbar from '../components/Navbar';
import About from '../components/About';
import Shows from '../components/Shows';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar con estilo corporativo */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 px-6 text-center border-b border-[#c5a059]/30">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Conectando Escenarios: <span className="text-[#c5a059]">México ↔ Argentina</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Impro teatral profesional y soluciones estratégicas para empresas.
        </p>
      </section>

      {/* Secciones de contenido */}
      <About />
      <Shows />

      {/* Footer */}
      <Footer />
    </main>
  );
}