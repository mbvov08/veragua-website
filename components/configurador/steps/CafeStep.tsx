"use client";

import { useTranslations } from "next-intl";
import { StepShell } from "@/components/configurador/StepShell";
import { ChoiceGroup } from "@/components/configurador/ChoiceGroup";
import { QuantityStepper } from "@/components/configurador/QuantityStepper";
import { librasCafePorMes } from "@/lib/configurador/calculoCafe";

type CafeStepProps = {
  incluyeCafe: boolean;
  tazasPorDia: number;
  onChangeIncluye: (incluye: boolean) => void;
  onChangeTazas: (tazas: number) => void;
};

export function CafeStep({ incluyeCafe, tazasPorDia, onChangeIncluye, onChangeTazas }: CafeStepProps) {
  const t = useTranslations("configurador.cafe");
  const tGeneral = useTranslations("configurador");

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
          <QuantityStepper
            label={t("tazasPorDia")}
            value={tazasPorDia}
            min={1}
            max={10}
            onChange={onChangeTazas}
            restarLabel={tGeneral("restarCantidad")}
            sumarLabel={tGeneral("sumarCantidad")}
          />
          <p className="mt-2 text-xs text-verde-700">
            {t("librasAlMes", { libras: librasCafePorMes(tazasPorDia).toFixed(1) })}
          </p>
        </div>
      )}
    </StepShell>
  );
}
