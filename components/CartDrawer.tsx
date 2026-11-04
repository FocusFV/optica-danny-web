"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { BUSINESS_INFO, buildWhatsAppLink } from "@/lib/constants";
import Link from "next/link";

export default function CartDrawer() {
  const {
    items,
    totalItems,
    totalPrecio,
    isCartOpen,
    setIsCartOpen,
    removerProducto,
    actualizarCantidad,
    vaciarCarrito,
  } = useCart();

  // Bloquear scroll del body cuando el drawer está abierto
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  // Mensaje formateado para comprar todo el carrito vía WhatsApp
  const mensajeWhatsApp = items.length > 0
    ? `¡Hola ${BUSINESS_INFO.name}! 👋 Quiero realizar un pedido con los siguientes armazones:\n\n` +
      items
        .map(
          (item, idx) =>
            `${idx + 1}. *${item.nombre}* x${item.cantidad} — $${(
              item.precio * item.cantidad
            ).toLocaleString("es-MX")} MXN`
        )
        .join("\n") +
      `\n\n💰 *Total estimado:* $${totalPrecio.toLocaleString("es-MX")} MXN` +
      `\n📍 Coordinar entrega en Mérida.`
    : "";

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          {/* Backdrop con blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Panel deslizante */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-[#001529] border-l border-white/10 text-white flex flex-col h-full z-10 shadow-2xl"
          >
            {/* Header del carrito */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#c5a059]/10 text-[#c5a059]">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider">Tu Carrito</h3>
                  <p className="text-[10px] text-neutral-400 font-medium">
                    {totalItems} {totalItems === 1 ? "modelo seleccionado" : "modelos seleccionados"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Cerrar carrito"
              >
                <X size={20} />
              </button>
            </div>

            {/* Lista de productos */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-neutral-500">
                    <ShoppingBag size={28} />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-300">
                    Tu carrito está vacío
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-xs mt-1">
                    Explorá nuestra colección exclusiva y seleccioná tus armazones favoritos.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 px-6 py-3 rounded-full bg-[#c5a059] text-black font-black text-[10px] uppercase tracking-widest hover:bg-[#dfba75] transition-all"
                  >
                    Ver Catálogo
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3.5 bg-[#021120] border border-white/5 rounded-2xl items-center"
                  >
                    <div className="w-16 h-16 rounded-xl bg-black/40 border border-white/5 overflow-hidden flex items-center justify-center p-1.5 shrink-0">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold uppercase tracking-wide text-white truncate">
                        {item.nombre}
                      </h4>
                      <p className="text-xs text-[#c5a059] font-black mt-0.5">
                        ${(item.precio * item.cantidad).toLocaleString("es-MX")}{" "}
                        <span className="text-[9px] text-neutral-500">MXN</span>
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-300 text-xs"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-bold px-1.5 min-w-[20px] text-center">
                          {item.cantidad}
                        </span>
                        <button
                          onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                          className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-300 text-xs"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removerProducto(item.id)}
                      className="p-2 text-neutral-500 hover:text-rose-400 transition-colors"
                      title="Eliminar producto"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer con subtotal y llamada a la acción */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#021120] space-y-4">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                  <span className="text-neutral-400 font-bold">Total Estimado</span>
                  <span className="text-lg font-black text-[#c5a059]">
                    ${totalPrecio.toLocaleString("es-MX")}{" "}
                    <span className="text-[10px] text-neutral-500">MXN</span>
                  </span>
                </div>

                <div className="space-y-2">
                  <a
                    href={buildWhatsAppLink(mensajeWhatsApp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#c5a059] text-black font-black text-xs uppercase tracking-[0.2em] p-3.5 rounded-xl hover:bg-[#dfba75] transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Pedir por WhatsApp</span>
                    <ArrowRight size={16} />
                  </a>

                  <button
                    onClick={vaciarCarrito}
                    className="w-full text-center text-[10px] text-neutral-500 hover:text-rose-400 uppercase tracking-widest font-bold py-1 transition-colors"
                  >
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
