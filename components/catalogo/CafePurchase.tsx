"use client";

import { useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Product } from "@/lib/products";
import { formatCOP } from "@/lib/exchangeRate";
import { getPathname } from "@/i18n/navigation";
import { countries } from "@/lib/countries";
import { codificarReferencia, totalCarrito, type CartItem } from "@/lib/cart";
import { PriceCOPUSD } from "@/components/catalogo/PriceCOPUSD";
import { WompiCheckout, type ShippingAddress } from "@/components/catalogo/WompiCheckout";

const direccionInicial: ShippingAddress = {
  nombre: "",
  telefono: "",
  direccion: "",
  ciudad: "",
  region: "",
  pais: "CO",
};

export function CafePurchase({ product }: { product: Product }) {
  const t = useTranslations("cafe");
  const locale = useLocale();
  const [varianteId, setVarianteId] = useState(product.variantes[0].id);
  const [cantidad, setCantidad] = useState(1);
  const [carrito, setCarrito] = useState<CartItem[]>([]);
  const [envio, setEnvio] = useState<ShippingAddress>(direccionInicial);
  const sessionId = useId();

  const totalCOP = totalCarrito(carrito);
  const reference = codificarReferencia(sessionId, carrito);

  const envioCompleto =
    envio.nombre.trim() !== "" &&
    envio.telefono.trim() !== "" &&
    envio.direccion.trim() !== "" &&
    envio.ciudad.trim() !== "" &&
    envio.region.trim() !== "";

  function actualizarCampo<K extends keyof ShippingAddress>(campo: K, valor: ShippingAddress[K]) {
    setEnvio((actual) => ({ ...actual, [campo]: valor }));
  }

  function agregarAlCarrito() {
    setCarrito((actual) => {
      const existente = actual.find((item) => item.varianteId === varianteId);
      if (existente) {
        return actual.map((item) =>
          item.varianteId === varianteId ? { ...item, cantidad: item.cantidad + cantidad } : item
        );
      }
      return [...actual, { varianteId, cantidad }];
    });
    setCantidad(1);
  }

  function quitarDelCarrito(id: string) {
    setCarrito((actual) => actual.filter((item) => item.varianteId !== id));
  }

  function cambiarCantidadCarrito(id: string, delta: number) {
    setCarrito((actual) =>
      actual
        .map((item) =>
          item.varianteId === id ? { ...item, cantidad: item.cantidad + delta } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  return (
    <div className="rounded-3xl border border-beige-400 bg-beige-100 p-8">
      <label
        htmlFor="cafe-presentacion"
        className="block text-xs font-medium uppercase tracking-wide text-verde-700"
      >
        {t("presentacion")}
      </label>
      <select
        id="cafe-presentacion"
        value={varianteId}
        onChange={(e) => setVarianteId(e.target.value)}
        className="mt-2 w-full rounded-full border border-beige-400 bg-beige-100 px-4 py-2 text-sm text-verde-950"
      >
        {product.variantes.map((v) => (
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

      <div className="mt-6 border-t border-beige-400 pt-6">
        <p className="text-xs font-medium uppercase tracking-wide text-verde-700">
          {t("tuCarrito")}
        </p>

        {carrito.length === 0 ? (
          <p className="mt-3 text-sm text-verde-700">{t("carritoVacio")}</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {carrito.map((item) => {
              const variante = product.variantes.find((v) => v.id === item.varianteId)!;
              return (
                <li key={item.varianteId} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-verde-950">{variante.nombre}</p>
                    <p className="text-xs text-verde-700">
                      {formatCOP(variante.precioCOP)} × {item.cantidad}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => cambiarCantidadCarrito(item.varianteId, -1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-verde-950 text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
                      aria-label={t("restar")}
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm text-verde-950">
                      {item.cantidad}
                    </span>
                    <button
                      type="button"
                      onClick={() => cambiarCantidadCarrito(item.varianteId, 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-verde-950 text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
                      aria-label={t("sumar")}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => quitarDelCarrito(item.varianteId)}
                      className="ml-1 text-xs font-medium text-tierra-600 underline-offset-2 hover:underline"
                    >
                      {t("quitar")}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="mt-6 border-t border-beige-400 pt-6">
        <PriceCOPUSD precioCOP={totalCOP} />
        <p className="mt-2 text-xs text-tierra-600">{t("envioGratis")}</p>
      </div>

      <div className="mt-8 border-t border-beige-400 pt-6">
        <p className="text-xs font-medium uppercase tracking-wide text-verde-700">
          {t("datosEnvio")}
        </p>
        <p className="mt-1 text-xs text-verde-700">{t("avisoCiudades")}</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="envio-nombre" className="block text-xs font-medium text-verde-700">
              {t("nombreCompleto")}
            </label>
            <input
              id="envio-nombre"
              type="text"
              value={envio.nombre}
              onChange={(e) => actualizarCampo("nombre", e.target.value)}
              className="mt-1 w-full rounded-full border border-beige-400 bg-beige-100 px-4 py-2 text-sm text-verde-950"
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="envio-telefono" className="block text-xs font-medium text-verde-700">
              {t("telefono")}
            </label>
            <input
              id="envio-telefono"
              type="tel"
              value={envio.telefono}
              onChange={(e) => actualizarCampo("telefono", e.target.value)}
              className="mt-1 w-full rounded-full border border-beige-400 bg-beige-100 px-4 py-2 text-sm text-verde-950"
              autoComplete="tel"
              placeholder="3001234567"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="envio-direccion" className="block text-xs font-medium text-verde-700">
              {t("direccion")}
            </label>
            <input
              id="envio-direccion"
              type="text"
              value={envio.direccion}
              onChange={(e) => actualizarCampo("direccion", e.target.value)}
              className="mt-1 w-full rounded-full border border-beige-400 bg-beige-100 px-4 py-2 text-sm text-verde-950"
              autoComplete="street-address"
              placeholder={t("direccionPlaceholder")}
            />
          </div>

          <div>
            <label htmlFor="envio-ciudad" className="block text-xs font-medium text-verde-700">
              {t("ciudad")}
            </label>
            <input
              id="envio-ciudad"
              type="text"
              value={envio.ciudad}
              onChange={(e) => actualizarCampo("ciudad", e.target.value)}
              className="mt-1 w-full rounded-full border border-beige-400 bg-beige-100 px-4 py-2 text-sm text-verde-950"
              autoComplete="address-level2"
              placeholder={t("ciudadPlaceholder")}
            />
          </div>

          <div>
            <label htmlFor="envio-region" className="block text-xs font-medium text-verde-700">
              {t("region")}
            </label>
            <input
              id="envio-region"
              type="text"
              value={envio.region}
              onChange={(e) => actualizarCampo("region", e.target.value)}
              className="mt-1 w-full rounded-full border border-beige-400 bg-beige-100 px-4 py-2 text-sm text-verde-950"
              autoComplete="address-level1"
              placeholder={t("regionPlaceholder")}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="envio-pais" className="block text-xs font-medium text-verde-700">
              {t("pais")}
            </label>
            <select
              id="envio-pais"
              value={envio.pais}
              onChange={(e) => actualizarCampo("pais", e.target.value)}
              className="mt-1 w-full rounded-full border border-beige-400 bg-beige-100 px-4 py-2 text-sm text-verde-950"
              autoComplete="country"
            >
              {countries.map((pais) => (
                <option key={pais.code} value={pais.code}>
                  {pais.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {carrito.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-tierra-500 bg-beige-200 p-4 text-sm text-verde-800">
            {t("carritoVacio")}
          </p>
        ) : envioCompleto ? (
          <WompiCheckout
            amountInCents={totalCOP * 100}
            reference={reference}
            redirectUrl={getPathname({ href: "/catalogo/cafe/gracias", locale })}
            shippingAddress={envio}
          />
        ) : (
          <p className="rounded-2xl border border-dashed border-tierra-500 bg-beige-200 p-4 text-sm text-verde-800">
            {t("completarEnvio")}
          </p>
        )}

        <div className="mt-4 flex items-start gap-2 rounded-2xl bg-beige-200 p-4">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            className="mt-0.5 h-5 w-5 shrink-0 text-verde-700"
            aria-hidden
          >
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-verde-900">{t("pagoSeguro")}</p>
            <p className="mt-0.5 text-xs text-verde-700">{t("pagoSeguroDetalle")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
