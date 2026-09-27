"use client";

import { useTranslations } from "next-intl";
import { StepShell } from "@/components/configurador/StepShell";
import { ChoiceGroup } from "@/components/configurador/ChoiceGroup";
import {
  ciudadesEntregaPersonalizada,
  diaKeys,
  type CiudadEntregaPersonalizada,
  type DiaKey,
} from "@/lib/configurador/types";

type EntregaStepProps = {
  ciudad: CiudadEntregaPersonalizada;
  dia: DiaKey;
  onChangeCiudad: (ciudad: CiudadEntregaPersonalizada) => void;
  onChangeDia: (dia: DiaKey) => void;
};

export function EntregaStep({ ciudad, dia, onChangeCiudad, onChangeDia }: EntregaStepProps) {
  const t = useTranslations("configurador.entrega");
  const diaLabels = useTranslations("suscripciones").raw("dias") as string[];

  return (
    <StepShell kicker={t("kicker")} titulo={t("titulo")} subtitulo={t("subtitulo")}>
      <p className="text-xs font-medium uppercase tracking-wide text-verde-700">{t("ciudad")}</p>
      <ChoiceGroup
        className="mt-2"
        options={ciudadesEntregaPersonalizada.map((c) => ({ value: c, label: c }))}
        value={ciudad}
        onChange={onChangeCiudad}
      />

      <p className="mt-8 text-xs font-medium uppercase tracking-wide text-verde-700">
        {t("diaSemanal")}
      </p>
      <ChoiceGroup
        className="mt-2"
        options={diaKeys.map((key, i) => ({ value: key, label: diaLabels[i] }))}
        value={dia}
        onChange={onChangeDia}
      />
    </StepShell>
  );
}
