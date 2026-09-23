"use client";

import { useEffect, useState } from "react";
import { ProgressBar } from "@/components/configurador/ProgressBar";
import { PersonasStep } from "@/components/configurador/steps/PersonasStep";
import { FrecuenciaHuevoStep } from "@/components/configurador/steps/FrecuenciaHuevoStep";
import { LacteosStep } from "@/components/configurador/steps/LacteosStep";
import { ArepasStep } from "@/components/configurador/steps/ArepasStep";
import { CafeStep } from "@/components/configurador/steps/CafeStep";
import { EntregaStep } from "@/components/configurador/steps/EntregaStep";
import { ResumenStep } from "@/components/configurador/steps/ResumenStep";
import { respuestasIniciales, type RespuestasEncuesta } from "@/lib/configurador/types";
import { cargarRespuestas, guardarRespuestas } from "@/lib/configurador/almacenamiento";

const TOTAL_PASOS = 7;

// Este componente se monta solo en el navegador (ver ConfiguratorLoader), así que
// es seguro leer localStorage directamente en el inicializador de useState.
export function Configurator() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState<RespuestasEncuesta>(
    () => cargarRespuestas() ?? respuestasIniciales
  );
  const [restaurado, setRestaurado] = useState(() => cargarRespuestas() !== null);

  useEffect(() => {
    guardarRespuestas(respuestas);
  }, [respuestas]);

  function actualizar(cambios: Partial<RespuestasEncuesta>) {
    setRespuestas((prev) => ({ ...prev, ...cambios }));
  }

  function reiniciar() {
    setRespuestas(respuestasIniciales);
    setPaso(0);
    setRestaurado(false);
  }

  function siguiente() {
    setPaso((p) => Math.min(TOTAL_PASOS - 1, p + 1));
  }

  function atras() {
    setPaso((p) => Math.max(0, p - 1));
  }

  const esUltimoPaso = paso === TOTAL_PASOS - 1;

  return (
    <div className="mx-auto max-w-2xl">
      {restaurado && paso === 0 && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-tierra-400 bg-beige-200 px-5 py-3 text-sm text-verde-800">
          <span>Recuperamos tu última configuración.</span>
          <button
            type="button"
            onClick={reiniciar}
            className="font-semibold text-tierra-600 hover:underline"
          >
            Empezar de nuevo
          </button>
        </div>
      )}

      <ProgressBar pasoActual={paso} totalPasos={TOTAL_PASOS} />

      <div className="mt-8">
        {paso === 0 && (
          <PersonasStep
            personas={respuestas.personas}
            onChange={(personas) => actualizar({ personas })}
          />
        )}
        {paso === 1 && (
          <FrecuenciaHuevoStep
            value={respuestas.frecuenciaHuevo}
            onChange={(frecuenciaHuevo) => actualizar({ frecuenciaHuevo })}
          />
        )}
        {paso === 2 && (
          <LacteosStep
            incluyeLacteos={respuestas.incluyeLacteos}
            lacteos={respuestas.lacteos}
            onChangeIncluye={(incluyeLacteos) => actualizar({ incluyeLacteos })}
            onChangeLacteos={(lacteos) => actualizar({ lacteos })}
          />
        )}
        {paso === 3 && (
          <ArepasStep
            incluyeArepas={respuestas.incluyeArepas}
            paquetesPorSemana={respuestas.arepasPaquetesPorSemana}
            numeroPersonas={respuestas.personas.length}
            onChangeIncluye={(incluyeArepas) => actualizar({ incluyeArepas })}
            onChangePaquetes={(arepasPaquetesPorSemana) => actualizar({ arepasPaquetesPorSemana })}
          />
        )}
        {paso === 4 && (
          <CafeStep
            incluyeCafe={respuestas.incluyeCafe}
            tazasPorDia={respuestas.tazasCafePorDia}
            onChangeIncluye={(incluyeCafe) => actualizar({ incluyeCafe })}
            onChangeTazas={(tazasCafePorDia) => actualizar({ tazasCafePorDia })}
          />
        )}
        {paso === 5 && (
          <EntregaStep
            ciudad={respuestas.ciudadEntrega}
            dia={respuestas.diaEntrega}
            onChangeCiudad={(ciudadEntrega) => actualizar({ ciudadEntrega })}
            onChangeDia={(diaEntrega) => actualizar({ diaEntrega })}
          />
        )}
        {paso === 6 && <ResumenStep respuestas={respuestas} />}
      </div>

      {!esUltimoPaso && (
        <div className="mt-10 flex items-center justify-between">
          <button
            type="button"
            onClick={atras}
            disabled={paso === 0}
            className="rounded-full border border-verde-950 px-6 py-3 text-sm font-semibold text-verde-950 transition hover:bg-verde-950 hover:text-beige-100 disabled:opacity-0"
          >
            Atrás
          </button>
          <button
            type="button"
            onClick={siguiente}
            className="rounded-full bg-verde-950 px-8 py-3 text-sm font-semibold text-beige-100 transition hover:bg-verde-800"
          >
            Siguiente
          </button>
        </div>
      )}

      {esUltimoPaso && (
        <div className="mt-10">
          <button
            type="button"
            onClick={atras}
            className="rounded-full border border-verde-950 px-6 py-3 text-sm font-semibold text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
          >
            Atrás
          </button>
        </div>
      )}
    </div>
  );
}
