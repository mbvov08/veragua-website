import { products } from "@/lib/products";

export type CartItem = {
  varianteId: string;
  cantidad: number;
};

const cafe = products.find((p) => p.slug === "cafe-de-origen")!;

export function precioVariante(varianteId: string): number {
  return cafe.variantes.find((v) => v.id === varianteId)?.precioCOP ?? 0;
}

export function nombreVariante(varianteId: string): string {
  return cafe.variantes.find((v) => v.id === varianteId)?.nombre ?? varianteId;
}

export function cantidadTotalCarrito(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.cantidad, 0);
}

// Descuento por volumen sobre el total de unidades de café en el carrito
// (sin importar si son molido o grano): 2 unidades, 5%; 3 o más, 10%.
export function descuentoPorCantidad(cantidadTotal: number): number {
  if (cantidadTotal >= 3) return 0.1;
  if (cantidadTotal >= 2) return 0.05;
  return 0;
}

export function subtotalCarrito(items: CartItem[]): number {
  return items.reduce((total, item) => total + precioVariante(item.varianteId) * item.cantidad, 0);
}

export function totalCarrito(items: CartItem[]): number {
  const subtotal = subtotalCarrito(items);
  const descuento = descuentoPorCantidad(cantidadTotalCarrito(items));
  return Math.round(subtotal * (1 - descuento));
}

// Codifica el carrito dentro de la referencia de Wompi (no hay base de datos:
// esta es la única forma de que el webhook, más adelante, sepa qué se pidió
// exactamente — Wompi nos devuelve la misma referencia en su evento). Formato:
// veragua-cafe-{sessionId}::{varianteId}:{cantidad}|{varianteId2}:{cantidad2}
export function codificarReferencia(sessionId: string, items: CartItem[]): string {
  const idSeguro = sessionId.replace(/[^a-zA-Z0-9]/g, "");
  const carrito = items.map((i) => `${i.varianteId}:${i.cantidad}`).join("|");
  return `veragua-cafe-${idSeguro}::${carrito}`;
}

// Reconstruye los ítems del carrito a partir de una referencia generada por
// codificarReferencia. Devuelve null si la referencia no tiene ese formato
// (por ejemplo, alguna referencia antigua de antes del carrito).
export function decodificarReferencia(
  reference: string
): { varianteId: string; nombre: string; cantidad: number; precioCOP: number }[] | null {
  const separador = reference.indexOf("::");
  if (separador === -1) return null;

  const carrito = reference.slice(separador + 2);
  const items = carrito
    .split("|")
    .map((par) => {
      const [varianteId, cantidadStr] = par.split(":");
      const cantidad = Number(cantidadStr);
      if (!varianteId || !Number.isFinite(cantidad)) return null;
      return {
        varianteId,
        nombre: nombreVariante(varianteId),
        cantidad,
        precioCOP: precioVariante(varianteId),
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return items.length > 0 ? items : null;
}
