"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Venta {
  id: string;
  armazonId: string;
  armazonNombre: string;
  comprador: string;
  compradorEmail?: string;
  metodoPago?: string;
  mercadopagoPaymentId?: string;
  monto: number;
  fecha: string;
  estado: string;
}

export default function AdminVentasPage() {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [cargando, setCargando] = useState(true);
  const [autorizado, setAutorizado] = useState(false);
  const [verificandoAuth, setVerificandoAuth] = useState(true);
  const [pinIngresado, setPinIngresado] = useState("");
  const [errorPin, setErrorPin] = useState("");

  const cargarVentas = async () => {
    try {
      const res = await fetch("/api/admin/ventas");
      if (res.ok) {
        const data = await res.json();
        setVentas(data);
      } else if (res.status === 401) {
        setAutorizado(false);
      }
    } catch (err) {
      console.error("Error cargando historial de ventas:", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth/check");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setAutorizado(true);
            cargarVentas();
            return;
          }
        }
      } catch (err) {
        console.error("Error al verificar sesión:", err);
      } finally {
        setVerificandoAuth(false);
        setCargando(false);
      }
    }
    checkAuth();
  }, []);

  const manejarLogin = async (e: React.FormEvent) => {
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
        cargarVentas();
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
      setVentas([]);
    }
  };

  if (verificandoAuth || cargando) {
    return (
      <div className="min-h-screen bg-[#001424] flex flex-col justify-center items-center text-white">
        <div className="w-10 h-10 border-2 border-t-[#c5a059] border-white/10 rounded-full animate-spin"></div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] mt-4 font-bold">
          Cargando Historial...
        </p>
      </div>
    );
  }

  if (!autorizado) {
    return (
      <div className="min-h-screen bg-[#001424] flex flex-col justify-center items-center text-white px-4">
        <div className="w-full max-w-sm bg-[#021120] border border-white/10 p-8 rounded-3xl shadow-2xl text-center space-y-6">
          <div>
            <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em] block mb-1">
              Protected Area
            </span>
            <h2 className="text-xl font-black uppercase tracking-tight text-white">
              Historial de Ventas
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Ingresá el PIN maestro para acceder a la facturación y ventas.
            </p>
          </div>

          <form onSubmit={manejarLogin} className="space-y-4">
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
            href="/admin/productos"
            className="inline-block text-[10px] text-neutral-500 hover:text-white uppercase tracking-widest transition-colors font-bold"
          >
            ← Volver a Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000e1a] text-white p-4 md:p-8 selection:bg-[#c5a059] selection:text-black">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER PANEL */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em] block mb-1">
              Control de Operaciones
            </span>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Historial de Ventas
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/productos"
              className="text-xs text-neutral-400 hover:text-[#c5a059] uppercase tracking-widest transition-colors font-bold border border-white/10 px-4 py-2 rounded-xl bg-white/5"
            >
              ← Ir a Productos
            </Link>
            <button
              onClick={manejarLogout}
              className="text-xs text-rose-400 hover:text-rose-300 uppercase tracking-widest font-black border border-rose-500/20 bg-rose-500/10 px-4 py-2 rounded-xl transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* TABLA LUXURY */}
        {ventas.length === 0 ? (
          <div className="bg-[#031627]/30 border border-white/5 rounded-2xl p-12 text-center backdrop-blur-sm">
            <p className="text-sm text-neutral-400 uppercase tracking-wider font-bold">
              No se registraron ventas en la plataforma todavía.
            </p>
          </div>
        ) : (
          <div className="border border-white/5 bg-[#031627]/20 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-black/30 text-[10px] uppercase tracking-widest text-[#c5a059] font-black">
                    <th className="p-4 pl-6">Fecha / Hora</th>
                    <th className="p-4">Cliente</th>
                    <th className="p-4">Armazón</th>
                    <th className="p-4">Monto</th>
                    <th className="p-4 pr-6 text-right">Estado / Pasarela</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs text-neutral-300">
                  {ventas.map((venta) => {
                    const fechaLocal = new Date(venta.fecha).toLocaleString("es-MX", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    });

                    return (
                      <tr key={venta.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 pl-6 font-mono text-neutral-500">{fechaLocal}</td>
                        <td className="p-4">
                          <span className="font-bold text-white uppercase block">
                            {venta.comprador}
                          </span>
                          {venta.compradorEmail && (
                            <span className="text-[10px] text-neutral-500">
                              {venta.compradorEmail}
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className="text-neutral-400 block text-[10px] uppercase font-mono text-neutral-500">
                            ID: {venta.armazonId.substring(0, 6).toUpperCase()}
                          </span>
                          <span className="font-bold text-white uppercase">
                            {venta.armazonNombre}
                          </span>
                        </td>
                        <td className="p-4 font-black text-white">
                          ${venta.monto.toLocaleString("es-MX")} MXN
                        </td>
                        <td className="p-4 pr-6 text-right space-y-1">
                          <span className="inline-block text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            {venta.estado}
                          </span>
                          {venta.mercadopagoPaymentId && (
                            <span className="block text-[9px] text-neutral-500 font-mono">
                              MP #{venta.mercadopagoPaymentId}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
