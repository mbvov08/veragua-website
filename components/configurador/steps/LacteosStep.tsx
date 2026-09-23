import { StepShell } from "@/components/configurador/StepShell";
import { ChoiceGroup } from "@/components/configurador/ChoiceGroup";
import type { LacteoSeleccionado, TipoLacteo } from "@/lib/configurador/types";

type LacteosStepProps = {
  incluyeLacteos: boolean;
  lacteos: LacteoSeleccionado[];
  onChangeIncluye: (incluye: boolean) => void;
  onChangeLacteos: (lacteos: LacteoSeleccionado[]) => void;
};

const TIPOS: { tipo: TipoLacteo; label: string; unidad: string; defaultCantidad: number }[] = [
  { tipo: "leche", label: "Leche A2", unidad: "botellas x 1 L / semana", defaultCantidad: 1 },
  { tipo: "yogur", label: "Yogur Artesanal", unidad: "envases x 500 g / semana", defaultCantidad: 1 },
  { tipo: "queso", label: "Queso Campesino", unidad: "libras / semana", defaultCantidad: 1 },
];

export function LacteosStep({
  incluyeLacteos,
  lacteos,
  onChangeIncluye,
  onChangeLacteos,
}: LacteosStepProps) {
  function seleccionado(tipo: TipoLacteo) {
    return lacteos.find((l) => l.tipo === tipo);
  }

  function toggleTipo(tipo: TipoLacteo, defaultCantidad: number) {
    if (seleccionado(tipo)) {
      onChangeLacteos(lacteos.filter((l) => l.tipo !== tipo));
    } else {
      onChangeLacteos([...lacteos, { tipo, cantidadPorSemana: defaultCantidad }]);
    }
  }

  function actualizarCantidad(tipo: TipoLacteo, cantidadPorSemana: number) {
    onChangeLacteos(lacteos.map((l) => (l.tipo === tipo ? { ...l, cantidadPorSemana } : l)));
  }

  return (
    <StepShell kicker="Lácteos" titulo="¿Quieres incluir lácteos en tu plan?" subtitulo="Es opcional.">
      <ChoiceGroup
        options={[
          { value: "si", label: "Sí, quiero lácteos" },
          { value: "no", label: "No por ahora" },
        ]}
        value={incluyeLacteos ? "si" : "no"}
        onChange={(v) => onChangeIncluye(v === "si")}
      />

      {incluyeLacteos && (
        <div className="mt-8 space-y-4">
          {TIPOS.map(({ tipo, label, unidad, defaultCantidad }) => {
            const activo = seleccionado(tipo);
            return (
              <div
                key={tipo}
                className={`rounded-3xl border p-6 transition ${
                  activo ? "border-tierra-500 bg-beige-100" : "border-beige-400 bg-beige-100"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-heading text-lg text-verde-950">{label}</p>
                    <p className="text-xs text-verde-700">{unidad}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleTipo(tipo, defaultCantidad)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      activo
                        ? "border-verde-950 bg-verde-950 text-beige-100"
                        : "border-beige-400 text-verde-800 hover:border-verde-950"
                    }`}
                  >
                    {activo ? "Incluido" : "Incluir"}
                  </button>
                </div>

                {activo && (
                  <div className="mt-4 flex items-center gap-3">
                    <label className="text-xs font-medium uppercase tracking-wide text-verde-700">
                      Cantidad por semana
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={activo.cantidadPorSemana}
                      onChange={(e) => actualizarCantidad(tipo, Number(e.target.value) || 1)}
                      className="w-20 rounded-full border border-beige-400 bg-beige-100 px-4 py-2 text-sm text-verde-950"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </StepShell>
  );
}
