const FALLBACK_USD_TO_COP = 4000;

type ExchangeRateApiResponse = {
  rates?: Record<string, number>;
};

export async function getUsdToCopRate(): Promise<number> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK_USD_TO_COP;

    const data: ExchangeRateApiResponse = await res.json();
    const rate = data.rates?.COP;
    return typeof rate === "number" && rate > 0 ? rate : FALLBACK_USD_TO_COP;
  } catch {
    return FALLBACK_USD_TO_COP;
  }
}

export function convertCopToUsd(precioCOP: number, tasa: number): number {
  return precioCOP / tasa;
}

export function formatCOP(valor: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);
}

export function formatUSD(valor: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(valor);
}
