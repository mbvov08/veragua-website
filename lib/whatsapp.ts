// El enlace corto de WhatsApp Business (wa.me/message/<id>) no soporta un
// mensaje personalizado por URL de forma confiable — el "?text=" que le
// agregábamos no siempre llegaba, lo que dejaba a clientes sin poder enviar
// los detalles de su pedido/plan. El formato directo con el número sí
// soporta "?text=" de forma estándar.
const WHATSAPP_BASE_URL = "https://wa.me/573124809415";

type Locale = "es" | "en";

export function buildWhatsAppLink(mensaje?: string): string {
  if (!mensaje) return WHATSAPP_BASE_URL;
  const texto = encodeURIComponent(mensaje);
  return `${WHATSAPP_BASE_URL}?text=${texto}`;
}

export function buildSubscriptionOrderLink(
  nombrePlan: string,
  diaEntrega?: string,
  locale: Locale = "es"
): string {
  if (locale === "en") {
    const dia = diaEntrega ? ` My preferred delivery day is ${diaEntrega}.` : "";
    return buildWhatsAppLink(
      `Hello Veragua! I'd like to subscribe to the ${nombrePlan}.${dia} Can you tell me how to proceed?`
    );
  }
  const dia = diaEntrega ? ` Mi día de entrega preferido es el ${diaEntrega}.` : "";
  return buildWhatsAppLink(
    `¡Hola Veragua! Quiero suscribirme al ${nombrePlan}.${dia} ¿Me cuentan cómo continuar?`
  );
}

export function buildGeneralContactLink(locale: Locale = "es"): string {
  return buildWhatsAppLink(
    locale === "en"
      ? "Hello Veragua! I'd like to learn more about your products."
      : "¡Hola Veragua! Quiero conocer más sobre sus productos."
  );
}

export function buildCafeQuestionLink(locale: Locale = "es"): string {
  return buildWhatsAppLink(
    locale === "en"
      ? "Hello Veragua! I have a question about the coffee."
      : "¡Hola Veragua! Tengo una pregunta sobre el café."
  );
}

export function buildHuevosOrderLink(locale: Locale = "es"): string {
  return buildWhatsAppLink(
    locale === "en"
      ? "Hello Veragua! I'd like to order pastured-hen eggs. Can you tell me how to proceed?"
      : "¡Hola Veragua! Quiero pedir huevos de gallinas de pastoreo. ¿Me cuentan cómo continuar?"
  );
}
