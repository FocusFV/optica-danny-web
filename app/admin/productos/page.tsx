"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";

interface Armazon {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  stock?: number;
  descripcion?: string;
  categoria?: string;
  genero?: string;
  marca?: string;
  material?: string;
}

export default function AdminArmazonesPage() {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dyskgncu8";
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "optica_danny";

  // --- ESTADOS DEL FORMULARIO Y LISTA ---
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [stock, setStock] = useState("5");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("oftalmico");
  const [genero, setGenero] = useState("unisex");
  const [marca, setMarca] = useState("Ray-Ban");

  const [armazones, setArmazones] = useState<Armazon[]>([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // --- ESTADOS DE EDICIÓN ---
  const [productoAEditar, setProductoAEditar] = useState<any | null>(null);
  const [guardandoCambios, setGuardandoCambios] = useState(false);

  // --- ESTADOS DE SEGURIDAD (VERIFICACIÓN EN SERVIDOR) ---
  const [pinIngresado, setPinIngresado] = useState("");
  const [autorizado, setAutorizado] = useState(false);
  const [errorPin, setErrorPin] = useState("");
  const [verificandoAuth, setVerificandoAuth] = useState(true);

  // 1. Verificar sesión existente en el servidor al cargar
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth/check");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setAutorizado(true);
          }
        }
      } catch (err) {
        console.error("Error al verificar sesión:", err);
      } finally {
        setVerificandoAuth(false);
      }
    }
    checkAuth();
  }, []);

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

  // Login contra la API protegida del servidor
  const manejarLoginAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorPin("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinIngresado }),
      });

      const data = await res.json();
      if (res.ok) {
        setAutorizado(true);
        setErrorPin("");
      } else {
        setErrorPin(data.error || "PIN incorrecto. Acceso denegado.");
      }
    } catch {
      setErrorPin("Error de conexión al verificar PIN.");
    }
  };

  const manejarLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } finally {
      setAutorizado(false);
      setPinIngresado("");
    }
  };

  // Widget de subida de imágenes Cloudinary
  const abrirWidgetCloudinary = (esParaEdicion: boolean) => {
    if (typeof window !== "undefined" && (window as any).cloudinary) {
      const miWidget = (window as any).cloudinary.createUploadWidget(
        {
          cloudName: CLOUD_NAME,
          uploadPreset: UPLOAD_PRESET,
          sources: ["local", "url", "camera"],
          multiple: false,
          cropping: false,
          styles: {
            palette: {
              window: "#021120",
              windowBorder: "#c5a059",
              tabIcon: "#c5a059",
              menuIcons: "#c5a059",
              textDark: "#FFFFFF",
              textLight: "#CCCCCC",
              link: "#c5a059",
              action: "#c5a059",
              inactiveTabIcon: "#666666",
              error: "#F43F5E",
              inProgress: "#c5a059",
              complete: "#10B981",
              sourceBg: "#001529",
            },
          },
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            const urlSegura = result.info.secure_url;
            if (esParaEdicion) {
              setProductoAEditar((prev: any) => ({ ...prev, imagen: urlSegura }));
            } else {
              setImagen(urlSegura);
            }
          }
        }
      );
      miWidget.open();
    } else {
      alert("El módulo de subida está cargando, intentá en unos segundos.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagen) {
      alert("Por favor subí la foto del armazón.");
      return;
    }
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
          descripcion: descripcion || "",
          categoria,
          genero,
          marca,
        }),
      });

      if (res.ok) {
        setMensaje("¡Armazón guardado en catálogo con éxito!");
        setNombre("");
        setPrecio("");
        setImagen("");
        setStock("5");
        setDescripcion("");
        cargarLista();
      } else {
        const errorData = await res.json();
        setMensaje(errorData.error || "Hubo un problema al guardar el armazón.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error de red al intentar conectar.");
    } finally {
      setCargando(false);
    }
  };

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

  if (verificandoAuth) {
    return (
      <div className="min-h-screen bg-[#001424] flex items-center justify-center text-white">
        <div className="w-8 h-8 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!autorizado) {
    return (
      <div className="min-h-screen bg-[#001424] flex flex-col justify-center items-center text-white px-4">
        <div className="w-full max-w-sm bg-[#021120] border border-white/10 p-8 rounded-3xl shadow-2xl text-center space-y-6">
          <div>
            <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em] block mb-1">
              Security Gate
            </span>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">
              Panel Administrativo
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Ingresá el PIN maestro de Óptica Danny para continuar.
            </p>
          </div>

          <form onSubmit={manejarLoginAdmin} className="space-y-4">
            <input
              type="password"
              maxLength={8}
              value={pinIngresado}
              onChange={(e) => setPinIngresado(e.target.value)}
              placeholder="••••"
              className="w-full bg-[#001529] border border-white/10 rounded-2xl py-3.5 text-center text-lg font-bold tracking-[0.5em] focus:border-[#c5a059] outline-none transition-all placeholder-neutral-700"
            />
            {errorPin && (
              <p className="text-[11px] text-rose-400 font-bold uppercase tracking-wider">
                {errorPin}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-[#c5a059] text-black font-black text-xs uppercase tracking-widest py-4 rounded-2xl shadow-xl hover:bg-[#dfba75] transition-all active:scale-[0.98]"
            >
              Verificar Credenciales
            </button>
          </form>

          <Link
            href="/"
            className="inline-block text-[10px] text-neutral-500 hover:text-white uppercase tracking-widest transition-colors font-bold"
          >
            ← Volver a la Tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000e1a] text-white relative selection:bg-[#c5a059] selection:text-black">
      <Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="lazyOnload" />

      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#071f35] via-[#000e1a] to-[#000e1a]"></div>

      {/* HEADER DEL PANEL */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-b border-white/5 flex justify-between items-center bg-black/10 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-white font-black tracking-[0.3em] text-xs md:text-sm">
            ÓPTICA DANNY
          </Link>
          <span className="text-[9px] font-black uppercase tracking-widest bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30 px-2.5 py-1 rounded-md">
            Control Base
          </span>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/admin/ventas"
            className="text-[10px] text-neutral-400 hover:text-white uppercase tracking-widest transition-colors font-bold"
          >
            📊 Ver Ventas
          </Link>
          <Link
            href="/"
            className="text-[10px] text-neutral-400 hover:text-white uppercase tracking-widest transition-colors font-bold"
          >
            ← Tienda
          </Link>
          <button
            onClick={manejarLogout}
            className="text-[9px] text-rose-400 hover:text-rose-300 uppercase tracking-widest font-black border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* FORMULARIO DE ALTA (Izquierda) */}
        <div className="lg:col-span-5 bg-[#021120]/80 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div>
            <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em] block mb-1">
              Inventory Input
            </span>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">
              Nuevo Armazón
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Cargá las especificaciones para impactar directo en el catálogo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                Nombre del Armazón
              </label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Ray-Ban Aviador Classic"
                className="w-full bg-[#001529] border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-neutral-700 outline-none focus:border-[#c5a059] transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                  Precio ($ MXN)
                </label>
                <input
                  type="number"
                  required
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="3499"
                  className="w-full bg-[#001529] border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-neutral-700 outline-none focus:border-[#c5a059] transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                  Stock Inicial
                </label>
                <input
                  type="number"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="5"
                  className="w-full bg-[#001529] border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-neutral-700 outline-none focus:border-[#c5a059] transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                  Categoría
                </label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full bg-[#001529] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#c5a059]"
                >
                  <option value="oftalmico">Oftálmico</option>
                  <option value="sol">De Sol</option>
                  <option value="inteligente">Smart</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                  Género
                </label>
                <select
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                  className="w-full bg-[#001529] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#c5a059]"
                >
                  <option value="unisex">Unisex</option>
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                  Marca
                </label>
                <input
                  type="text"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  placeholder="Ray-Ban"
                  className="w-full bg-[#001529] border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            {/* BOTÓN DE SUBIDA CLOUDINARY */}
            <div className="space-y-1">
              <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                Imagen del Producto
              </label>
              <div className="flex gap-3 items-center">
                <button
                  type="button"
                  onClick={() => abrirWidgetCloudinary(false)}
                  className="bg-[#001529] border border-[#c5a059]/30 hover:border-[#c5a059] text-white text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-xl transition-all flex items-center gap-2"
                >
                  📸 {imagen ? "Cambiar Imagen" : "Subir Foto Real"}
                </button>
                {imagen && (
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    ✓ Cargada
                  </span>
                )}
              </div>
              {imagen && (
                <div className="mt-2 w-20 h-20 bg-black/40 border border-white/5 rounded-xl overflow-hidden p-1 flex items-center justify-center">
                  <img src={imagen} alt="Preview" className="max-w-full max-h-full object-contain" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                Descripción del Modelo
              </label>
              <textarea
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Detalles estéticos, materiales, calce..."
                className="w-full bg-[#001529] border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-neutral-700 outline-none focus:border-[#c5a059] transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-white text-black font-black text-xs uppercase tracking-[0.2em] py-4 rounded-xl shadow-xl transition-all disabled:opacity-50 active:scale-[0.98]"
            >
              {cargando ? "Guardando en Catálogo..." : "Guardar en Catálogo"}
            </button>
          </form>

          {mensaje && (
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center text-xs uppercase tracking-wider text-[#c5a059] font-bold">
              {mensaje}
            </div>
          )}
        </div>

        {/* LISTADO EN VIVO (Derecha) */}
        <div className="lg:col-span-7 bg-[#021120]/80 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div>
            <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em] block mb-1">
              Live Feed
            </span>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">
              Modelos Activos
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Lista sincronizada en tiempo real con el catálogo oficial.
            </p>
          </div>

          <div className="max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-1 gap-3">
              {armazones.length === 0 ? (
                <p className="text-center text-xs text-neutral-500 py-12 font-medium">
                  No se encontraron armazones en el catálogo.
                </p>
              ) : (
                armazones.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-[#001529]/60 border border-white/5 rounded-xl p-3 hover:border-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-neutral-900 border border-white/5 overflow-hidden flex items-center justify-center p-1 shrink-0">
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className="w-full h-full object-contain rounded"
                        />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wide text-white group-hover:text-[#c5a059] transition-colors line-clamp-1">
                          {item.nombre}
                        </h3>
                        <div className="flex gap-2 text-[10px] text-neutral-400 font-semibold mt-0.5 items-center flex-wrap">
                          <span className="text-[#c5a059] font-bold">${item.precio} MXN</span>
                          <span className="text-neutral-600">|</span>
                          <span className={item.stock && item.stock > 1 ? "text-neutral-400" : "text-amber-400 font-bold"}>
                            Stock: {item.stock ?? 0}
                          </span>
                          <span className="text-neutral-600">|</span>
                          <span className="uppercase text-[9px] text-neutral-500">
                            {item.categoria || "oftálmico"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setProductoAEditar(item)}
                        className="p-2 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/20 text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all text-xs font-bold"
                        title="Editar armazón"
                      >
                        ✏️
                      </button>

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

      {/* MODAL PARA EDITAR ARMAZÓN */}
      {productoAEditar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#021120] border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl space-y-6 text-white max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setProductoAEditar(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-lg font-bold transition-colors"
            >
              ✕
            </button>

            <div className="text-center">
              <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em] block mb-1">
                Catalog Live Editor
              </span>
              <h2 className="text-xl font-black uppercase tracking-tight">Modificar Armazón</h2>
              <p className="text-xs text-neutral-400 mt-1 font-mono text-[10px]">
                ID: {productoAEditar.id.substring(0, 12).toUpperCase()}
              </p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setGuardandoCambios(true);
                try {
                  const res = await fetch("/api/armazones", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      id: productoAEditar.id,
                      nombre: productoAEditar.nombre,
                      precio: Number(productoAEditar.precio),
                      stock: Number(productoAEditar.stock),
                      descripcion: productoAEditar.descripcion,
                      imagen: productoAEditar.imagen,
                      categoria: productoAEditar.categoria,
                      genero: productoAEditar.genero,
                      marca: productoAEditar.marca,
                    }),
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
              <div className="space-y-1">
                <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  value={productoAEditar.nombre}
                  onChange={(e) =>
                    setProductoAEditar({ ...productoAEditar, nombre: e.target.value })
                  }
                  className="w-full bg-[#001529] border border-white/10 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                    Precio ($ MXN)
                  </label>
                  <input
                    type="number"
                    required
                    value={productoAEditar.precio}
                    onChange={(e) =>
                      setProductoAEditar({ ...productoAEditar, precio: e.target.value })
                    }
                    className="w-full bg-[#001529] border border-white/10 rounded-xl p-3 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                    Stock
                  </label>
                  <input
                    type="number"
                    required
                    value={productoAEditar.stock ?? 0}
                    onChange={(e) =>
                      setProductoAEditar({ ...productoAEditar, stock: e.target.value })
                    }
                    className="w-full bg-[#001529] border border-white/10 rounded-xl p-3 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                    Categoría
                  </label>
                  <select
                    value={productoAEditar.categoria || "oftalmico"}
                    onChange={(e) =>
                      setProductoAEditar({ ...productoAEditar, categoria: e.target.value })
                    }
                    className="w-full bg-[#001529] border border-white/10 rounded-xl p-3 text-xs text-white"
                  >
                    <option value="oftalmico">Oftálmico</option>
                    <option value="sol">De Sol</option>
                    <option value="inteligente">Smart</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                    Género
                  </label>
                  <select
                    value={productoAEditar.genero || "unisex"}
                    onChange={(e) =>
                      setProductoAEditar({ ...productoAEditar, genero: e.target.value })
                    }
                    className="w-full bg-[#001529] border border-white/10 rounded-xl p-3 text-xs text-white"
                  >
                    <option value="unisex">Unisex</option>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                  Imagen
                </label>
                <div className="flex gap-2 items-center">
                  <button
                    type="button"
                    onClick={() => abrirWidgetCloudinary(true)}
                    className="bg-[#001529] border border-white/10 px-3 py-2 rounded-xl text-xs font-bold"
                  >
                    📸 Cambiar Foto
                  </button>
                  {productoAEditar.imagen && (
                    <img
                      src={productoAEditar.imagen}
                      alt="Preview"
                      className="w-10 h-10 object-contain rounded border border-white/10"
                    />
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                  Descripción
                </label>
                <textarea
                  rows={2}
                  value={productoAEditar.descripcion || ""}
                  onChange={(e) =>
                    setProductoAEditar({ ...productoAEditar, descripcion: e.target.value })
                  }
                  className="w-full bg-[#001529] border border-white/10 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setProductoAEditar(null)}
                  className="flex-1 bg-white/5 border border-white/10 py-3 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={guardandoCambios}
                  className="flex-1 bg-[#c5a059] text-black py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-[#dfba75] transition-all"
                >
                  {guardandoCambios ? "Guardando..." : "Aplicar Cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
