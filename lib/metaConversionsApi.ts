import { createHash } from "node:crypto";

const PIXEL_ID = "1390536653164494";

function hash(valor: string) {
  return createHash("sha256").update(valor.trim().toLowerCase()).digest("hex");
}

type EventoCompra = {
  eventId: string;
  amountInCents: number;
  currency: string;
  email?: string | null;
  telefono?: string | null;
};

// Complementa el píxel del navegador (components/catalogo/PurchaseTracker.tsx):
// ese solo dispara "Purchase" si el cliente vuelve a ver la página de gracias,
// lo cual no siempre pasa (puede cerrar la ventana de Wompi antes de que la
// redirección ocurra). Este envío ocurre desde el webhook, que sí se dispara
// siempre que Wompi aprueba el pago. Usamos el mismo eventId (el id de la
// transacción Wompi) en ambos lados para que Meta deduplique si llegan los dos.
export async function enviarCompraAMeta(evento: EventoCompra) {
  const token = process.env.META_CONVERSIONS_API_TOKEN;
  if (!token) return;

  const userData: Record<string, string[]> = {};
  if (evento.email) userData.em = [hash(evento.email)];
  if (evento.telefono) {
    const digitos = evento.telefono.replace(/\D/g, "");
    if (digitos) userData.ph = [hash(digitos)];
  }

  try {
    await fetch(`https://graph.facebook.com/v21.0/${PIXEL_ID}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: token,
        data: [
          {
            event_name: "Purchase",
            event_time: Math.floor(Date.now() / 1000),
            event_id: evento.eventId,
            action_source: "website",
            user_data: userData,
            custom_data: {
              currency: evento.currency,
              value: evento.amountInCents / 100,
            },
          },
        ],
      }),
    });
  } catch {
    // Si falla el envío a Meta no interrumpimos el resto del webhook.
  }
}
