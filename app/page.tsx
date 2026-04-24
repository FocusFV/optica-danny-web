import Navbar from '../components/Navbar';
import About from '../components/About';
import Creators from '../components/Creators';
import Shows from '../components/Shows';
import FadeIn from '../components/FadeIn';
import Footer from '../components/Footer';
import Marquee from '../components/Marquee';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white relative selection:bg-[#c5a059] selection:text-black">
      
      {/* Efectos de fondo Premium (Grilla sutil + Foco de luz) */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#050505] to-[#050505]"></div>
      <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section (Pantalla Principal Cinematográfica) */}
        <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20">
          <FadeIn>
            <div className="text-center flex flex-col items-center">
              <span className="inline-block py-1 px-3 border border-[#c5a059]/30 bg-[#c5a059]/10 text-[#c5a059] text-[9px] font-bold tracking-[0.4em] uppercase mb-8 rounded-full">
                Arte & Estrategia
              </span>
              
              <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.85] mb-8">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-lg">
                  IMPRO
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#c5a059] to-[#8a6b32] drop-shadow-lg">
                  FLOW
                </span>
              </h1>
              
              {/* Línea divisoria elegante */}
              <div className="w-px h-24 bg-gradient-to-b from-[#c5a059] to-transparent mx-auto my-10"></div>
              
              <p className="text-gray-400 text-xs md:text-sm uppercase tracking-[0.5em] font-light max-w-xl mx-auto">
                Conectando escenarios entre <span className="text-white font-medium">México</span> y <span className="text-white font-medium">Argentina</span>
              </p>
            </div>
          </FadeIn>
        </section>

     {/* Contenedor Principal */}
        <div className="max-w-7xl mx-auto px-6 space-y-40 pb-40">
          <FadeIn><About /></FadeIn>
        </div>

        {/* CINTA INFINITA ACÁ AFUERA DEL CONTENEDOR PARA QUE OCUPE TODA LA PANTALLA */}
        <Marquee />

     <div className="max-w-7xl mx-auto px-6 space-y-40 pb-40 pt-20">
          <FadeIn><Creators /></FadeIn> 
          <FadeIn><Gallery /></FadeIn>
          <FadeIn><Contact /></FadeIn> {/* <-- ACÁ CLAVAMOS EL FORM */}
          {/* <FadeIn><Shows /></FadeIn> */}
        </div>

        {/* Footer Minimalista de Alta Gama importado como componente */}
        <Footer />
      </div>
      
    </main>
  );
}