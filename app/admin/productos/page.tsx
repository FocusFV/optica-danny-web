"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Armazon {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  stock?: number;
  descripcion?: string;
}

export default function AdminArmazonesPage() {
  // --- ESTADOS DEL FORMULARIO Y LISTA ---
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [stock, setStock] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [armazones, setArmazones] = useState<Armazon[]>([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // --- ESTADOS DE EDICIÓN REAL ---
  const [productoAEditar, setProductoAEditar] = useState<any | null>(null);
  const [guardandoCambios, setGuardandoCambios] = useState(false);

  // --- ESTADOS DE SEGURIDAD ---
  const [pinIngresado, setPinIngresado] = useState("");
  const [autorizado, setAutorizado] = useState(false);
  const [errorPin, setErrorPin] = useState("");

  // Cargar la lista de armazones actuales
  const cargarLista = async () => {
    try {
      const res = await fetch("/api/armazones");
      if (res.ok) {
        const data = await res.json();
        setArmazones(data);
      }
    } catch (error) {
      console.error("Error al cargar la lista de armazones:", error);
    }
  };

  useEffect(() => {
    if (autorizado) {
      cargarLista();
    }
  }, [autorizado]);

  // Validar PIN de acceso
  const manejarLoginAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinIngresado === "2026") { 
      setAutorizado(true);
      setErrorPin("");
    } else {
      setErrorPin("PIN Incorrecto. Acceso denegado.");
    }
  };

  // Crear nuevo armazón
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje("");

    try {
      const res = await fetch("/api/armazones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          precio: Number(precio),
          imagen,
          stock: Number(stock) || 5, 
          descripcion: descripcion || ""
        }),
      });

      if (res.ok) {
        setMensaje("¡Armazón subido a Firestore con éxito!");
        setNombre("");
        setPrecio("");
        setImagen("");
        setStock("");
        setDescripcion("");
        cargarLista(); 
      } else {
        setMensaje("Hubo un problema al guardar el armazón.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error de red al intentar conectar.");
    } finally {
      setCargando(false);
    }
  };

  // Eliminar armazón
  const handleEliminar = async (id: string, nombreLente: string) => {
    const confirmar = confirm(`¿Seguro que querés eliminar "${nombreLente}" del catálogo?`);
    if (!confirmar) return;

    try {
      const res = await fetch("/api/armazones", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert("Modelo eliminado correctamente.");
        cargarLista();
      } else {
        alert("No se pudo eliminar el producto.");
      }
    } catch (error) {
      console.error(error);
      alert("Error al intentar borrar el armazón.");
    }
  };

  // --- FLUJO PRE-LOGIN: FORMULARIO PIN ---
  if (!autorizado) {
    return (
      <div className="min-h-screen bg-[#001424] flex flex-col justify-center items-center text-white px-4">
        <div className="w-full max-w-sm bg-[#021120] border border-white/10 p-8 rounded-3xl shadow-2xl text-center space-y-6">
          <div>
            <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em] block mb-1">Security Gate</span>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">Panel Administrativo</h2>
            <p className="text-xs text-neutral-400 mt-1">Ingresá el PIN maestro de Óptica Danny para continuar.</p>
          </div>

          <form onSubmit={manejarLoginAdmin} className="space-y-4">
            <input 
              type="password"
              maxLength={6}
              value={pinIngresado}
              onChange={(e) => setPinIngresado(e.target.value)}
              placeholder="••••"
              className="w-full bg-[#001529] border border-white/10 rounded-2xl py-3.5 text-center text-lg font-bold tracking-[0.5em] focus:border-[#c5a059] outline-none transition-all placeholder-neutral-700"
            />
            {errorPin && <p className="text-[11px] text-rose-400 font-bold uppercase tracking-wider">{errorPin}</p>}
            <button type="submit" className="w-full bg-[#c5a059] text-black font-black text-xs uppercase tracking-widest py-4 rounded-2xl shadow-xl hover:bg-[#dfba75] transition-all active:scale-[0.98]">
              Verificar Credenciales
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000e1a] text-white relative selection:bg-[#c5a059] selection:text-black">
      
      {/* Fondos Luxury */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#071f35] via-[#000e1a] to-[#000e1a]"></div>

      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-b border-white/5 flex justify-between items-center bg-black/10 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-white font-black tracking-[0.3em] text-xs md:text-sm">ÓPTICA DANNY</Link>
          <span className="text-[9px] font-black uppercase tracking-widest bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30 px-2.5 py-1 rounded-md">Control Base</span>
        </div>
        <div className="flex gap-4">
          <Link href="/admin/ventas" className="text-[10px] text-neutral-400 hover:text-white uppercase tracking-widest transition-colors font-bold self-center">
            📊 Ver Ventas
          </Link>
          <Link href="/" className="text-[10px] text-neutral-400 hover:text-white uppercase tracking-widest transition-colors font-bold self-center">
            ← Ir a Tienda
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* FORMULARIO DE ALTA (Izquierda) */}
        <div className="lg:col-span-5 bg-[#021120]/80 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div>
            <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em] block mb-1">Inventory Input</span>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">Nuevo Armazón</h2>
            <p className="text-xs text-neutral-400 mt-1">Cargá las especificaciones para impactar directo en el catálogo.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Nombre del Armazón</label>
              <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Ray-Ban Aviador Classic" className="w-full bg-[#001529] border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-neutral-700 outline-none focus:border-[#c5a059] transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Precio ($ MXN)</label>
                <input type="number" required value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="3499" className="w-full bg-[#001529] border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-neutral-700 outline-none focus:border-[#c5a059] transition-all" />
              </div>
              <div className="space-y-1">
                <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Stock Inicial</label>
                <input type="number" required value={stock} onChange={(e) => setStock(e.target.value)} placeholder="5" className="w-full bg-[#001529] border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-neutral-700 outline-none focus:border-[#c5a059] transition-all" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">URL de la Imagen (PNG/WebP transparente)</label>
              <input type="text" required value={imagen} onChange={(e) => setImagen(e.target.value)} placeholder="https://i.ibb.co/.../lente.png" className="w-full bg-[#001529] border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-neutral-700 outline-none focus:border-[#c5a059] transition-all" />
            </div>

            <div className="space-y-1">
              <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Descripción del Modelo</label>
              <textarea rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Escribí los detalles estéticos, materiales, etc..." className="w-full bg-[#001529] border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-neutral-700 outline-none focus:border-[#c5a059] transition-all resize-none" />
            </div>

            <button type="submit" disabled={cargando} className="w-full bg-white text-black font-black text-xs uppercase tracking-[0.2em] py-4 rounded-xl shadow-xl transition-all disabled:opacity-50 active:scale-[0.98]">
              {cargando ? "Inyectando en Base de Datos..." : "Guardar en Catálogo"}
            </button>
          </form>

          {mensaje && (
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center text-xs uppercase tracking-wider text-[#c5a059] font-bold">
              {mensaje}
            </div>
          )}
        </div>

        {/* LISTADO EN VIVO CON SOPORTE DE EDICIÓN (Derecha) */}
        <div className="lg:col-span-7 bg-[#021120]/80 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div>
            <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em] block mb-1">Live Feed</span>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">Modelos Activos</h2>
            <p className="text-xs text-neutral-400 mt-1">Lista en tiempo real sincronizada con la base de datos de la app.</p>
          </div>

          <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-1 gap-3">
              {armazones.length === 0 ? (
                <p className="text-center text-xs text-neutral-500 py-12 font-medium">No se encontraron armazones en el catálogo.</p>
              ) : (
                armazones.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-[#001529]/60 border border-white/5 rounded-xl p-3 hover:border-white/10 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-white/5 overflow-hidden flex items-center justify-center p-1 flex-shrink-0">
                        <img src={item.imagen} alt={item.nombre} className="w-full h-full object-contain rounded" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wide text-white group-hover:text-[#c5a059] transition-colors line-clamp-1">{item.nombre}</h3>
                        <div className="flex gap-3 text-[10px] text-neutral-400 font-semibold mt-0.5">
                          <span>${item.precio} MXN</span>
                          <span className="text-neutral-600">|</span>
                          <span className={item.stock && item.stock > 1 ? "text-neutral-400" : "text-amber-400 font-bold"}>
                            Stock: {item.stock ?? 0}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* ACCIONES DE FILA */}
                    <div className="flex gap-2">
                      {/* 🔥 BOTÓN EDITAR */}
                      <button 
                        onClick={() => setProductoAEditar(item)}
                        className="p-2 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/20 text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all text-xs font-bold"
                        title="Editar armazón"
                      >
                        ✏️
                      </button>
                      
                      {/* BOTÓN ELIMINAR */}
                      <button 
                        onClick={() => handleEliminar(item.id, item.nombre)} 
                        className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all text-xs font-bold"
                        title="Eliminar del catálogo"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 🏛️ MODAL LUXURY PARA EDITAR ARMAZÓN */}
      {productoAEditar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#021120] border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl space-y-6 text-white">
            
            <button 
              onClick={() => setProductoAEditar(null)} 
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-lg font-bold transition-colors"
            >
              ✕
            </button>

            <div className="text-center">
              <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em] block mb-1">Catalog Live Editor</span>
              <h2 className="text-xl font-black uppercase tracking-tight">Modificar Armazón</h2>
              <p className="text-xs text-neutral-400 mt-1 font-mono text-[10px]">ID: {productoAEditar.id.substring(0, 12).toUpperCase()}</p>
            </div>

            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                setGuardandoCambios(true);
                try {
                  // 🔥 ACTUALIZADO: Apuntamos directo a la API limpia pasándole todo por body
                  const res = await fetch("/api/armazones", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      id: productoAEditar.id,
                      nombre: productoAEditar.nombre,
                      precio: Number(productoAEditar.precio),
                      stock: Number(productoAEditar.stock),
                      descripcion: productoAEditar.descripcion
                    })
                  });
                  if (res.ok) {
                    setProductoAEditar(null);
                    cargarLista();
                  } else {
                    alert("Hubo un problema al intentar guardar los cambios.");
                  }
                } catch (err) {
                  console.error(err);
                  alert("Error de red al actualizar.");
                } finally {
                  setGuardandoCambios(false);
                }
              }} 
              className="space-y-4"
            >
              {/* Campo Nombre */}
              <div className="space-y-1">
                <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Nombre del Modelo</label>
                <input 
                  type="text" 
                  required
                  value={productoAEditar.nombre}
                  onChange={(e) => setProductoAEditar({...productoAEditar, nombre: e.target.value})}
                  className="w-full bg-[#001529] border border-white/10 rounded-xl p-3 text-xs uppercase text-white outline-none focus:border-[#c5a059] transition-all" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Campo Precio */}
                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Precio ($ MXN)</label>
                  <input 
                    type="number" 
                    required
                    value={productoAEditar.precio}
                    onChange={(e) => setProductoAEditar({...productoAEditar, precio: Number(e.target.value)})}
                    className="w-full bg-[#001529] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#c5a059] transition-all" 
                />
                </div>

                {/* Campo Stock */}
                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Stock Físico</label>
                  <input 
                    type="number" 
                    required
                    value={productoAEditar.stock ?? 5}
                    onChange={(e) => setProductoAEditar({...productoAEditar, stock: Number(e.target.value)})}
                    className="w-full bg-[#001529] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#c5a059] transition-all" 
                  />
                </div>
              </div>

              {/* Campo Descripción */}
              <div className="space-y-1">
                <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Descripción Corta</label>
                <textarea 
                  rows={3}
                  value={productoAEditar.descripcion || ""}
                  onChange={(e) => setProductoAEditar({...productoAEditar, descripcion: e.target.value})}
                  className="w-full bg-[#001529] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#c5a059] transition-all resize-none" 
                />
              </div>

              <button 
                type="submit" 
                disabled={guardandoCambios}
                className="w-full bg-gradient-to-r from-[#c5a059] to-[#dfba75] text-black font-black text-xs uppercase tracking-[0.2em] p-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-xl active:scale-95"
              >
                {guardandoCambios ? "Guardando Cambios..." : "Confirmar Modificación"}
              </button>
            </form>
          </div>
        </div>
      )}

      <footer className="relative z-10 w-full text-center text-[9px] text-neutral-600 uppercase tracking-widest py-6 border-t border-white/5 bg-black/5">
        © 2026 Óptica Danny — Panel de Administración Luxury.
      </footer>
    </div>
  );
}