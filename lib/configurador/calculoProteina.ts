import type { FrecuenciaHuevo, Persona } from "@/lib/configurador/types";

// Proteína efectiva por huevo (dato de negocio, no de investigación nutricional).
export const PROTEINA_POR_HUEVO_G = 6;

// Huevos por cubeta (mismo valor usado en el catálogo y en los planes fijos).
export const HUEVOS_POR_CUBETA = 30;

// Dosis de proteína por comida recomendada por la ISSN para activar síntesis de
// proteína muscular: ~0.25 g/kg de peso corporal, con un piso de 20 g.
// Fuente: ISSN Position Stand: protein and exercise (2017).
const FACTOR_PROTEINA_POR_COMIDA_G_POR_KG = 0.25;
const PISO_PROTEINA_POR_COMIDA_G = 20;

export function proteinaObjetivoPorComidaG(pesoKg: number): number {
  return Math.max(PISO_PROTEINA_POR_COMIDA_G, pesoKg * FACTOR_PROTEINA_POR_COMIDA_G_POR_KG);
}

export function huevosPorComida(pesoKg: number): number {
  return Math.ceil(proteinaObjetivoPorComidaG(pesoKg) / PROTEINA_POR_HUEVO_G);
}

export function vecesAlDia(frecuencia: FrecuenciaHuevo): number {
  return frecuencia === "desayuno_cena" ? 2 : 1;
}

export function huevosPorDiaPersona(persona: Persona, frecuencia: FrecuenciaHuevo): number {
  return huevosPorComida(persona.pesoKg) * vecesAlDia(frecuencia);
}

export function huevosPorSemanaHogar(personas: Persona[], frecuencia: FrecuenciaHuevo): number {
  const huevosDiaHogar = personas.reduce(
    (total, persona) => total + huevosPorDiaPersona(persona, frecuencia),
    0
  );
  return huevosDiaHogar * 7;
}

export function cubetasPorSemana(personas: Persona[], frecuencia: FrecuenciaHuevo): number {
  return Math.ceil(huevosPorSemanaHogar(personas, frecuencia) / HUEVOS_POR_CUBETA);
}
