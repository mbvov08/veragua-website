import type { RespuestasEncuesta } from "@/lib/configurador/types";

const STORAGE_KEY = "veragua_configurador_ultima_respuesta";

export function guardarRespuestas(respuestas: RespuestasEncuesta): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(respuestas));
  } catch {
    // localStorage puede fallar (modo privado, cuotas); no es crítico para el flujo.
  }
}

export function cargarRespuestas(): RespuestasEncuesta | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RespuestasEncuesta) : null;
  } catch {
    return null;
  }
}

export function borrarRespuestas(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ver nota en guardarRespuestas.
  }
}
