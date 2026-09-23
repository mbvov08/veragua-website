export type NivelActividad = "sedentario" | "activo";

export type Persona = {
  pesoKg: number;
  actividad: NivelActividad;
};

export type FrecuenciaHuevo = "desayuno" | "desayuno_cena";

export type TipoLacteo = "leche" | "yogur" | "queso";

export type LacteoSeleccionado = {
  tipo: TipoLacteo;
  cantidadPorSemana: number; // en la unidad de venta del producto (botella, envase, libra)
};

export type CiudadEntregaPersonalizada = "Armenia" | "Pereira";

export type RespuestasEncuesta = {
  personas: Persona[];
  frecuenciaHuevo: FrecuenciaHuevo;
  incluyeLacteos: boolean;
  lacteos: LacteoSeleccionado[];
  incluyeArepas: boolean;
  arepasPaquetesPorSemana: number;
  incluyeCafe: boolean;
  tazasCafePorDia: number;
  ciudadEntrega: CiudadEntregaPersonalizada;
  diaEntrega: string;
};

export const ciudadesEntregaPersonalizada: CiudadEntregaPersonalizada[] = ["Armenia", "Pereira"];

export const respuestasIniciales: RespuestasEncuesta = {
  personas: [{ pesoKg: 70, actividad: "sedentario" }],
  frecuenciaHuevo: "desayuno",
  incluyeLacteos: false,
  lacteos: [],
  incluyeArepas: false,
  arepasPaquetesPorSemana: 1,
  incluyeCafe: false,
  tazasCafePorDia: 1,
  ciudadEntrega: "Armenia",
  diaEntrega: "Sábado",
};
