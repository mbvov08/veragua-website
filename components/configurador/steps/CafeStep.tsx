"use client";

import { useTranslations } from "next-intl";
import { StepShell } from "@/components/configurador/StepShell";
import { ChoiceGroup } from "@/components/configurador/ChoiceGroup";
import { librasCafePorMes } from "@/lib/configurador/calculoCafe";

type CafeStepProps = {
  incluyeCafe: boolean;
  tazasPorDia: number;
  onChangeIncluye: (incluye: boolean) => void;
  onChangeTazas: (tazas: number) => void;
};

export function CafeStep({ incluyeCafe, tazasPorDia, onChangeIncluye, onChangeTazas }: CafeStepProps) {
  const t = useTranslations("configurador.cafe");

  return (
    <StepShell kicker={t("kicker")} titulo={t("titulo")} subtitulo={t("subtitulo")}>
      <ChoiceGroup
        options={[
          { value: "si", label: t("si") },
          { value: "no", label: t("no") },
        ]}
        value={incluyeCafe ? "si" : "no"}
        onChange={(v) => onChangeIncluye(v === "si")}
      />

      {incluyeCafe && (
        <div className="mt-6 rounded-3xl border border-beige-400 bg-beige-100 p-6">
          <label className="block text-xs font-medium uppercase tracking-wide text-verde-700">
            {t("tazasPorDia")}
          </label>
          <input
            type="number"
            min={1}
            max={10}
            value={tazasPorDia}
            onChange={(e) => onChangeTazas(Number(e.target.value) || 1)}
            className="mt-2 w-24 rounded-full border border-beige-400 bg-beige-100 px-4 py-2 text-sm text-verde-950"
          />
          <p className="mt-2 text-xs text-verde-700">
            {t("librasAlMes", { libras: librasCafePorMes(tazasPorDia).toFixed(1) })}
          </p>
        </div>
      )}
    </StepShell>
  );
}
