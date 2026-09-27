"use client";

import { useTranslations } from "next-intl";
import { StepShell } from "@/components/configurador/StepShell";
import { ChoiceGroup } from "@/components/configurador/ChoiceGroup";
import type { FrecuenciaHuevo } from "@/lib/configurador/types";

type FrecuenciaHuevoStepProps = {
  value: FrecuenciaHuevo;
  onChange: (value: FrecuenciaHuevo) => void;
};

export function FrecuenciaHuevoStep({ value, onChange }: FrecuenciaHuevoStepProps) {
  const t = useTranslations("configurador.frecuenciaHuevo");

  const OPTIONS: { value: FrecuenciaHuevo; label: string }[] = [
    { value: "desayuno", label: t("desayuno") },
    { value: "desayuno_cena", label: t("desayunoCena") },
  ];

  return (
    <StepShell kicker={t("kicker")} titulo={t("titulo")} subtitulo={t("subtitulo")}>
      <ChoiceGroup options={OPTIONS} value={value} onChange={onChange} />
    </StepShell>
  );
}
