"use client";

import { useTranslations } from "next-intl";
import { useCart } from "@/components/cart/CartContext";

export function CartIcon({ oscuro }: { oscuro: boolean }) {
  const t = useTranslations("cafe");
  const { carrito, abrir } = useCart();

  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <button
      type="button"
      onClick={abrir}
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
  );
}
