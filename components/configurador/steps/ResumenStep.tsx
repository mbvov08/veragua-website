"use client";

import { useTranslations } from "next-intl";
import { StepShell } from "@/components/configurador/StepShell";
import { formatCOP } from "@/lib/exchangeRate";
import { diaKeys, type RespuestasEncuesta } from "@/lib/configurador/types";
import { calcularPlanPersonalizado } from "@/lib/configurador/calculoPlan";
import { buildPlanPersonalizadoLink } from "@/lib/configurador/whatsappPlan";

export function ResumenStep({ respuestas }: { respuestas: RespuestasEncuesta }) {
  const t = useTranslations("configurador.resumen");
  const diaLabels = useTranslations("suscripciones").raw("dias") as string[];
  const diaIndex = diaKeys.indexOf(respuestas.diaEntrega);
  const { componentes, precioIndividualCOP, precioConDescuentoCOP, ahorroCOP, descuentoPorcentaje } =
    calcularPlanPersonalizado(respuestas);

  return (
    <StepShell kicker={t("kicker")} titulo={t("titulo")} subtitulo={t("subtitulo")}>
      <div className="rounded-3xl border border-tierra-500 bg-verde-950 p-8 text-beige-100">
        <ul className="space-y-3 text-sm">
          {componentes.map((c) => (
            <li key={c.nombre} className="flex justify-between gap-4">
              <span>{c.nombre}</span>
              <span className="font-medium text-beige-100">
                ×{c.cantidadPorMes}
                {t("porMes")}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-beige-300/30 pt-6">
          <p className="text-sm text-beige-300 line-through">{formatCOP(precioIndividualCOP)}</p>
          <p className="font-heading text-2xl">{formatCOP(precioConDescuentoCOP)}</p>
          <p className="mt-1 text-sm font-semibold text-tierra-300">
            {t("ahorras", { ahorro: formatCOP(ahorroCOP), porcentaje: descuentoPorcentaje })}
          </p>
        </div>

        <div className="mt-6 text-sm text-beige-300">
          <p>{t("ciudadEntrega", { ciudad: respuestas.ciudadEntrega })}</p>
          <p>{t("diaEntrega", { dia: diaLabels[diaIndex] })}</p>
        </div>

        <a
          href={buildPlanPersonalizadoLink(respuestas)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-tierra-500 px-6 py-4 text-sm font-semibold text-verde-950 transition hover:bg-tierra-400"
        >
          {t("confirmarPagar")}
        </a>
      </div>

      <p className="mt-4 text-xs text-verde-700">{t("pagoManual")}</p>
    </StepShell>
  );
}
