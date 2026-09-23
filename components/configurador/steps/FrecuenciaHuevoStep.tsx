import { StepShell } from "@/components/configurador/StepShell";
import { ChoiceGroup } from "@/components/configurador/ChoiceGroup";
import type { FrecuenciaHuevo } from "@/lib/configurador/types";

type FrecuenciaHuevoStepProps = {
  value: FrecuenciaHuevo;
  onChange: (value: FrecuenciaHuevo) => void;
};

const OPTIONS: { value: FrecuenciaHuevo; label: string }[] = [
  { value: "desayuno", label: "Solo en el desayuno" },
  { value: "desayuno_cena", label: "Desayuno y cena" },
];

export function FrecuenciaHuevoStep({ value, onChange }: FrecuenciaHuevoStepProps) {
  return (
    <StepShell
      kicker="Consumo de huevo"
      titulo="¿Cuántas veces al día suelen comer huevo?"
      subtitulo="Esto nos dice cuántas cubetas por semana necesita tu hogar."
    >
      <ChoiceGroup options={OPTIONS} value={value} onChange={onChange} />
    </StepShell>
  );
}
