"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { SubscriptionPlan } from "@/lib/subscriptions";
import { calcularPlan } from "@/lib/subscriptions";
import { formatCOP } from "@/lib/exchangeRate";
import { buildSubscriptionOrderLink } from "@/lib/whatsapp";

export function PlanCard({ plan }: { plan: SubscriptionPlan }) {
  const t = useTranslations("suscripciones");
  const locale = useLocale() as "es" | "en";
  const dias = t.raw("dias") as string[];
  const [dia, setDia] = useState<string>(dias[5]);
  const { precioIndividualCOP, precioConDescuentoCOP, ahorroCOP, descuentoPorcentaje } =
    calcularPlan(plan);

  const nombre = t(`planes.${plan.slug}.nombre`);

  // Junta cantidades repetidas del mismo componente (ej. leche aparece dos
  // veces en el plan sorpresa) usando la key traducible, no el texto final.
  const totalesPorKey = plan.componentes.reduce<Record<string, number>>((acc, c) => {
    acc[c.key] = (acc[c.key] ?? 0) + c.cantidadPorMes;
    return acc;
  }, {});

  return (
    <div
      className={`flex h-full flex-col rounded-3xl border p-8 ${
        plan.destacado
          ? "border-tierra-500 bg-verde-950 text-beige-100"
          : "border-beige-400 bg-beige-100 text-verde-950"
      }`}
    >
      {plan.destacado && (
        <span className="mb-4 inline-block w-fit rounded-full bg-tierra-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-verde-950">
          {t("masElegido")}
        </span>
      )}

      <h3 className="font-heading text-xl">{nombre}</h3>
      <p className={`mt-3 text-sm leading-relaxed ${plan.destacado ? "text-beige-300" : "text-verde-800"}`}>
        {t(`planes.${plan.slug}.descripcion`)}
      </p>

      <ul className={`mt-6 space-y-2 text-sm ${plan.destacado ? "text-beige-200" : "text-verde-800"}`}>
        {Object.entries(totalesPorKey).map(([key, total]) => (
          <li key={key} className="flex justify-between gap-4">
            <span>{t(`planes.${plan.slug}.componentes.${key}`)}</span>
            <span className="font-medium">
              ×{total}
              {t("porMes")}
            </span>
          </li>
        ))}
      </ul>

      <div className={`mt-8 border-t pt-6 ${plan.destacado ? "border-beige-300/30" : "border-beige-400"}`}>
        <p className={`text-sm line-through ${plan.destacado ? "text-beige-300/70" : "text-verde-700/70"}`}>
          {formatCOP(precioIndividualCOP)}
        </p>
        <p className="font-heading text-2xl">{formatCOP(precioConDescuentoCOP)}</p>
        <p className={`mt-1 text-sm font-semibold ${plan.destacado ? "text-tierra-300" : "text-tierra-600"}`}>
          {t("ahorras", { ahorro: formatCOP(ahorroCOP), porcentaje: descuentoPorcentaje })}
        </p>
      </div>

      <div className="mt-8">
        <label
          htmlFor={`dia-${plan.slug}`}
          className={`block text-xs font-medium uppercase tracking-wide ${
            plan.destacado ? "text-beige-300" : "text-verde-700"
          }`}
        >
          {t("diaEntrega")}
        </label>
        <select
          id={`dia-${plan.slug}`}
          value={dia}
          onChange={(e) => setDia(e.target.value)}
          className={`mt-2 w-full rounded-full border px-4 py-2 text-sm ${
            plan.destacado
              ? "border-beige-300/40 bg-verde-900 text-beige-100"
              : "border-verde-950/30 bg-beige-100 text-verde-950"
          }`}
        >
          {dias.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <a
        href={buildSubscriptionOrderLink(nombre, dia, locale)}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
          plan.destacado
            ? "bg-tierra-500 text-verde-950 hover:bg-tierra-400"
            : "bg-verde-950 text-beige-100 hover:bg-verde-800"
        }`}
      >
        {t("suscribirme")}
      </a>
    </div>
  );
}
