export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-white/5 overflow-hidden mt-32">
      {/* Resplandor inferior */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#c5a059]/10 blur-[80px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="text-white font-bold tracking-[0.4em] text-xl uppercase mb-8 opacity-20">
          IMPROFLOW
        </div>
        
        <div className="flex gap-8 mb-12 text-[10px] uppercase tracking-widest text-gray-500">
          <a href="#" className="hover:text-[#c5a059] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#c5a059] transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-[#c5a059] transition-colors">Contacto</a>
        </div>

        <div className="w-full border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[9px] tracking-[0.3em] uppercase text-white/30">
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} IMPROFLOW. Todos los derechos reservados.</p>
          <p className="hover:text-[#c5a059] transition-colors cursor-default">
            Design & Code by <span className="text-white font-medium">FocusFV</span>
          </p>
        </div>
      </div>
    </footer>
  );
}