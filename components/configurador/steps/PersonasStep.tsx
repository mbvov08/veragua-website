"use client";

import { useTranslations } from "next-intl";
import { StepShell } from "@/components/configurador/StepShell";
import { ChoiceGroup } from "@/components/configurador/ChoiceGroup";
import type { NivelActividad, Persona } from "@/lib/configurador/types";

type PersonasStepProps = {
  personas: Persona[];
  onChange: (personas: Persona[]) => void;
};

export function PersonasStep({ personas, onChange }: PersonasStepProps) {
  const t = useTranslations("configurador.personas");

  const ACTIVIDAD_OPTIONS: { value: NivelActividad; label: string }[] = [
    { value: "sedentario", label: t("sedentario") },
    { value: "activo", label: t("activo") },
  ];

  function setCantidad(cantidad: number) {
    const nueva = Math.max(1, Math.min(10, cantidad));
    if (nueva === personas.length) return;

    if (nueva > personas.length) {
      const agregar = Array.from({ length: nueva - personas.length }, () => ({
        pesoKg: 70,
        actividad: "sedentario" as NivelActividad,
      }));
      onChange([...personas, ...agregar]);
    } else {
      onChange(personas.slice(0, nueva));
    }
  }

  function actualizarPersona(index: number, cambios: Partial<Persona>) {
    onChange(personas.map((p, i) => (i === index ? { ...p, ...cambios } : p)));
  }

  return (
    <StepShell kicker={t("kicker")} titulo={t("titulo")} subtitulo={t("subtitulo")}>
      <div className="mb-8 flex items-center gap-4">
        <button
          type="button"
          onClick={() => setCantidad(personas.length - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-verde-950 text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
          aria-label={t("restar")}
        >
          −
        </button>
        <span className="w-10 text-center font-heading text-2xl text-verde-950">
          {personas.length}
        </span>
        <button
          type="button"
          onClick={() => setCantidad(personas.length + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-verde-950 text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
          aria-label={t("sumar")}
        >
          +
        </button>
        <span className="text-sm text-verde-700">
          {personas.length === 1 ? t("persona") : t("personasPlural")}
        </span>
      </div>

      <div className="space-y-6">
        {personas.map((persona, i) => (
          <div key={i} className="rounded-3xl border border-beige-400 bg-beige-100 p-6">
            <p className="font-heading text-lg text-verde-950">
              {t("personaLabel", { n: i + 1 })}
            </p>

            <label className="mt-4 block text-xs font-medium uppercase tracking-wide text-verde-700">
              {t("peso")}
            </label>
            <input
              type="number"
              min={20}
              max={200}
              value={persona.pesoKg}
              onChange={(e) => actualizarPersona(i, { pesoKg: Number(e.target.value) || 0 })}
              className="mt-2 w-32 rounded-full border border-beige-400 bg-beige-100 px-4 py-2 text-sm text-verde-950"
            />

            <p className="mt-5 text-xs font-medium uppercase tracking-wide text-verde-700">
              {t("nivelActividad")}
            </p>
            <ChoiceGroup
              className="mt-2"
              options={ACTIVIDAD_OPTIONS}
              value={persona.actividad}
              onChange={(actividad) => actualizarPersona(i, { actividad })}
            />
          </div>
        ))}
      </div>
    </StepShell>
  );
}
