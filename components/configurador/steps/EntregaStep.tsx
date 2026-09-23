import { StepShell } from "@/components/configurador/StepShell";
import { ChoiceGroup } from "@/components/configurador/ChoiceGroup";
import { diasDeEntrega } from "@/lib/subscriptions";
import { ciudadesEntregaPersonalizada, type CiudadEntregaPersonalizada } from "@/lib/configurador/types";

type EntregaStepProps = {
  ciudad: CiudadEntregaPersonalizada;
  dia: string;
  onChangeCiudad: (ciudad: CiudadEntregaPersonalizada) => void;
  onChangeDia: (dia: string) => void;
};

export function EntregaStep({ ciudad, dia, onChangeCiudad, onChangeDia }: EntregaStepProps) {
  return (
    <StepShell
      kicker="Entrega"
      titulo="¿Dónde y cuándo quieres recibir tu plan?"
      subtitulo="El Plan Personalizado se entrega en Armenia y Pereira."
    >
      <p className="text-xs font-medium uppercase tracking-wide text-verde-700">Ciudad</p>
      <ChoiceGroup
        className="mt-2"
        options={ciudadesEntregaPersonalizada.map((c) => ({ value: c, label: c }))}
        value={ciudad}
        onChange={onChangeCiudad}
      />

      <p className="mt-8 text-xs font-medium uppercase tracking-wide text-verde-700">
        Día de entrega semanal
      </p>
      <ChoiceGroup
        className="mt-2"
        options={diasDeEntrega.map((d) => ({ value: d, label: d }))}
        value={dia}
        onChange={onChangeDia}
      />
    </StepShell>
  );
}
