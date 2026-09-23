export type SubscriptionComponent = {
  nombre: string;
  cantidadPorMes: number;
  precioUnitarioCOP: number;
};

export type SubscriptionPlan = {
  slug: string;
  nombre: string;
  descripcion: string;
  entregasPorMes: number;
  componentes: SubscriptionComponent[];
  destacado?: boolean;
};

export const DESCUENTO_SUSCRIPCION = 0.05;

// Precios sincronizados manualmente con el catálogo de Treinta — ver la nota
// en lib/products.ts. Estos componentes están duplicados a propósito (no se
// derivan de `products`) porque cada plan puede empaquetar cantidades propias;
// si cambian los precios base, actualizar también aquí.
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    slug: "plan-huevos",
    nombre: "Plan Huevos",
    descripcion:
      "2 cubetas de huevos de pastoreo cada semana, con entrega los 4 fines de semana del mes.",
    entregasPorMes: 4,
    componentes: [
      { nombre: "Cubeta de huevos x 30 (2 por semana)", cantidadPorMes: 8, precioUnitarioCOP: 27000 },
    ],
  },
  {
    slug: "plan-huevos-lacteos-sorpresa",
    nombre: "Plan Huevos + Lácteos Sorpresa",
    descripcion:
      "Huevos semanales de pastoreo más un lácteo distinto en cada entrega: queso, yogur o leche, rotando cada semana.",
    entregasPorMes: 4,
    destacado: true,
    componentes: [
      { nombre: "Cubeta de huevos x 30 (2 por semana)", cantidadPorMes: 8, precioUnitarioCOP: 27000 },
      { nombre: "Leche A2 x 1 L", cantidadPorMes: 1, precioUnitarioCOP: 15000 },
      { nombre: "Yogur artesanal x 500 g", cantidadPorMes: 1, precioUnitarioCOP: 31000 },
      { nombre: "Queso campesino x libra", cantidadPorMes: 1, precioUnitarioCOP: 17000 },
      { nombre: "Leche A2 x 1 L", cantidadPorMes: 1, precioUnitarioCOP: 15000 },
    ],
  },
  {
    slug: "plan-desayuno-completo",
    nombre: "Plan Desayuno Completo",
    descripcion:
      "Nuestro plan más completo: café, huevos semanales, un lácteo y arepas para no pensar en el desayuno en todo el mes.",
    entregasPorMes: 4,
    componentes: [
      { nombre: "Café de Origen Veragua x 340 g", cantidadPorMes: 2, precioUnitarioCOP: 38000 },
      { nombre: "Cubeta de huevos x 30 (2 por semana)", cantidadPorMes: 8, precioUnitarioCOP: 27000 },
      { nombre: "Lácteo rotativo semanal", cantidadPorMes: 4, precioUnitarioCOP: 21000 },
      { nombre: "Paquete de arepas", cantidadPorMes: 4, precioUnitarioCOP: 6000 },
    ],
  },
];

export function calcularDesdeComponentes(componentes: SubscriptionComponent[]) {
  const precioIndividualCOP = componentes.reduce(
    (total, c) => total + c.cantidadPorMes * c.precioUnitarioCOP,
    0
  );
  const precioConDescuentoCOP = Math.round(precioIndividualCOP * (1 - DESCUENTO_SUSCRIPCION));
  const ahorroCOP = precioIndividualCOP - precioConDescuentoCOP;

  return {
    precioIndividualCOP,
    precioConDescuentoCOP,
    ahorroCOP,
    descuentoPorcentaje: DESCUENTO_SUSCRIPCION * 100,
  };
}

export function calcularPlan(plan: SubscriptionPlan) {
  return calcularDesdeComponentes(plan.componentes);
}

export const diasDeEntrega = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
] as const;
