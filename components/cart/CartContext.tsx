"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import type { CartItem } from "@/lib/cart";

const STORAGE_KEY = "veragua-carrito-cafe";
const SNAPSHOT_VACIO: CartItem[] = [];

// Carrito en memoria del navegador (localStorage) — no hay base de datos en
// este proyecto, así que el carrito solo vive en el dispositivo del cliente
// hasta que paga (momento en el que su contenido queda codificado en la
// referencia de Wompi, ver lib/cart.ts).
//
// Se implementa como un "store" externo (useSyncExternalStore) en vez de
// useState + useEffect: así React sabe usar SIEMPRE el snapshot vacío
// durante el render en el servidor y la primera pasada de hidratación en el
// cliente (evitando el mismatch de hidratación), y recién después sincroniza
// con lo que haya guardado en localStorage — sin necesidad de un setState
// dentro de un efecto (que además dispara una regla de lint del proyecto).
let carritoActual: CartItem[] = SNAPSHOT_VACIO;
const listeners = new Set<() => void>();

function leerDeStorage(): CartItem[] {
  if (typeof window === "undefined") return SNAPSHOT_VACIO;
  try {
    const guardado = window.localStorage.getItem(STORAGE_KEY);
    return guardado ? JSON.parse(guardado) : SNAPSHOT_VACIO;
  } catch {
    return SNAPSHOT_VACIO;
  }
}

function actualizarCarrito(actualizar: (actual: CartItem[]) => CartItem[]) {
  carritoActual = actualizar(carritoActual);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(carritoActual));
  } catch {
    /* localStorage no disponible (modo privado, etc.) — el carrito sigue funcionando en memoria. */
  }
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    // Primera suscripción en el cliente: sincroniza con lo que haya guardado.
    carritoActual = leerDeStorage();
  }
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return carritoActual;
}

function getServerSnapshot() {
  return SNAPSHOT_VACIO;
}

function agregarItem(varianteId: string, cantidad: number) {
  actualizarCarrito((actual) => {
    const existente = actual.find((item) => item.varianteId === varianteId);
    if (existente) {
      return actual.map((item) =>
        item.varianteId === varianteId ? { ...item, cantidad: item.cantidad + cantidad } : item
      );
    }
    return [...actual, { varianteId, cantidad }];
  });
}

function quitarItem(varianteId: string) {
  actualizarCarrito((actual) => actual.filter((item) => item.varianteId !== varianteId));
}

function cambiarCantidadItem(varianteId: string, delta: number) {
  actualizarCarrito((actual) =>
    actual
      .map((item) =>
        item.varianteId === varianteId ? { ...item, cantidad: item.cantidad + delta } : item
      )
      .filter((item) => item.cantidad > 0)
  );
}

function vaciarCarrito() {
  actualizarCarrito(() => SNAPSHOT_VACIO);
}

type CartContextValue = {
  carrito: CartItem[];
  agregar: (varianteId: string, cantidad: number) => void;
  quitar: (varianteId: string) => void;
  cambiarCantidad: (varianteId: string, delta: number) => void;
  vaciar: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const carrito = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregar: agregarItem,
        quitar: quitarItem,
        cambiarCantidad: cambiarCantidadItem,
        vaciar: vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return context;
}
