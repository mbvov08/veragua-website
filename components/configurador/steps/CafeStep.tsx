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
  return (
    <StepShell kicker="Café" titulo="¿Te gustaría incluir café de origen?" subtitulo="Es opcional.">
      <ChoiceGroup
        options={[
          { value: "si", label: "Sí, quiero café" },
          { value: "no", label: "No por ahora" },
        ]}
        value={incluyeCafe ? "si" : "no"}
        onChange={(v) => onChangeIncluye(v === "si")}
      />

      {incluyeCafe && (
        <div className="mt-6 rounded-3xl border border-beige-400 bg-beige-100 p-6">
          <label className="block text-xs font-medium uppercase tracking-wide text-verde-700">
            Tazas de café al día
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
            ≈ {librasCafePorMes(tazasPorDia).toFixed(1)} libras de café al mes.
          </p>
        </div>
      )}
    </StepShell>
  );
}
