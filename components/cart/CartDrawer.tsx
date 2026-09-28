"use client";

import { useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, getPathname } from "@/i18n/navigation";
import { colombiaDepartamentos } from "@/lib/colombiaDepartamentos";
import {
  cantidadTotalCarrito,
  codificarReferencia,
  descuentoPorCantidad,
  nombreVariante,
  precioVariante,
  subtotalCarrito,
  totalCarrito,
} from "@/lib/cart";
import { formatCOP } from "@/lib/exchangeRate";
import { useCart } from "@/components/cart/CartContext";
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

// Panel del carrito: se abre desde el ícono del navbar en cualquier página.
// Guarda acá los datos de envío y el pago, para que la persona pueda leer
// toda la página del café primero y solo vea este formulario cuando ya
// decidió comprar.
export function CartDrawer() {
  const t = useTranslations("cafe");
  const locale = useLocale();
  const { carrito, abierto, cerrar, quitar, cambiarCantidad } = useCart();
  const [envio, setEnvio] = useState<ShippingAddress>(direccionInicial);
  const sessionId = useId();

  const subtotalCOP = subtotalCarrito(carrito);
  const totalCOP = totalCarrito(carrito);
  const descuento = descuentoPorCantidad(cantidadTotalCarrito(carrito));
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

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label={t("cerrarCarrito")}
        onClick={cerrar}
        className="absolute inset-0 bg-verde-950/50"
      />

      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-beige-100 shadow-xl">
        <div className="flex items-center justify-between border-b border-beige-400 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-verde-700">
            {t("tuCarrito")}
          </p>
          <button
            type="button"
            onClick={cerrar}
            aria-label={t("cerrarCarrito")}
            className="flex h-8 w-8 items-center justify-center rounded-full text-verde-950 transition hover:bg-beige-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-5 w-5" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {carrito.length === 0 ? (
            <p className="text-sm text-verde-700">{t("carritoVacio")}</p>
          ) : (
            <>
              <ul className="space-y-3">
                {carrito.map((item) => (
                  <li key={item.varianteId} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm text-verde-950">
                        {nombreVariante(item.varianteId)}
                      </p>
                      <p className="text-xs text-verde-700">
                        {precioVariante(item.varianteId).toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        })}{" "}
                        × {item.cantidad}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => cambiarCantidad(item.varianteId, -1)}
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
                        onClick={() => cambiarCantidad(item.varianteId, 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-verde-950 text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
                        aria-label={t("sumar")}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => quitar(item.varianteId)}
                        className="ml-1 text-xs font-medium text-tierra-600 underline-offset-2 hover:underline"
                      >
                        {t("quitar")}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-beige-400 pt-6">
                {descuento > 0 && (
                  <div className="mb-3 space-y-1 text-sm">
                    <div className="flex justify-between text-verde-700">
                      <span>{t("subtotal")}</span>
                      <span>{formatCOP(subtotalCOP)}</span>
                    </div>
                    <div className="flex justify-between font-medium text-tierra-600">
                      <span>{t("descuentoAplicado", { porcentaje: descuento * 100 })}</span>
                      <span>−{formatCOP(subtotalCOP - totalCOP)}</span>
                    </div>
                  </div>
                )}
                <PriceCOPUSD precioCOP={totalCOP} />
                <p className="mt-2 text-xs text-tierra-600">{t("envioGratis")}</p>
                <p className="mt-1 text-xs text-verde-700">{t("descuentoPorCantidad")}</p>
                <p className="mt-1 text-xs text-verde-700">{t("tiempoEntrega")}</p>
              </div>

              <div className="mt-4 rounded-2xl border-l-4 border-tierra-500 bg-beige-200 p-4">
                <p className="text-sm text-verde-800">{t("envioContraEntrega")}</p>
              </div>

              <div className="mt-8 border-t border-beige-400 pt-6">
                <p className="text-xs font-medium uppercase tracking-wide text-verde-700">
                  {t("datosEnvio")}
                </p>
                <p className="mt-1 text-xs text-verde-700">{t("avisoCiudades")}</p>

                <div className="mt-4 grid gap-4">
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

                  <div>
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
                    <select
                      id="envio-region"
                      value={envio.region}
                      onChange={(e) => actualizarCampo("region", e.target.value)}
                      className="mt-1 w-full rounded-full border border-beige-400 bg-beige-100 px-4 py-2 text-sm text-verde-950"
                      autoComplete="address-level1"
                    >
                      <option value="" disabled>
                        {t("regionPlaceholder")}
                      </option>
                      {colombiaDepartamentos.map((departamento) => (
                        <option key={departamento} value={departamento}>
                          {departamento}
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

                <p className="mt-4 text-center text-xs text-verde-700">
                  <Link href="/cambios-y-devoluciones" onClick={cerrar} className="underline hover:text-verde-950">
                    {t("linkCambios")}
                  </Link>
                  {" · "}
                  <Link href="/politica-de-privacidad" onClick={cerrar} className="underline hover:text-verde-950">
                    {t("linkPrivacidad")}
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
