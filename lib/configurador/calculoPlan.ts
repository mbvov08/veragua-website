import { products } from "@/lib/products";
import type { SubscriptionComponent } from "@/lib/subscriptions";
import { calcularDesdeComponentes } from "@/lib/subscriptions";
import type { RespuestasEncuesta, TipoLacteo } from "@/lib/configurador/types";
import { cubetasPorSemana, huevosPorSemanaHogar } from "@/lib/configurador/calculoProteina";
import { bolsasCafePorMes, librasCafePorMes } from "@/lib/configurador/calculoCafe";

const PRODUCTO_LACTEO: Record<TipoLacteo, { slug: string; nombreVisible: string }> = {
  leche: { slug: "leche-a2", nombreVisible: "Leche A2 Sanorigen" },
  yogur: { slug: "yogur-artesanal", nombreVisible: "Yogur Líquido A2 Sanorigen" },
  queso: { slug: "queso-campesino", nombreVisible: "Queso Fresco A2 Sanorigen" },
};

// Usa la primera variante (la variante por defecto) de cada producto: el
// configurador calcula cantidades genéricas, no distingue tamaño/color/molienda.
function precioProducto(slug: string): number {
  const producto = products.find((p) => p.slug === slug);
  if (!producto) throw new Error(`Producto no encontrado en el catálogo: ${slug}`);
  return producto.variantes[0].precioCOP;
}

export type DetallePlanPersonalizado = {
  huevosPorSemana: number;
  cubetasPorSemana: number;
  librasCafePorMes: number;
};

export function calcularPlanPersonalizado(respuestas: RespuestasEncuesta) {
  const componentes: SubscriptionComponent[] = [];

  const cubetas = cubetasPorSemana(respuestas.personas, respuestas.frecuenciaHuevo);
  componentes.push({
    nombre: `Cubeta de huevos x ${30} (${cubetas} por semana)`,
    cantidadPorMes: cubetas * 4,
    precioUnitarioCOP: precioProducto("huevos-de-pastoreo"),
  });

  if (respuestas.incluyeLacteos) {
    for (const lacteo of respuestas.lacteos) {
      if (lacteo.cantidadPorSemana <= 0) continue;
      const info = PRODUCTO_LACTEO[lacteo.tipo];
      componentes.push({
        nombre: `${info.nombreVisible} (${lacteo.cantidadPorSemana}/semana)`,
        cantidadPorMes: lacteo.cantidadPorSemana * 4,
        precioUnitarioCOP: precioProducto(info.slug),
      });
    }
  }

  if (respuestas.incluyeArepas && respuestas.arepasPaquetesPorSemana > 0) {
    componentes.push({
      nombre: `Paquete de arepas (${respuestas.arepasPaquetesPorSemana}/semana)`,
      cantidadPorMes: respuestas.arepasPaquetesPorSemana * 4,
      precioUnitarioCOP: precioProducto("arepas"),
    });
  }

  let bolsasCafe = 0;
  if (respuestas.incluyeCafe && respuestas.tazasCafePorDia > 0) {
    bolsasCafe = bolsasCafePorMes(respuestas.tazasCafePorDia);
    componentes.push({
      nombre: `Café de Origen Veragua x 340 g (${bolsasCafe}/mes)`,
      cantidadPorMes: bolsasCafe,
      precioUnitarioCOP: precioProducto("cafe-de-origen"),
    });
  }

  const calculo = calcularDesdeComponentes(componentes);
  const detalle: DetallePlanPersonalizado = {
    huevosPorSemana: huevosPorSemanaHogar(respuestas.personas, respuestas.frecuenciaHuevo),
    cubetasPorSemana: cubetas,
    librasCafePorMes: respuestas.incluyeCafe ? librasCafePorMes(respuestas.tazasCafePorDia) : 0,
  };

  return { componentes, detalle, ...calculo };
}
