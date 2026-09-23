"use client";

import { useEffect, useState } from "react";
import { convertCopToUsd, formatCOP, formatUSD } from "@/lib/exchangeRate";

type PriceCOPUSDProps = {
  precioCOP: number;
  className?: string;
};

export function PriceCOPUSD({ precioCOP, className = "" }: PriceCOPUSDProps) {
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

  return (
    <div className={className}>
      <p className="font-heading text-2xl text-verde-950">{formatCOP(precioCOP)}</p>
      {usdRate && (
        <p className="text-sm text-verde-700">
          ≈ {formatUSD(convertCopToUsd(precioCOP, usdRate))} USD
        </p>
      )}
    </div>
  );
}
