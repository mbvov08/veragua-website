"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export type ShippingAddress = {
  nombre: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  region: string;
  pais: string; // ISO 3166-1 Alpha-2, ej. "CO"
};

type WompiCheckoutProps = {
  amountInCents: number;
  reference: string;
  /** Ruta relativa (ej. "/catalogo/cafe/gracias") a la que Wompi redirige tras el pago; se resuelve contra el origen actual. */
  redirectUrl: string;
  shippingAddress: ShippingAddress;
};

// Widget embebido oficial de Wompi (https://checkout.wompi.co/widget.js).
// Requiere la llave pública en NEXT_PUBLIC_WOMPI_PUBLIC_KEY. La firma de
// integridad se calcula en el servidor (ver app/api/wompi-signature) para no
// exponer el secreto en el navegador. La dirección de envío viaja pegada a la
// transacción — Wompi la entrega de vuelta en el webhook cuando el pago se
// aprueba, así no necesitamos guardar nada antes de que el pago se confirme.
export function WompiCheckout({
  amountInCents,
  reference,
  redirectUrl,
  shippingAddress,
}: WompiCheckoutProps) {
  const t = useTranslations("cafe");
  const containerRef = useRef<HTMLDivElement>(null);
  const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !publicKey) return;
    let cancelado = false;

    async function montarWidget() {
      try {
        const res = await fetch("/api/wompi-signature", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference, amountInCents, currency: "COP" }),
        });
        if (!res.ok) throw new Error("No se pudo firmar la transacción");
        const { signature } = await res.json();

        if (cancelado || !containerRef.current) return;
        containerRef.current.innerHTML = "";

        const script = document.createElement("script");
        script.src = "https://checkout.wompi.co/widget.js";
        script.setAttribute("data-render", "button");
        script.setAttribute("data-public-key", publicKey!);
        script.setAttribute("data-currency", "COP");
        script.setAttribute("data-amount-in-cents", String(amountInCents));
        script.setAttribute("data-reference", reference);
        script.setAttribute("data-signature:integrity", signature);
        script.setAttribute("data-redirect-url", new URL(redirectUrl, window.location.origin).toString());
        script.setAttribute("data-shipping-address:address-line-1", shippingAddress.direccion);
        script.setAttribute("data-shipping-address:city", shippingAddress.ciudad);
        script.setAttribute("data-shipping-address:region", shippingAddress.region);
        script.setAttribute("data-shipping-address:country", shippingAddress.pais);
        script.setAttribute("data-shipping-address:phone-number", shippingAddress.telefono);
        script.setAttribute("data-shipping-address:name", shippingAddress.nombre);
        containerRef.current.appendChild(script);
      } catch {
        if (!cancelado) setError(true);
      }
    }

    montarWidget();
    return () => {
      cancelado = true;
    };
  }, [amountInCents, reference, redirectUrl, publicKey, shippingAddress]);

  if (!publicKey) {
    return (
      <div className="rounded-2xl border border-dashed border-tierra-500 bg-beige-200 p-6 text-sm text-verde-800">
        {t("checkoutNoDisponible")}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-dashed border-tierra-500 bg-beige-200 p-6 text-sm text-verde-800">
        {t("checkoutError")}
      </div>
    );
  }

  return <div ref={containerRef} />;
}
