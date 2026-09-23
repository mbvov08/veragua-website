"use client";

import { useEffect, useRef } from "react";

type WompiCheckoutProps = {
  amountInCents: number;
  reference: string;
  redirectUrl: string;
};

// Widget embebido oficial de Wompi (https://checkout.wompi.co/widget.js).
// Requiere la llave pública en NEXT_PUBLIC_WOMPI_PUBLIC_KEY.
export function WompiCheckout({ amountInCents, reference, redirectUrl }: WompiCheckoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY;

  useEffect(() => {
    if (!containerRef.current || !publicKey) return;

    containerRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://checkout.wompi.co/widget.js";
    script.setAttribute("data-render", "button");
    script.setAttribute("data-public-key", publicKey);
    script.setAttribute("data-currency", "COP");
    script.setAttribute("data-amount-in-cents", String(amountInCents));
    script.setAttribute("data-reference", reference);
    script.setAttribute("data-redirect-url", redirectUrl);
    containerRef.current.appendChild(script);
  }, [amountInCents, reference, redirectUrl, publicKey]);

  if (!publicKey) {
    return (
      <div className="rounded-2xl border border-dashed border-tierra-500 bg-beige-200 p-6 text-sm text-verde-800">
        El checkout de Wompi se activará al configurar la llave pública en la
        variable de entorno <code>NEXT_PUBLIC_WOMPI_PUBLIC_KEY</code>.
      </div>
    );
  }

  return <div ref={containerRef} />;
}
