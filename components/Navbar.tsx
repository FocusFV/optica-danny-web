export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-black text-white">
      <div className="text-xl font-bold">Improflow</div>
      <div className="space-x-6">
        <a href="#" className="hover:text-blue-400">Shows</a>
        <a href="#" className="hover:text-blue-400">Nosotros</a>
        <a href="#" className="hover:text-blue-400">Contacto</a>
      </div>
    </nav>
  );
}