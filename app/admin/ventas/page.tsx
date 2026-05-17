"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Venta {
  id: string;
  armazonId: string;
  armazonNombre: string;
  comprador: string;
  monto: number;
  fecha: string;
  estado: string;
}

export default function AdminVentasPage() {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarVentas = async () => {
      try {
        const res = await fetch("/api/admin/ventas");
        if (res.ok) {
          const data = await res.json();
          setVentas(data);
        }
      } catch (err) {
        console.error("Error cargando historial de ventas:", err);
      } finally {
        setCargando(false);
      }
    };

    cargarVentas();
  }, []);

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#001424] flex flex-col justify-center items-center text-white">
        <div className="w-10 h-10 border-2 border-t-[#c5a059] border-white/10 rounded-full animate-spin"></div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] mt-4 font-bold">Cargando Historial...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000e1a] text-white p-4 md:p-8 selection:bg-[#c5a059] selection:text-black">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER PANEL */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <span className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.4em] block mb-1">Control de Operaciones</span>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Historial de Ventas</h1>
          </div>
          <Link href="/admin/productos" className="text-xs text-neutral-400 hover:text-[#c5a059] uppercase tracking-widest transition-colors font-bold border border-white/10 px-4 py-2 rounded-xl bg-white/5">
            Volver a Productos →
          </Link>
        </div>

        {/* TABLA LUXURY */}
        {ventas.length === 0 ? (
          <div className="bg-[#031627]/30 border border-white/5 rounded-2xl p-12 text-center backdrop-blur-sm">
            <p className="text-sm text-neutral-400 uppercase tracking-wider font-bold">No se registraron ventas en la plataforma todavía.</p>
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
                    <th className="p-4 pr-6 text-right">Estado</th>
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
                        <td className="p-4 font-bold text-white uppercase">{venta.comprador}</td>
                        <td className="p-4">
                          <span className="text-neutral-400 block text-[10px] uppercase font-mono text-neutral-500">ID: {venta.armazonId.substring(0,6).toUpperCase()}</span>
                          <span className="font-bold text-white uppercase">{venta.armazonNombre}</span>
                        </td>
                        <td className="p-4 font-black text-white">${venta.monto.toLocaleString("es-MX")} MXN</td>
                        <td className="p-4 pr-6 text-right">
                          <span className="inline-block text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            {venta.estado}
                          </span>
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