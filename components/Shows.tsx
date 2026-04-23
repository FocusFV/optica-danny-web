export default function Shows() {
  const eventos = [
    { fecha: "15 Mayo", titulo: "Impro Night", lugar: "Teatro Merida" },
    { fecha: "22 Mayo", titulo: "Workshop Lab", lugar: "Espacio Creativo" },
    { fecha: "05 Junio", titulo: "Show Final", lugar: "Centro Cultural" },
  ];

  return (
    <section className="py-20 px-6 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12 text-black">Próximos Shows</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {eventos.map((evento, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-600">
            <span className="text-blue-600 font-bold">{evento.fecha}</span>
            <h3 className="text-2xl font-semibold mt-2 text-black">{evento.titulo}</h3>
            <p className="text-gray-600 mt-2">{evento.lugar}</p>
            <button className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
              Reservar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}