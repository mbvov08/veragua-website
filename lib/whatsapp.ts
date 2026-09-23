// Enlace corto de WhatsApp Business de Veragua.
// Si en el futuro se prefiere usar un número directo, cambiar a `https://wa.me/57XXXXXXXXXX`.
const WHATSAPP_BASE_URL = "https://wa.me/message/PJTGOIKISFOYM1";

export function buildWhatsAppLink(mensaje?: string): string {
  if (!mensaje) return WHATSAPP_BASE_URL;
  const texto = encodeURIComponent(mensaje);
  return `${WHATSAPP_BASE_URL}?text=${texto}`;
}

export function buildProductOrderLink(nombreProducto: string): string {
  return buildWhatsAppLink(
    `¡Hola Veragua! Quiero pedir: ${nombreProducto}. ¿Me ayudan con la disponibilidad y la entrega?`
  );
}

export function buildSubscriptionOrderLink(nombrePlan: string, diaEntrega?: string): string {
  const dia = diaEntrega ? ` Mi día de entrega preferido es el ${diaEntrega}.` : "";
  return buildWhatsAppLink(
    `¡Hola Veragua! Quiero suscribirme al ${nombrePlan}.${dia} ¿Me cuentan cómo continuar?`
  );
}

export function buildGeneralContactLink(): string {
  return buildWhatsAppLink("¡Hola Veragua! Quiero conocer más sobre sus productos.");
}
