"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { convertCopToUsd, formatCOP, formatUSD } from "@/lib/exchangeRate";

type PriceCOPUSDProps = {
  precioCOP: number;
  className?: string;
};

export function PriceCOPUSD({ precioCOP, className = "" }: PriceCOPUSDProps) {
  const locale = useLocale();
  const [usdRate, setUsdRate] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/exchange-rate")
      .then((res) => res.json())
      .then((data: { usdToCop: number }) => {
        if (active) setUsdRate(data.usdToCop);
      })
      .catch(() => {
        /* Si falla, solo se muestra el precio en COP. */
      });
    return () => {
      active = false;
    };
  }, []);

  const usd = usdRate ? formatUSD(convertCopToUsd(precioCOP, usdRate)) : null;
  const cop = formatCOP(precioCOP);

  // En inglés el dólar es la moneda principal (grande); en español, el peso
  // colombiano — el pago real siempre se procesa en COP sin importar cuál se
  // muestre más grande, esto es solo para que el precio "hable" en la moneda
  // que el visitante espera ver primero.
  if (locale === "en" && usd) {
    return (
      <div className={className}>
        <p className="font-heading text-2xl text-verde-950">{usd} USD</p>
        <p className="text-sm text-verde-700">≈ {cop}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-heading text-2xl text-verde-950">{cop}</p>
      {usd && <p className="text-sm text-verde-700">≈ {usd} USD</p>}
    </div>
  );
}
