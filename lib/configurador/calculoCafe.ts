// Estimación doméstica de café molido por taza (~150 ml, estilo tinto colombiano).
// El estándar SCA de goteo (taza de 237 ml) sugiere 13-15 g; para una taza más
// pequeña de uso casero, 10 g/taza es una referencia razonable.
export const GRAMOS_POR_TAZA = 10;
export const DIAS_POR_MES = 30;
export const GRAMOS_POR_LIBRA = 453.592;
export const GRAMOS_POR_BOLSA = 340; // Coincide con la presentación del producto Café de Origen.

export function gramosCafePorMes(tazasPorDia: number): number {
  return tazasPorDia * GRAMOS_POR_TAZA * DIAS_POR_MES;
}

export function librasCafePorMes(tazasPorDia: number): number {
  return gramosCafePorMes(tazasPorDia) / GRAMOS_POR_LIBRA;
}

export function bolsasCafePorMes(tazasPorDia: number): number {
  return Math.ceil(gramosCafePorMes(tazasPorDia) / GRAMOS_POR_BOLSA);
}
