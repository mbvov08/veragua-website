"use client";

import { useId, useState } from "react";
import type { Product } from "@/lib/products";
import { PriceCOPUSD } from "@/components/catalogo/PriceCOPUSD";
import { WompiCheckout } from "@/components/catalogo/WompiCheckout";

export function CafePurchase({ product }: { product: Product }) {
  const [cantidad, setCantidad] = useState(1);
  const sessionId = useId();

  const totalCOP = product.precioCOP * cantidad;
  // Única por sesión de checkout (identidad del componente) y cantidad seleccionada.
  const reference = `veragua-cafe-${sessionId.replace(/[^a-zA-Z0-9]/g, "")}-${cantidad}`;

  return (
    <div className="rounded-3xl border border-beige-400 bg-beige-100 p-8">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-verde-800">Cantidad</span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setCantidad((c) => Math.max(1, c - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-verde-950 text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
            aria-label="Restar unidad"
          >
            −
          </button>
          <span className="w-6 text-center font-heading text-lg text-verde-950">{cantidad}</span>
          <button
            type="button"
            onClick={() => setCantidad((c) => c + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-verde-950 text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
            aria-label="Sumar unidad"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-6 border-t border-beige-400 pt-6">
        <PriceCOPUSD precioCOP={totalCOP} />
      </div>

      <div className="mt-8">
        <WompiCheckout
          amountInCents={totalCOP * 100}
          reference={reference}
          redirectUrl="https://veragua.co/catalogo/cafe/gracias"
        />
      </div>
    </div>
  );
}
