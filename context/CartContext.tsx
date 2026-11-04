"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrecio: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  agregarProducto: (
    producto: { id: string; nombre: string; precio: number; imagen: string },
    cantidad?: number
  ) => void;
  removerProducto: (id: string) => void;
  actualizarCantidad: (id: string, cantidad: number) => void;
  vaciarCarrito: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "optica_danny_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carga inicial desde localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error al cargar carrito desde localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Guardado automático en localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Error al persistir carrito:", e);
    }
  }, [items, isLoaded]);

  const agregarProducto = (
    producto: { id: string; nombre: string; precio: number; imagen: string },
    cantidad = 1
  ) => {
    setItems((prev) => {
      const index = prev.findIndex((item) => item.id === producto.id);
      if (index >= 0) {
        const actualizados = [...prev];
        actualizados[index] = {
          ...actualizados[index],
          cantidad: actualizados[index].cantidad + cantidad,
        };
        return actualizados;
      }
      return [...prev, { ...producto, cantidad }];
    });
    // Opcionalmente abrir el drawer para dar feedback
    setIsCartOpen(true);
  };

  const removerProducto = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const actualizarCantidad = (id: string, cantidad: number) => {
    if (cantidad <= 0) {
      removerProducto(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad } : item))
    );
  };

  const vaciarCarrito = () => {
    setItems([]);
  };

  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrecio,
        isCartOpen,
        setIsCartOpen,
        agregarProducto,
        removerProducto,
        actualizarCantidad,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}
