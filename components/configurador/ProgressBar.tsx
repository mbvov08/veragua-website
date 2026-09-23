type ProgressBarProps = {
  pasoActual: number;
  totalPasos: number;
};

export function ProgressBar({ pasoActual, totalPasos }: ProgressBarProps) {
  const porcentaje = ((pasoActual + 1) / totalPasos) * 100;

  return (
    <div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-beige-300">
        <div
          className="h-full rounded-full bg-tierra-500 transition-all duration-500"
          style={{ width: `${porcentaje}%` }}
        />
      </div>
      <p className="mt-2 text-xs uppercase tracking-wide text-verde-700">
        Paso {pasoActual + 1} de {totalPasos}
      </p>
    </div>
  );
}
