"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Armazon {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
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
      console.error("Error al cargar lista:", error);
    }
  };

  // Intentar validar el PIN contra una variable de entorno o una clave fija temporal
  const manejarLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorPin("");

    // Usamos una clave por defecto, pero la validamos de forma que sea segura.
    // Podés cambiar "Danny2026" por la clave que vos quieras acá abajo:
    const claveSecreta = process.env.NEXT_PUBLIC_ADMIN_PIN || "Danny2026";

    if (pinIngresado === claveSecreta) {
      setAutorizado(true);
      cargarLista();
    } else {
      setErrorPin("❌ Código incorrecto. Acceso denegado.");
    }
  };

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
          stock: Number(stock),
          descripcion,
        }),
      });

      if (!res.ok) throw new Error("Error al guardar");

      setMensaje("✅ ¡Armazón guardado con éxito!");
      setNombre("");
      setPrecio("");
      setImagen("");
      setStock("");
      setDescripcion("");
      cargarLista();
    } catch (error) {
      console.error(error);
      setMensaje("❌ Hubo un problema al guardar.");
    } finally {
      setCargando(false);
    }
  };

  const handleEliminar = async (id: string, nombreLente: string) => {
    if (!confirm(`¿Seguro que querés borrar el modelo "${nombreLente}"?`)) return;

    try {
      const res = await fetch(`/api/armazones/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar");

      setArmazones(armazones.filter((item) => item.id !== id));
      alert("🗑️ Modelo eliminado correctamente.");
    } catch (error) {
      console.error(error);
      alert("❌ No se pudo eliminar.");
    }
  };

  // --- VISTA 1: PANTALLA DE ACCESO (SI NO ESTÁ AUTORIZADO) ---
  if (!autorizado) {
    return (
      <div className="min-h-screen bg-[#001529] text-white relative overflow-hidden flex flex-col justify-center items-center p-4">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#051e34] via-[#001529] to-[#001529]"></div>
        
        <div className="relative z-10 w-full max-w-sm bg-[#021120]/90 border border-[#c5a059]/20 p-8 rounded-3xl backdrop-blur-md shadow-2xl text-center">
          <span className="text-[10px] text-[#c5a059] font-black uppercase tracking-[0.4em] block mb-2">Security Gate</span>
          <h1 className="text-xl font-black uppercase tracking-tight text-white mb-6">Panel Protegido</h1>
          
          <form onSubmit={manejarLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold text-left">Contraseña del Administrador</label>
              <input 
                type="password" 
                value={pinIngresado} 
                onChange={(e) => setPinIngresado(e.target.value)} 
                required 
                className="w-full bg-[#001529] border border-white/10 rounded-xl p-3.5 text-center font-bold tracking-widest text-white focus:border-[#c5a059] outline-none transition-all" 
                placeholder="••••••••" 
              />
            </div>
            
            <button type="submit" className="w-full bg-gradient-to-r from-[#c5a059] to-[#dfba75] text-black font-black text-xs uppercase tracking-[0.2em] p-3.5 rounded-xl transition-all shadow-lg active:scale-[0.98]">
              Desbloquear Panel
            </button>
          </form>

          {errorPin && (
            <p className="mt-4 text-xs font-bold text-rose-400 uppercase tracking-wide">
              {errorPin}
            </p>
          )}

          <div className="mt-6 pt-4 border-t border-white/5">
            <Link href="/" className="text-[10px] text-neutral-500 hover:text-white uppercase tracking-widest transition-colors">
              ← Volver al Inicio Público
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA 2: EL FORMULARIO ORIGINAL (SI YA SE LOGUEÓ CORRECTAMENTE) ---
  return (
    <div className="min-h-screen bg-[#001529] text-white relative overflow-hidden flex flex-col p-4 md:p-8">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#051e34] via-[#001529] to-[#001529]"></div>
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Header */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex justify-between items-center mb-8 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-[#c5a059] font-black tracking-widest text-lg">ÓPTICA DANNY</span>
          <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-emerald-500/20">Secure Mode</span>
        </div>
        <button onClick={() => setAutorizado(false)} className="text-xs text-neutral-400 hover:text-rose-400 uppercase tracking-widest transition-colors">
          Cerrar Sesión 🔒
        </button>
      </header>

      {/* Grid del Formulario y Lista */}
      <main className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start my-auto">
        {/* ... (Todo tu código interno del formulario queda exactamente igual al paso anterior) ... */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#c5a059]/20 to-transparent p-[1px]">
          <div className="bg-[#021120]/90 p-6 md:p-8 rounded-[23px] backdrop-blur-xl">
            <div className="mb-6">
              <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em] block mb-1">Management</span>
              <h1 className="text-xl font-black tracking-tight uppercase text-white">Ingreso de Stock</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Nombre del Armazón</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="w-full bg-[#001529]/60 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-neutral-600 focus:border-[#c5a059] outline-none transition-all" placeholder="Ej: Ray-Ban Aviator Dorado" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Precio (MXN)</label>
                  <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required className="w-full bg-[#001529]/60 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-neutral-600 focus:border-[#c5a059] outline-none transition-all" placeholder="2499" />
                </div>
                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Stock</label>
                  <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required className="w-full bg-[#001529]/60 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-neutral-600 focus:border-[#c5a059] outline-none transition-all" placeholder="5" />
                </div>
              </div>

              <div className="space-y-1">
  <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Imagen del Armazón (Foto o Render)</label>
  <div className="relative">
    <input 
      type="file" 
      accept="image/*"
      onChange={async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        setMensaje("⏳ Subiendo imagen al servidor de la óptica...");
        const formData = new FormData();
        formData.append("file", file);

        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData
          });
          const data = await res.json();
          if (data.success) {
            setImagen(data.url); // Guardamos la URL que nos dio Google
            setMensaje("📸 ¡Imagen subida y procesada con éxito!");
          } else {
            setMensaje("❌ Error al procesar la imagen.");
          }
        } catch (err) {
          console.error(err);
          setMensaje("❌ Falló la conexión con el Storage.");
        }
      }}
      className="w-full bg-[#001529]/60 border border-white/10 rounded-xl p-2.5 text-xs text-neutral-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-[#c5a059] file:text-black hover:file:bg-[#b08e4f] file:cursor-pointer transition-all" 
    />
  </div>
  {imagen && (
    <p className="text-[10px] text-emerald-400 font-semibold mt-1">✓ Imagen lista para publicar</p>
  )}
</div>

              <div className="space-y-1">
                <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Descripción</label>
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={2} className="w-full bg-[#001529]/60 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-neutral-600 focus:border-[#c5a059] outline-none transition-all resize-none leading-relaxed" placeholder="Materiales, cristales..." />
              </div>

              <button type="submit" disabled={cargando} className="w-full bg-gradient-to-r from-[#c5a059] to-[#dfba75] text-black font-black text-xs uppercase tracking-[0.2em] p-3.5 rounded-xl transition-all shadow-lg active:scale-[0.98]">
                {cargando ? "Guardando..." : "Publicar Armazón"}
              </button>
            </form>

            {mensaje && (
              <div className={`mt-4 p-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center border ${mensaje.includes("✅") ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border-rose-500/20 text-rose-400"}`}>
                {mensaje}
              </div>
            )}
          </div>
        </div>

        {/* Columna Derecha: Listado */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-white/10 to-transparent p-[1px] h-full">
          <div className="bg-[#021120]/80 p-6 md:p-8 rounded-[23px] backdrop-blur-xl h-[470px] flex flex-col">
            <div className="mb-4">
              <span className="text-[9px] text-neutral-400 font-black uppercase tracking-[0.4em] block mb-1">Database Control</span>
              <h2 className="text-xl font-black tracking-tight uppercase text-[#c5a059]">Modelos en Línea ({armazones.length})</h2>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-[#c5a059]/20">
              {armazones.length === 0 ? (
                <p className="text-xs text-neutral-500 uppercase tracking-wider text-center my-auto">No hay modelos cargados en Firestore.</p>
              ) : (
                armazones.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-[#001529]/60 border border-white/5 rounded-xl p-3 hover:border-white/10 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-white/5 overflow-hidden flex items-center justify-center p-1 flex-shrink-0">
                        <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover rounded" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wide text-white group-hover:text-[#c5a059] transition-colors line-clamp-1">{item.nombre}</h3>
                        <p className="text-[10px] text-neutral-400 font-semibold mt-0.5">${item.precio} MXN</p>
                      </div>
                    </div>
                    <button onClick={() => handleEliminar(item.id, item.nombre)} className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all text-xs font-bold">🗑️</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 w-full text-center text-[9px] text-neutral-600 uppercase tracking-widest mt-8">
        © 2026 Óptica Danny — Control Room.
      </footer>
    </div>
  );
}