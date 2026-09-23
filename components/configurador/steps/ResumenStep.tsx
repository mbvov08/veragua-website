import { StepShell } from "@/components/configurador/StepShell";
import { formatCOP } from "@/lib/exchangeRate";
import type { RespuestasEncuesta } from "@/lib/configurador/types";
import { calcularPlanPersonalizado } from "@/lib/configurador/calculoPlan";
import { buildPlanPersonalizadoLink } from "@/lib/configurador/whatsappPlan";

export function ResumenStep({ respuestas }: { respuestas: RespuestasEncuesta }) {
  const { componentes, precioIndividualCOP, precioConDescuentoCOP, ahorroCOP, descuentoPorcentaje } =
    calcularPlanPersonalizado(respuestas);

  return (
    <StepShell kicker="Tu plan" titulo="Tu Plan Personalizado" subtitulo="Esto es lo que calculamos para tu hogar.">
      <div className="rounded-3xl border border-tierra-500 bg-verde-950 p-8 text-beige-100">
        <ul className="space-y-3 text-sm">
          {componentes.map((c) => (
            <li key={c.nombre} className="flex justify-between gap-4">
              <span>{c.nombre}</span>
              <span className="font-medium text-beige-100">×{c.cantidadPorMes}/mes</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-beige-300/30 pt-6">
          <p className="text-sm text-beige-300 line-through">{formatCOP(precioIndividualCOP)}</p>
          <p className="font-heading text-2xl">{formatCOP(precioConDescuentoCOP)}</p>
          <p className="mt-1 text-sm font-semibold text-tierra-300">
            Ahorras {formatCOP(ahorroCOP)} ({descuentoPorcentaje}% de descuento) cada mes
          </p>
        </div>

        <div className="mt-6 text-sm text-beige-300">
          <p>Ciudad de entrega: {respuestas.ciudadEntrega}</p>
          <p>Día de entrega: {respuestas.diaEntrega}</p>
        </div>

        <a
          href={buildPlanPersonalizadoLink(respuestas)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-tierra-500 px-6 py-4 text-sm font-semibold text-verde-950 transition hover:bg-tierra-400"
        >
          Confirmar y pagar el primer mes por WhatsApp
        </a>
      </div>

      <p className="mt-4 text-xs text-verde-700">
        Pago manual cada mes para renovar tu suscripción: no guardamos tu tarjeta ni
        hacemos cobros automáticos.
      </p>
    </StepShell>
  );
}
