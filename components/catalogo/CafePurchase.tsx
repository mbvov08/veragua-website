"use client";

import { useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Product } from "@/lib/products";
import { formatCOP } from "@/lib/exchangeRate";
import { getPathname } from "@/i18n/navigation";
import { PriceCOPUSD } from "@/components/catalogo/PriceCOPUSD";
import { WompiCheckout, type ShippingAddress } from "@/components/catalogo/WompiCheckout";

const CIUDADES_ENTREGA = ["Armenia", "Pereira", "Manizales"] as const;

const direccionInicial: ShippingAddress = {
  nombre: "",
  telefono: "",
  direccion: "",
  ciudad: CIUDADES_ENTREGA[0],
  region: "Quindío",
  pais: "CO",
};

export function CafePurchase({ product }: { product: Product }) {
  const t = useTranslations("cafe");
  const locale = useLocale();
  const [varianteId, setVarianteId] = useState(product.variantes[0].id);
  const [cantidad, setCantidad] = useState(1);
  const [envio, setEnvio] = useState<ShippingAddress>(direccionInicial);
  const sessionId = useId();

  const variante = product.variantes.find((v) => v.id === varianteId) ?? product.variantes[0];
  const totalCOP = variante.precioCOP * cantidad;
  // Única por sesión de checkout (identidad del componente), variante y cantidad seleccionadas.
  const reference = `veragua-cafe-${sessionId.replace(/[^a-zA-Z0-9]/g, "")}-${varianteId}-${cantidad}`;

  const envioCompleto =
    envio.nombre.trim() !== "" &&
    envio.telefono.trim() !== "" &&
    envio.direccion.trim() !== "";

  function actualizarCampo<K extends keyof ShippingAddress>(campo: K, valor: ShippingAddress[K]) {
    setEnvio((actual) => ({ ...actual, [campo]: valor }));
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
            <select
              id="envio-ciudad"
              value={envio.ciudad}
              onChange={(e) => actualizarCampo("ciudad", e.target.value)}
              className="mt-1 w-full rounded-full border border-beige-400 bg-beige-100 px-4 py-2 text-sm text-verde-950"
            >
              {CIUDADES_ENTREGA.map((ciudad) => (
                <option key={ciudad} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {envioCompleto ? (
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
      </div>
    </div>
  );
}
