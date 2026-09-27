import { buildWhatsAppLink } from "@/lib/whatsapp";
import { formatCOP } from "@/lib/exchangeRate";
import { diaLabelEs, type RespuestasEncuesta } from "@/lib/configurador/types";
import { calcularPlanPersonalizado } from "@/lib/configurador/calculoPlan";

// El mensaje de WhatsApp incluye todas las respuestas de la encuesta y el plan
// calculado: como el sitio no tiene base de datos propia, esta conversación es
// el registro que el equipo de Veragua usa para dar seguimiento y ajustar el plan.
export function buildPlanPersonalizadoLink(respuestas: RespuestasEncuesta): string {
  const { componentes, precioIndividualCOP, precioConDescuentoCOP, ahorroCOP, detalle } =
    calcularPlanPersonalizado(respuestas);

  const lineasPersonas = respuestas.personas
    .map((p, i) => `  ${i + 1}. ${p.pesoKg} kg — ${p.actividad === "activo" ? "hace ejercicio con frecuencia" : "sedentario"}`)
    .join("\n");

  const lineasProductos = componentes
    .map((c) => `  • ${c.nombre}: ${c.cantidadPorMes}/mes`)
    .join("\n");

  const mensaje = `¡Hola Veragua! Quiero armar mi Plan Personalizado con estos datos:

Personas en el hogar (${respuestas.personas.length}):
${lineasPersonas}

Frecuencia de huevo: ${respuestas.frecuenciaHuevo === "desayuno_cena" ? "Desayuno y cena" : "Solo desayuno"}
Huevos calculados: ${detalle.huevosPorSemana}/semana (${detalle.cubetasPorSemana} cubetas/semana)
${respuestas.incluyeCafe ? `Café: ${respuestas.tazasCafePorDia} tazas/día (≈ ${detalle.librasCafePorMes.toFixed(1)} libras/mes)\n` : ""}
Mi plan:
${lineasProductos}

Precio sin descuento: ${formatCOP(precioIndividualCOP)}
Precio con 5% de descuento: ${formatCOP(precioConDescuentoCOP)}
Ahorro: ${formatCOP(ahorroCOP)}

Ciudad de entrega: ${respuestas.ciudadEntrega}
Día de entrega preferido: ${diaLabelEs[respuestas.diaEntrega]}

¿Me ayudan a confirmar y coordinar el pago del primer mes?`;

  return buildWhatsAppLink(mensaje);
}
