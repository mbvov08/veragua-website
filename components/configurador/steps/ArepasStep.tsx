import { StepShell } from "@/components/configurador/StepShell";
import { ChoiceGroup } from "@/components/configurador/ChoiceGroup";

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
  const sugerido = sugerenciaPaquetesArepas(numeroPersonas);

  return (
    <StepShell kicker="Arepas" titulo="¿Quieres incluir arepas artesanales?" subtitulo="Es opcional.">
      <ChoiceGroup
        options={[
          { value: "si", label: "Sí, quiero arepas" },
          { value: "no", label: "No por ahora" },
        ]}
        value={incluyeArepas ? "si" : "no"}
        onChange={(v) => onChangeIncluye(v === "si")}
      />

      {incluyeArepas && (
        <div className="mt-6 rounded-3xl border border-beige-400 bg-beige-100 p-6">
          <label className="block text-xs font-medium uppercase tracking-wide text-verde-700">
            Paquetes de arepas / semana
          </label>
          <input
            type="number"
            min={1}
            max={10}
            value={paquetesPorSemana}
            onChange={(e) => onChangePaquetes(Number(e.target.value) || 1)}
            className="mt-2 w-24 rounded-full border border-beige-400 bg-beige-100 px-4 py-2 text-sm text-verde-950"
          />
          <p className="mt-2 text-xs text-verde-700">
            Sugerencia para {numeroPersonas} {numeroPersonas === 1 ? "persona" : "personas"}:{" "}
            {sugerido} {sugerido === 1 ? "paquete" : "paquetes"}/semana.
          </p>
        </div>
      )}
    </StepShell>
  );
}
