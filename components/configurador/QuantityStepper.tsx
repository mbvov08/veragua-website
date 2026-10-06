"use client";

type QuantityStepperProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (valor: number) => void;
  restarLabel: string;
  sumarLabel: string;
};

// Selector de cantidad con botones + / −, igual al de la tarjeta de compra
// del café. Deja claro de un vistazo que el valor se puede cambiar — un
// <input type="number"> a mano es menos obvio, sobre todo en celular.
export function QuantityStepper({
  label,
  value,
  min,
  max,
  onChange,
  restarLabel,
  sumarLabel,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs font-medium uppercase tracking-wide text-verde-700">{label}</span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-verde-950 text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
          aria-label={restarLabel}
        >
          −
        </button>
        <span className="w-6 text-center font-heading text-lg text-verde-950">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-verde-950 text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
          aria-label={sumarLabel}
        >
          +
        </button>
      </div>
    </div>
  );
}
