"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const estadoPagoUrl = searchParams ? searchParams.get("pago") : null; 

  const [armazon, setArmazon] = useState<Armazon | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [pestaniaActiva, setPestaniaActiva] = useState("detalles");

  // --- ESTADOS DEL CHECKOUT REAL ---
  const [mostrarModal, setMostrarModal] = useState(false);
  const [procesandoPago, setProcesandoPago] = useState(false);
  const [stockDescontado, setStockDescontado] = useState(false);

  // Código de operación único para el cliente (se genera una vez en el cliente)
  const [codigoOperacion, setCodigoOperacion] = useState("");
  const [nombreTarjeta, setNombreTarjeta] = useState("");

  // Generamos un código random facha para el recibo post-compra
  useEffect(() => {
    setCodigoOperacion(`OD-${Math.floor(10000 + Math.random() * 90000)}`);
  }, []);

  // 1. CARGA DEL DETALLE ORIGINAL
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

  // 2. DETECTA EL PAGO EXITOSO, DESCUENTA STOCK Y REGISTRA LA VENTA
  useEffect(() => {
    const aplicarDescuentoStock = async () => {
      if (estadoPagoUrl === "exitoso" && armazon && !stockDescontado) {
        try {
          const res = await fetch("/api/armazones/descontar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              id: armazon.id,
              nombreLente: armazon.nombre,
              precio: armazon.precio,
              nombreComprador: nombreTarjeta || "Cliente Web"
            }),
          });
          
          if (res.ok) {
            console.log("🔥 Stock actualizado y venta registrada en Firestore correctamente.");
            setStockDescontado(true);
            setArmazon(prev => prev ? { ...prev, stock: prev.stock - 1 } : null);
          }
        } catch (err) {
          console.error("Error al intentar procesar la venta y stock:", err);
        }
      }
    };

    aplicarDescuentoStock();
  }, [estadoPagoUrl, armazon, stockDescontado, nombreTarjeta]);

  // Conexión real con Mercado Pago
  const manejarPagoMercadoPago = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!armazon) return;
    setProcesandoPago(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: armazon.id,
          nombre: armazon.nombre,
          precio: armazon.precio,
        }),
      });

      const data = await res.json();

      if (data.urlPago) {
        window.location.href = data.urlPago;
      } else {
        alert("Hubo un problema al generar el enlace.");
        setProcesandoPago(false);
      }
    } catch (err) {
      console.error("Error al conectar con la pasarela:", err);
      setProcesandoPago(false);
    }
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

  // Configuración de Mensajes de WhatsApp (Estándar vs Post-Compra)
  const numeroTelefono = "529990000000"; 
  
  const mensajeConsulta = encodeURIComponent(
    `¡Hola Óptica Danny! 👋 Me interesa consultar disponibilidad del armazón "${armazon.nombre}".\n\nEnlace: https://optica-danny.vercel.app/armazones/${armazon.id}`
  );
  
  const mensajePostCompra = encodeURIComponent(
    `¡Hola Óptica Danny! 💳✨ Acabo de realizar el pago de mi armazón "${armazon.nombre}" a través de la web.\n\n📄 Código de Operación: #${codigoOperacion}\n💰 Monto: $${armazon.precio.toLocaleString("es-MX")} MXN\n📍 Quiero coordinar la entrega en Mérida.`
  );

  const linkWhatsAppConsulta = `https://wa.me/${numeroTelefono}?text=${mensajeConsulta}`;
  const linkWhatsAppPostCompra = `https://wa.me/${numeroTelefono}?text=${mensajePostCompra}`;

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
        
        {/* FOTO LENTE / COMPONENTES POST COMPRA */}
        <div className="lg:col-span-7 space-y-4 w-full">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/10 via-transparent to-transparent p-[1px] shadow-2xl">
            <div className="bg-[#031627]/40 rounded-[23px] backdrop-blur-xl p-8 md:p-16 flex items-center justify-center aspect-square relative group">
              
              {/* PANTALLA EXPERIENCIA POST COMPRA PREMIUM (ÉXITO) */}
              {estadoPagoUrl === "exitoso" && (
                <div className="absolute inset-0 bg-[#010b14]/98 z-30 rounded-[22px] flex flex-col items-center justify-center p-6 md:p-10 text-center animate-fade-in border border-emerald-500/20 shadow-2xl">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/30 text-2xl mb-4 shadow-xl shadow-emerald-500/10 animate-bounce">✓</div>
                  <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em] block mb-1">Pago Verificado</span>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white">¡Gracias por tu compra!</h3>
                  <p className="text-xs text-neutral-400 max-w-sm mt-2 leading-relaxed">El cobro de tu armazón se procesó de forma segura.</p>
                  
                  <div className="w-full max-w-xs bg-black/40 border border-white/5 rounded-2xl p-4 my-5 text-left font-mono text-[11px] text-neutral-400 space-y-1.5 backdrop-blur-md">
                    <div><span className="text-neutral-600">Operación:</span> <span className="text-white font-bold">#{codigoOperacion}</span></div>
                    <div><span className="text-neutral-600">Producto:</span> <span className="text-white">{armazon.nombre}</span></div>
                    <div><span className="text-neutral-600">Monto:</span> <span className="text-[#c5a059] font-bold">${armazon.precio.toLocaleString("es-MX")} MXN</span></div>
                    <div className="text-[9px] text-emerald-400 text-center uppercase tracking-widest font-bold pt-2 border-t border-white/5 mt-2">Listo para entrega en Mérida</div>
                  </div>

                  <a 
                    href={linkWhatsAppPostCompra} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full max-w-xs bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs uppercase tracking-[0.2em] p-4 rounded-xl shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2 transform active:scale-95"
                  >
                    <span>Coordinar por WhatsApp</span>
                    <span>💬</span>
                  </a>

                  <Link href="/" className="mt-4 text-[9px] font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
                    Volver a la galería
                  </Link>
                </div>
              )}

              {/* ❌ PANTALLA DE ERROR / PAGO FALLIDO */}
              {estadoPagoUrl === "fallido" && (
                <div className="absolute inset-0 bg-[#010b14]/98 z-30 rounded-[22px] flex flex-col items-center justify-center p-6 md:p-10 text-center animate-fade-in border border-rose-500/20 shadow-2xl">
                  <div className="w-16 h-16 bg-rose-500/10 text-rose-400 rounded-full flex items-center justify-center border border-rose-500/30 text-2xl mb-4 shadow-xl shadow-rose-500/5">✕</div>
                  <span className="text-[9px] text-rose-400 font-black uppercase tracking-[0.4em] block mb-1">Transacción Cancelada</span>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white">Hubo un bardo con el pago</h3>
                  <p className="text-xs text-neutral-400 max-w-sm mt-2 leading-relaxed">No te preocupes, no se hizo ningún cargo. Tu armazón sigue disponible en stock. Podés reintentar ahora o coordinar directo con el local.</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-xs">
                    <button 
                      onClick={() => setMostrarModal(true)}
                      className="flex-1 bg-white text-black font-black text-[10px] uppercase tracking-[0.15em] p-3.5 rounded-xl shadow-lg transition-all transform active:scale-95"
                    >
                      Reintentar Pago
                    </button>
                    
                    <a 
                      href={`https://wa.me/${numeroTelefono}?text=${encodeURIComponent(`¡Hola Óptica Danny! 👋 Tuve un problema al intentar pagar el armazón "${armazon.nombre}" por la web. ¿Me dan una mano para completarlo?`)}`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 border border-white/10 bg-white/5 text-white font-black text-[10px] uppercase tracking-[0.15em] p-3.5 rounded-xl transition-colors hover:bg-white/10 flex items-center justify-center gap-1"
                    >
                      Pedir Ayuda 💬
                    </a>
                  </div>

                  <Link href="/" className="mt-6 text-[9px] font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
                    Volver a la galería
                  </Link>
                </div>
              )}

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
            <button 
              onClick={() => setMostrarModal(true)}
              disabled={armazon.stock <= 0}
              className="w-full relative overflow-hidden bg-white text-black hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500 font-black text-xs uppercase tracking-[0.25em] p-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.99]"
            >
              <span>Comprar con Tarjeta</span>
              <span>💳</span>
            </button>

            <a href={linkWhatsAppConsulta} target="_blank" rel="noopener noreferrer" className="w-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-black text-xs uppercase tracking-[0.25em] p-4 rounded-xl transition-all flex items-center justify-center gap-3">
              <span>Consultar por WhatsApp</span>
              <span>💬</span>
            </a>
          </div>
        </div>
      </main>

      {/* MODAL DE CONFIRMACIÓN QUE ABRE MERCADO PAGO */}
      {mostrarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-[#021120]/95 border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl space-y-6">
            
            <button 
              onClick={() => { if(!procesandoPago) { setMostrarModal(false); } }} 
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <div className="text-center">
              <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em] block mb-1">Secure Checkout</span>
              <h2 className="text-xl font-black uppercase tracking-tight text-white">Pago Seguro</h2>
              <p className="text-xs text-neutral-400 mt-1">Estás pagando: <span className="text-white font-bold">{armazon.nombre}</span></p>
            </div>

            <form onSubmit={manejarPagoMercadoPago} className="space-y-4">
              <div className="bg-[#001529] border border-white/5 rounded-xl p-3 flex justify-between items-center text-xs uppercase tracking-wider font-bold">
                <span className="text-neutral-400">Total a debitar:</span>
                <span className="text-[#c5a059] text-sm font-black">${armazon.precio.toLocaleString("es-MX")} MXN</span>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Confirmar Nombre Comprador</label>
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

              <p className="text-[10px] text-neutral-400 text-center leading-relaxed bg-[#001529]/60 p-3 rounded-xl border border-white/5">
                Al hacer clic abajo, se abrirá la pasarela oficial de <span className="text-white font-bold">Mercado Pago</span> para completar tu transacción de forma totalmente segura.
              </p>

              <button 
                type="submit" 
                disabled={procesandoPago}
                className="w-full bg-gradient-to-r from-[#c5a059] to-[#dfba75] text-black font-black text-xs uppercase tracking-[0.2em] p-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:from-neutral-700 disabled:to-neutral-800 disabled:text-neutral-500 shadow-xl active:scale-95"
              >
                {procesandoPago ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    <span>Abriendo Mercado Pago...</span>
                  </>
                ) : (
                  <span>Iniciar Pago Oficial</span>
                )}
              </button>
            </form>

            <div className="text-center text-[8px] text-neutral-500 uppercase tracking-widest">
              🔒 Checkout seguro procesado por Mercado Pago
            </div>
          </div>
        </div>
      )}

      <footer className="relative z-10 w-full text-center text-[9px] text-neutral-600 uppercase tracking-widest py-6 border-t border-white/5">
        © 2026 Óptica Danny — Luxury Eyewear Experience.
      </footer>
    </div>
  );
}