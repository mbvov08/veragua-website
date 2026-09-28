// Disparador seguro de eventos del Meta Pixel: no hace nada si fbq todavía
// no cargó (por ejemplo, en el primer render antes de que el script del
// pixel termine de ejecutarse) o si se llama desde el servidor.
export function trackMetaEvent(evento: string, datos?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", evento, datos);
}
