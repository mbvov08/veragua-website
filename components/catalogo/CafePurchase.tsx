"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Product } from "@/lib/products";
import { formatCOP } from "@/lib/exchangeRate";
import { useCart } from "@/components/cart/CartContext";
import { trackMetaEvent } from "@/lib/metaPixel";

// Esta tarjeta solo elige presentación/cantidad y agrega al carrito — los
// datos de envío y el pago viven en el carrito (CartDrawer), que se abre
// desde el ícono del navbar cuando la persona ya revisó toda la página y
// está lista para comprar.
export function CafePurchase({ product }: { product: Product }) {
  const t = useTranslations("cafe");
  const variantesActivas = product.variantes.filter((v) => v.activa !== false);
  const [varianteId, setVarianteId] = useState(variantesActivas[0].id);
  const [cantidad, setCantidad] = useState(1);
  const { carrito, agregar, abrir } = useCart();
  const [agregado, setAgregado] = useState(false);

  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  function agregarAlCarrito() {
    agregar(varianteId, cantidad);
    const variante = variantesActivas.find((v) => v.id === varianteId);
    if (variante) {
      trackMetaEvent("AddToCart", {
        content_name: variante.nombre,
        content_type: "product",
        value: variante.precioCOP * cantidad,
        currency: "COP",
      });
    }
    setCantidad(1);
    setAgregado(true);
  }

  return (
    <div className="rounded-3xl border border-beige-400 bg-beige-100 p-8">
      <label
        htmlFor="cafe-presentacion"
        className="block text-xs font-medium uppercase tracking-wide text-verde-700"
      >
        {t("molienda")}
      </label>
      <select
        id="cafe-presentacion"
        value={varianteId}
        onChange={(e) => setVarianteId(e.target.value)}
        className="mt-2 w-full rounded-full border border-beige-400 bg-beige-100 px-4 py-2 text-sm text-verde-950"
      >
        {variantesActivas.map((v) => (
          <option key={v.id} value={v.id}>
            {v.nombre} — {formatCOP(v.precioCOP)}
          </option>
        ))}
      </select>

      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-verde-800">{t("cantidad")}</span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setCantidad((c) => Math.max(1, c - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-verde-950 text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
            aria-label={t("restar")}
          >
            −
          </button>
          <span className="w-6 text-center font-heading text-lg text-verde-950">{cantidad}</span>
          <button
            type="button"
            onClick={() => setCantidad((c) => c + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-verde-950 text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
            aria-label={t("sumar")}
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={agregarAlCarrito}
        className="mt-4 w-full rounded-full border-2 border-verde-950 px-6 py-2.5 text-sm font-semibold text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
      >
        {t("agregarCarrito")}
      </button>

      <p className="mt-3 text-center text-xs text-tierra-600">{t("envioGratis")}</p>

      {agregado && totalItems > 0 && (
        <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-beige-200 p-4">
          <p className="text-sm text-verde-800">{t("agregadoAlCarrito", { cantidad: totalItems })}</p>
          <button
            type="button"
            onClick={abrir}
            className="shrink-0 rounded-full bg-tierra-500 px-5 py-2 text-xs font-semibold text-verde-950 transition hover:bg-tierra-400"
          >
            {t("irAPagar")}
          </button>
        </div>
      )}
    </div>
  );
}
