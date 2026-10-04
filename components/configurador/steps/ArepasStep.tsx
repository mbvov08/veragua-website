"use client";

import { useTranslations } from "next-intl";
import { StepShell } from "@/components/configurador/StepShell";
import { ChoiceGroup } from "@/components/configurador/ChoiceGroup";
import { NumberField } from "@/components/configurador/NumberField";

type ArepasStepProps = {
  incluyeArepas: boolean;
  paquetesPorSemana: number;
  numeroPersonas: number;
  onChangeIncluye: (incluye: boolean) => void;
  onChangePaquetes: (paquetes: number) => void;
};

export function sugerenciaPaquetesArepas(numeroPersonas: number): number {
  return Math.max(1, Math.ceil(numeroPersonas / 2));
}

export function ArepasStep({
  incluyeArepas,
  paquetesPorSemana,
  numeroPersonas,
  onChangeIncluye,
  onChangePaquetes,
}: ArepasStepProps) {
  const t = useTranslations("configurador.arepas");
  const sugerido = sugerenciaPaquetesArepas(numeroPersonas);

  return (
    <StepShell kicker={t("kicker")} titulo={t("titulo")} subtitulo={t("subtitulo")}>
      <ChoiceGroup
        options={[
          { value: "si", label: t("si") },
          { value: "no", label: t("no") },
        ]}
        value={incluyeArepas ? "si" : "no"}
        onChange={(v) => onChangeIncluye(v === "si")}
      />

      {incluyeArepas && (
        <div className="mt-6 rounded-3xl border border-beige-400 bg-beige-100 p-6">
          <label className="block text-xs font-medium uppercase tracking-wide text-verde-700">
            {t("paquetesPorSemana")}
          </label>
          <NumberField
            value={paquetesPorSemana}
            min={1}
            max={10}
            onChange={onChangePaquetes}
            className="mt-2 w-24 rounded-full border border-beige-400 bg-beige-100 px-4 py-2 text-sm text-verde-950"
          />
          <p className="mt-2 text-xs text-verde-700">
            {t("sugerencia", {
              n: numeroPersonas,
              personaWord: numeroPersonas === 1 ? t("persona") : t("personasPlural"),
              sugerido,
              paqueteWord: sugerido === 1 ? t("paquete") : t("paquetesPlural"),
            })}
          </p>
        </div>
      )}
    </StepShell>
  );
}
