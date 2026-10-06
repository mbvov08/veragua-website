// Los nombres/descripciones visibles viven en messages/es.json y en.json
// (namespace "suscripciones.planes.<slug>"), no acá — esta data solo trae
// los números y una "key" para encontrar la etiqueta traducida de cada
// componente. Precios sincronizados manualmente con el catálogo de Treinta
// (ver la nota en lib/products.ts); estos componentes están duplicados a
// propósito (no se derivan de `products`) porque cada plan empaqueta
// cantidades propias.
// Solo lo que hace falta para el cálculo de precio — el nombre visible se
// resuelve aparte (por "key" en los planes fijos, dinámicamente en el
// configurador). Así ambos casos pueden reusar calcularDesdeComponentes.
export type ComponentePrecio = {
  cantidadPorMes: number;
  precioUnitarioCOP: number;
};

export type SubscriptionComponent = ComponentePrecio & {
  key: string;
};

export type SubscriptionPlan = {
  slug: string;
  entregasPorMes: number;
  componentes: SubscriptionComponent[];
  destacado?: boolean;
};

export const DESCUENTO_SUSCRIPCION = 0.1;

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    slug: "plan-huevos",
    entregasPorMes: 4,
    componentes: [{ key: "huevos", cantidadPorMes: 8, precioUnitarioCOP: 25000 }],
  },
  {
    slug: "plan-huevos-lacteos-sorpresa",
    entregasPorMes: 4,
    destacado: true,
    componentes: [
      { key: "huevos", cantidadPorMes: 8, precioUnitarioCOP: 25000 },
      { key: "leche", cantidadPorMes: 1, precioUnitarioCOP: 15000 },
      { key: "yogur", cantidadPorMes: 1, precioUnitarioCOP: 31000 },
      { key: "queso", cantidadPorMes: 1, precioUnitarioCOP: 17000 },
      { key: "leche", cantidadPorMes: 1, precioUnitarioCOP: 15000 },
    ],
  },
  {
    slug: "plan-desayuno-completo",
    entregasPorMes: 4,
    componentes: [
      { key: "cafe", cantidadPorMes: 2, precioUnitarioCOP: 38000 },
      { key: "huevos", cantidadPorMes: 8, precioUnitarioCOP: 25000 },
      { key: "lacteo", cantidadPorMes: 4, precioUnitarioCOP: 21000 },
      { key: "arepas", cantidadPorMes: 4, precioUnitarioCOP: 6000 },
    ],
  },
];

export function calcularDesdeComponentes(componentes: ComponentePrecio[]) {
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
