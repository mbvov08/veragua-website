"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatCOP } from "@/lib/exchangeRate";
import { nombreVariante, precioVariante, totalCarrito } from "@/lib/cart";
import { useCart } from "@/components/cart/CartContext";

export function CartIcon({ oscuro }: { oscuro: boolean }) {
  const t = useTranslations("cafe");
  const { carrito, quitar, cambiarCantidad } = useCart();
  const [abierto, setAbierto] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  const totalCOP = totalCarrito(carrito);

  useEffect(() => {
    function alHacerClicAfuera(evento: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(evento.target as Node)) {
        setAbierto(false);
      }
    }
    document.addEventListener("mousedown", alHacerClicAfuera);
    return () => document.removeEventListener("mousedown", alHacerClicAfuera);
  }, []);

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-label={t("tuCarrito")}
        className={`relative flex h-9 w-9 items-center justify-center rounded-full transition ${
          oscuro ? "text-beige-100" : "text-verde-950"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          className="h-5 w-5"
          aria-hidden
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-tierra-500 text-[0.6rem] font-bold text-verde-950">
            {totalItems}
          </span>
        )}
      </button>

      {abierto && (
        <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-beige-400 bg-beige-100 p-5 text-left shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-verde-700">
            {t("tuCarrito")}
          </p>

          {carrito.length === 0 ? (
            <p className="mt-3 text-sm text-verde-700">{t("carritoVacio")}</p>
          ) : (
            <>
              <ul className="mt-3 max-h-64 space-y-3 overflow-y-auto">
                {carrito.map((item) => (
                  <li key={item.varianteId} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm text-verde-950">
                        {nombreVariante(item.varianteId)}
                      </p>
                      <p className="text-xs text-verde-700">
                        {formatCOP(precioVariante(item.varianteId))} × {item.cantidad}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => cambiarCantidad(item.varianteId, -1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-verde-950 text-xs text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
                        aria-label={t("restar")}
                      >
                        −
                      </button>
                      <span className="w-4 text-center text-xs text-verde-950">
                        {item.cantidad}
                      </span>
                      <button
                        type="button"
                        onClick={() => cambiarCantidad(item.varianteId, 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-verde-950 text-xs text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
                        aria-label={t("sumar")}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => quitar(item.varianteId)}
                        className="ml-1 text-[0.65rem] font-medium text-tierra-600 underline-offset-2 hover:underline"
                      >
                        {t("quitar")}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between border-t border-beige-400 pt-3">
                <span className="text-sm font-semibold text-verde-950">{formatCOP(totalCOP)}</span>
                <Link
                  href="/catalogo/cafe#comprar"
                  onClick={() => setAbierto(false)}
                  className="rounded-full bg-tierra-500 px-4 py-1.5 text-xs font-semibold text-verde-950 transition hover:bg-tierra-400"
                >
                  {t("irAPagar")}
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
