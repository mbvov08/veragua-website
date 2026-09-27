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

// Keys estables (no dependen del idioma) para el día de entrega — el label
// visible se busca en messages/*.json bajo "suscripciones.dias" (mismo orden
// que este array). Así el valor guardado en localStorage no se rompe si el
// visitante cambia de idioma a mitad de sesión.
export const diaKeys = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"] as const;
export type DiaKey = (typeof diaKeys)[number];

// Etiquetas en español, para el mensaje de WhatsApp del Plan Personalizado
// (ver whatsappPlan.ts) — ese mensaje es para el equipo de Veragua y se
// mantiene siempre en español, sin importar el idioma del sitio.
export const diaLabelEs: Record<DiaKey, string> = {
  lunes: "Lunes",
  martes: "Martes",
  miercoles: "Miércoles",
  jueves: "Jueves",
  viernes: "Viernes",
  sabado: "Sábado",
};

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
  diaEntrega: DiaKey;
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
  diaEntrega: "sabado",
};
