"use client";

import { useState } from "react";
import type { SubscriptionPlan } from "@/lib/subscriptions";
import { calcularPlan, diasDeEntrega } from "@/lib/subscriptions";
import { formatCOP } from "@/lib/exchangeRate";
import { buildSubscriptionOrderLink } from "@/lib/whatsapp";

export function PlanCard({ plan }: { plan: SubscriptionPlan }) {
  const [dia, setDia] = useState<string>(diasDeEntrega[5]);
  const { precioIndividualCOP, precioConDescuentoCOP, ahorroCOP, descuentoPorcentaje } =
    calcularPlan(plan);

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
          Más elegido
        </span>
      )}

      <h3 className="font-heading text-xl">{plan.nombre}</h3>
      <p className={`mt-3 text-sm leading-relaxed ${plan.destacado ? "text-beige-300" : "text-verde-800"}`}>
        {plan.descripcion}
      </p>

      <ul className={`mt-6 space-y-2 text-sm ${plan.destacado ? "text-beige-200" : "text-verde-800"}`}>
        {plan.componentes
          .reduce<{ nombre: string; total: number }[]>((acc, c) => {
            const existente = acc.find((a) => a.nombre === c.nombre);
            if (existente) existente.total += c.cantidadPorMes;
            else acc.push({ nombre: c.nombre, total: c.cantidadPorMes });
            return acc;
          }, [])
          .map((item) => (
            <li key={item.nombre} className="flex justify-between gap-4">
              <span>{item.nombre}</span>
              <span className="font-medium">×{item.total}/mes</span>
            </li>
          ))}
      </ul>

      <div className={`mt-8 border-t pt-6 ${plan.destacado ? "border-beige-300/30" : "border-beige-400"}`}>
        <p className={`text-sm line-through ${plan.destacado ? "text-beige-300/70" : "text-verde-700/70"}`}>
          {formatCOP(precioIndividualCOP)}
        </p>
        <p className="font-heading text-2xl">{formatCOP(precioConDescuentoCOP)}</p>
        <p className={`mt-1 text-sm font-semibold ${plan.destacado ? "text-tierra-300" : "text-tierra-600"}`}>
          Ahorras {formatCOP(ahorroCOP)} ({descuentoPorcentaje}% de descuento) cada mes
        </p>
      </div>

      <div className="mt-8">
        <label
          htmlFor={`dia-${plan.slug}`}
          className={`block text-xs font-medium uppercase tracking-wide ${
            plan.destacado ? "text-beige-300" : "text-verde-700"
          }`}
        >
          Día de entrega semanal
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
          {diasDeEntrega.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <a
        href={buildSubscriptionOrderLink(plan.nombre, dia)}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
          plan.destacado
            ? "bg-tierra-500 text-verde-950 hover:bg-tierra-400"
            : "bg-verde-950 text-beige-100 hover:bg-verde-800"
        }`}
      >
        Suscribirme por WhatsApp
      </a>
    </div>
  );
}
