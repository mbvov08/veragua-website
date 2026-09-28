// Disparador seguro de eventos del Meta Pixel: no hace nada si fbq todavía
// no cargó (por ejemplo, en el primer render antes de que el script del
// pixel termine de ejecutarse) o si se llama desde el servidor.
export function trackMetaEvent(
  evento: string,
  datos?: Record<string, unknown>,
  eventId?: string,
) {
  if (typeof window === "undefined") return;
  if (eventId) {
    window.fbq?.("track", evento, datos, { eventID: eventId });
  } else {
    window.fbq?.("track", evento, datos);
  }
}
