export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-6 px-10 bg-[#0f172a] border-b-2 border-[#c5a059]">
      <h1 className="text-2xl font-bold text-[#c5a059]">IMPROFLOW</h1>
      <div className="space-x-8 text-sm uppercase tracking-widest">
        <a href="#" className="hover:text-[#c5a059]">Shows</a>
        <a href="#" className="hover:text-[#c5a059]">Nosotros</a>
        <a href="#" className="hover:text-[#c5a059]">Contacto</a>
      </div>
    </nav>
  );
}