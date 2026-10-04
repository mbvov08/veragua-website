"use client";

import { useTranslations } from "next-intl";
import { StepShell } from "@/components/configurador/StepShell";
import { ChoiceGroup } from "@/components/configurador/ChoiceGroup";
import { NumberField } from "@/components/configurador/NumberField";
import type { LacteoSeleccionado, TipoLacteo } from "@/lib/configurador/types";

type LacteosStepProps = {
  incluyeLacteos: boolean;
  lacteos: LacteoSeleccionado[];
  onChangeIncluye: (incluye: boolean) => void;
  onChangeLacteos: (lacteos: LacteoSeleccionado[]) => void;
};

const TIPOS: { tipo: TipoLacteo; defaultCantidad: number }[] = [
  { tipo: "leche", defaultCantidad: 1 },
  { tipo: "yogur", defaultCantidad: 1 },
  { tipo: "queso", defaultCantidad: 1 },
];

export function LacteosStep({
  incluyeLacteos,
  lacteos,
  onChangeIncluye,
  onChangeLacteos,
}: LacteosStepProps) {
  const t = useTranslations("configurador.lacteos");

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
    <StepShell kicker={t("kicker")} titulo={t("titulo")} subtitulo={t("subtitulo")}>
      <ChoiceGroup
        options={[
          { value: "si", label: t("si") },
          { value: "no", label: t("no") },
        ]}
        value={incluyeLacteos ? "si" : "no"}
        onChange={(v) => onChangeIncluye(v === "si")}
      />

      {incluyeLacteos && (
        <div className="mt-8 space-y-4">
          {TIPOS.map(({ tipo, defaultCantidad }) => {
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
                    <p className="font-heading text-lg text-verde-950">
                      {t(`tipos.${tipo}.label`)}
                    </p>
                    <p className="text-xs text-verde-700">{t(`tipos.${tipo}.unidad`)}</p>
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
                    {activo ? t("incluido") : t("incluir")}
                  </button>
                </div>

                {activo && (
                  <div className="mt-4 flex items-center gap-3">
                    <label className="text-xs font-medium uppercase tracking-wide text-verde-700">
                      {t("cantidadPorSemana")}
                    </label>
                    <NumberField
                      value={activo.cantidadPorSemana}
                      min={1}
                      max={20}
                      onChange={(cantidad) => actualizarCantidad(tipo, cantidad)}
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
