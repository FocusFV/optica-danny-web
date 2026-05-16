"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";

interface Armazon {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
  stock: number;
  material?: string;
}

export default function ArmazonDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [armazon, setArmazon] = useState<Armazon | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [pestaniaActiva, setPestaniaActiva] = useState("detalles");

  // --- ESTADOS DEL CHECKOUT INTERACTIVO ---
  const [mostrarModal, setMostrarModal] = useState(false);
  const [procesandoPago, setProcesandoPago] = useState(false);
  const [pagoExitoso, setPagoExitoso] = useState(false);

  // Campos de la tarjeta
  const [numTarjeta, setNumTarjeta] = useState("");
  const [nombreTarjeta, setNombreTarjeta] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        const res = await fetch(`/api/armazones/${id}`);
        if (!res.ok) throw new Error("No se encontró el modelo");
        const data = await res.json();
        setArmazon(data);
      } catch (err) {
        console.error(err);
        setError("El armazón que buscás no existe o fue retirado del stock.");
      } finally {
        setCargando(false);
      }
    };

    if (id) cargarDetalle();
  }, [id]);

  // Simulación de pasarela de pagos bancaria
  const manejarPagoSimulado = (e: React.FormEvent) => {
    e.preventDefault();
    setProcesandoPago(true);

    // Simulamos los 3 segundos de delay que tarda Stripe/MercadoPago en validar con el banco
    setTimeout(() => {
      setProcesandoPago(false);
      setPagoExitoso(true);
    }, 3000);
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#001424] flex flex-col justify-center items-center text-white">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-[#c5a059]/10"></div>
          <div className="absolute inset-0 rounded-full border-t-2 border-[#c5a059] animate-spin"></div>
        </div>
        <p className="text-[10px] uppercase tracking-[0.5em] text-[#c5a059] mt-6 font-bold animate-pulse">Cargando Experiencia Premium</p>
      </div>
    );
  }

  if (error || !armazon) {
    return (
      <div className="min-h-screen bg-[#001424] flex flex-col justify-center items-center text-white p-4 text-center">
        <p className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-6">{error || "Error de conexión"}</p>
        <Link href="/" className="text-xs text-[#c5a059] uppercase tracking-widest border border-[#c5a059]/30 px-6 py-3 rounded-full bg-[#c5a059]/5 hover:bg-[#c5a059]/20 transition-all font-black">
          ← Volver al Catálogo
        </Link>
      </div>
    );
  }

  // Setup WhatsApp
  const numeroTelefono = "529990000000"; 
  const textoMensaje = encodeURIComponent(
    `¡Hola Óptica Danny! 👋 Me interesa consultar disponibilidad del armazón "${armazon.nombre}". \n\nEnlace: https://optica-danny.vercel.app/armazones/${armazon.id}`
  );
  const linkWhatsApp = `https://wa.me/${numeroTelefono}?text=${textoMensaje}`;

  return (
    <div className="min-h-screen bg-[#000e1a] text-white relative overflow-hidden flex flex-col justify-between selection:bg-[#c5a059] selection:text-black">
      
      {/* Fondos Luxury */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#0b2b47] via-[#000e1a] to-[#000e1a]"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#c5a059]/5 rounded-full blur-[150px] z-0 pointer-events-none"></div>

      {/* NAVBAR */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 flex justify-between items-center backdrop-blur-sm border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-white font-black tracking-[0.3em] text-sm md:text-base">ÓPTICA DANNY</span>
        </Link>
        <Link href="/" className="text-xs text-neutral-400 hover:text-white uppercase tracking-widest transition-colors font-bold">
          ← Volver a la galería
        </Link>
      </header>

      {/* CONTENEDOR FICHA TÉCNICA */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* FOTO LENTE */}
        <div className="lg:col-span-7 space-y-4 w-full">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/10 via-transparent to-transparent p-[1px] shadow-2xl">
            <div className="bg-[#031627]/40 rounded-[23px] backdrop-blur-xl p-8 md:p-16 flex items-center justify-center aspect-square relative group">
              <div className="absolute top-4 left-4 z-20">
                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md border ${armazon.stock > 0 ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-rose-500/10 border-rose-500/30 text-rose-400"}`}>
                  {armazon.stock > 0 ? "Disponible" : "Sin Stock"}
                </span>
              </div>
              <img src={armazon.imagen} alt={armazon.nombre} className="w-full h-full max-h-[300px] md:max-h-[360px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-700 ease-out" />
            </div>
          </div>
        </div>

        {/* DETALLES Y COMPRA */}
        <div className="lg:col-span-5 space-y-6 md:space-y-8 w-full">
          <div className="space-y-3">
            <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em] block">High-End Eyewear</span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase text-white">{armazon.nombre}</h1>
            <p className="text-3xl font-black text-white">${armazon.precio.toLocaleString("es-MX")} <span className="text-xs font-black text-[#c5a059]">MXN</span></p>
          </div>

          {/* TABS DESCRIPCIÓN */}
          <div className="border border-white/5 bg-[#031627]/30 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="flex border-b border-white/5 bg-black/20 text-xs font-bold uppercase tracking-wider">
              <button onClick={() => setPestaniaActiva("detalles")} className={`flex-1 py-3 text-center ${pestaniaActiva === "detalles" ? "text-[#c5a059] bg-[#031627]/60 border-b border-[#c5a059]" : "text-neutral-500"}`}>Descripción</button>
              <button onClick={() => setPestaniaActiva("ficha")} className={`flex-1 py-3 text-center ${pestaniaActiva === "ficha" ? "text-[#c5a059] bg-[#031627]/60 border-b border-[#c5a059]" : "text-neutral-500"}`}>Ficha</button>
            </div>
            <div className="p-5 text-sm leading-relaxed text-neutral-300 min-h-[100px]">
              {pestaniaActiva === "detalles" ? <p>{armazon.descripcion || "Modelo premium con diseño ergonómico de alta resistencia."}</p> : 
                <div className="space-y-1.5 text-xs uppercase tracking-wider text-neutral-400 font-bold">
                  <div className="flex justify-between border-b border-white/5 pb-1"><span>Material:</span> <span className="text-white">{armazon.material || "Acetato Premium"}</span></div>
                  <div className="flex justify-between text-[#c5a059]"><span>ID Producto:</span> <span className="font-mono text-[10px]">{armazon.id.substring(0,8).toUpperCase()}</span></div>
                </div>
              }
            </div>
          </div>

          {/* DOBLE BOTÓN DE ACCIÓN (WHATSAPP + TARJETA) */}
          <div className="space-y-3">
            {/* Botón Compra Directa Tarjeta */}
            <button 
              onClick={() => setMostrarModal(true)}
              disabled={armazon.stock <= 0}
              className="w-full relative overflow-hidden bg-white text-black hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500 font-black text-xs uppercase tracking-[0.25em] p-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.99]"
            >
              <span>Comprar con Tarjeta</span>
              <span>💳</span>
            </button>

            {/* Botón WhatsApp */}
            <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer" className="w-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-black text-xs uppercase tracking-[0.25em] p-4 rounded-xl transition-all flex items-center justify-center gap-3">
              <span>Consultar por WhatsApp</span>
              <span>💬</span>
            </a>
          </div>
        </div>
      </main>

      {/* =======================================================
          MODAL DE CHECKOUT GLASSMORPHIC (PAGO CON TARJETA)
         ======================================================= */}
      {mostrarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-[#021120]/95 border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl space-y-6">
            
            {/* Botón Cerrar Modal */}
            <button 
              onClick={() => { if(!procesandoPago) { setMostrarModal(false); setPagoExitoso(false); } }} 
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            {/* PANTALLA 1: FORMULARIO DE PAGO */}
            {!pagoExitoso ? (
              <>
                <div className="text-center">
                  <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em] block mb-1">Secure Checkout</span>
                  <h2 className="text-xl font-black uppercase tracking-tight text-white">Pago Seguro</h2>
                  <p className="text-xs text-neutral-400 mt-1">Estás pagando: <span className="text-white font-bold">{armazon.nombre}</span></p>
                </div>

                <form onSubmit={manejarPagoSimulado} className="space-y-4">
                  {/* Total a Pagar Fijo */}
                  <div className="bg-[#001529] border border-white/5 rounded-xl p-3 flex justify-between items-center text-xs uppercase tracking-wider font-bold">
                    <span className="text-neutral-400">Total a debitar:</span>
                    <span className="text-[#c5a059] text-sm font-black">${armazon.precio.toLocaleString("es-MX")} MXN</span>
                  </div>

                  {/* Número de Tarjeta */}
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Número de Tarjeta</label>
                    <input 
                      type="text" 
                      maxLength={16}
                      required
                      disabled={procesandoPago}
                      value={numTarjeta}
                      onChange={(e) => setNumTarjeta(e.target.value.replace(/\D/g, ""))}
                      className="w-full bg-[#001529] border border-white/10 rounded-xl p-3 text-sm font-mono tracking-widest text-white placeholder-neutral-700 outline-none focus:border-[#c5a059] transition-all" 
                      placeholder="4556 7812 9012 3456" 
                    />
                  </div>

                  {/* Nombre del Titular */}
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Titular de la Tarjeta</label>
                    <input 
                      type="text" 
                      required
                      disabled={procesandoPago}
                      value={nombreTarjeta}
                      onChange={(e) => setNombreTarjeta(e.target.value)}
                      className="w-full bg-[#001529] border border-white/10 rounded-xl p-3 text-sm uppercase text-white placeholder-neutral-700 outline-none focus:border-[#c5a059] transition-all" 
                      placeholder="Ej: FEDERICO VILLALBA" 
                    />
                  </div>

                  {/* Vencimiento y CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Vencimiento</label>
                      <input 
                        type="text" 
                        maxLength={5}
                        required
                        disabled={procesandoPago}
                        value={vencimiento}
                        onChange={(e) => setVencimiento(e.target.value)}
                        className="w-full bg-[#001529] border border-white/10 rounded-xl p-3 text-sm text-center text-white placeholder-neutral-700 outline-none focus:border-[#c5a059] transition-all" 
                        placeholder="MM/AA" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">CVV / CVC</label>
                      <input 
                        type="password" 
                        maxLength={3}
                        required
                        disabled={procesandoPago}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                        className="w-full bg-[#001529] border border-white/10 rounded-xl p-3 text-sm text-center text-white placeholder-neutral-700 outline-none focus:border-[#c5a059] transition-all" 
                        placeholder="•••" 
                      />
                    </div>
                  </div>

                  {/* Botón de envío con Loader simulado */}
                  <button 
                    type="submit" 
                    disabled={procesandoPago}
                    className="w-full bg-gradient-to-r from-[#c5a059] to-[#dfba75] text-black font-black text-xs uppercase tracking-[0.2em] p-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:from-neutral-700 disabled:to-neutral-800 disabled:text-neutral-500"
                  >
                    {procesandoPago ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        <span>Procesando con el banco...</span>
                      </>
                    ) : (
                      <span>Pagar de Forma Segura</span>
                    )}
                  </button>
                </form>

                <div className="text-center text-[8px] text-neutral-500 uppercase tracking-widest">
                  🔒 Encriptación SSL de 256 bits — Conexión Protegida
                </div>
              </>
            ) : (
              // PANTALLA 2: ÉXITO TOTAL TRAS PROCESAR EL PAGO
              <div className="text-center py-6 space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-3xl shadow-xl shadow-emerald-500/5">
                  ✓
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">¡Pago Aprobado!</h3>
                  <p className="text-xs text-neutral-400">El pedido fue registrado con éxito en Óptica Danny.</p>
                </div>

                <div className="bg-[#001529] border border-white/5 rounded-2xl p-4 text-left font-mono text-[10px] text-neutral-400 space-y-1">
                  <div><span className="text-neutral-500">Operación:</span> #OD-{Math.floor(10000 + Math.random() * 90000)}</div>
                  <div><span className="text-neutral-500">Producto:</span> {armazon.nombre}</div>
                  <div><span className="text-neutral-500">Monto:</span> ${armazon.precio.toLocaleString("es-MX")} MXN</div>
                  <div className="text-emerald-400 text-center font-bold uppercase tracking-widest text-[8px] pt-2">Autenticación bancaria exitosa</div>
                </div>

                <button 
                  onClick={() => { setMostrarModal(false); setPagoExitoso(false); }}
                  className="w-full bg-white text-black font-black text-xs uppercase tracking-widest p-3 rounded-xl transition-all"
                >
                  Entendido
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      <footer className="relative z-10 w-full text-center text-[9px] text-neutral-600 uppercase tracking-widest py-6 border-t border-white/5">
        © 2026 Óptica Danny — Luxury Eyewear Experience.
      </footer>
    </div>
  );
}