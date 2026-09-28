import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import {
  enviarCorreoCancelacion,
  enviarCorreoPedido,
  registrarPedidoEnSheet,
} from "@/lib/notificacionPedido";
import { enviarCompraAMeta } from "@/lib/metaConversionsApi";

// Lee un campo anidado del payload a partir de una ruta tipo "data.transaction.id".
function leerCampo(objeto: unknown, ruta: string): unknown {
  return ruta.split(".").reduce<unknown>((valor, clave) => {
    if (valor && typeof valor === "object" && clave in valor) {
      return (valor as Record<string, unknown>)[clave];
    }
    return undefined;
  }, objeto);
}

// Webhook de eventos de Wompi (evento "transaction.updated"). Verifica la
// autenticidad con WOMPI_EVENTS_SECRET antes de confiar en el payload —
// concatena los valores de signature.properties (en orden) + el timestamp del
// evento + el secreto, y compara el SHA256 contra signature.checksum. Ver:
// https://docs.wompi.co/en/docs/colombia/eventos/
export async function POST(request: Request) {
  const secret = process.env.WOMPI_EVENTS_SECRET;
  if (!secret) {
    // Sin el secreto no podemos verificar el origen del evento: respondemos
    // 200 para que Wompi no reintente indefinidamente, pero no procesamos nada.
    return NextResponse.json({ ok: false, error: "WOMPI_EVENTS_SECRET no configurado" });
  }

  const payload = await request.json();
  const { properties, checksum } = payload?.signature ?? {};
  const timestamp = payload?.timestamp;

  if (!Array.isArray(properties) || !checksum || !timestamp) {
    return NextResponse.json({ ok: false, error: "Payload sin firma válida" });
  }

  // Las rutas en signature.properties (ej. "transaction.id") son relativas a
  // payload.data, no a la raíz del mensaje — hay que resolverlas ahí.
  const valoresConcatenados = properties
    .map((ruta: string) => String(leerCampo(payload?.data, ruta) ?? ""))
    .join("");
  const checksumCalculado = createHash("sha256")
    .update(`${valoresConcatenados}${timestamp}${secret}`)
    .digest("hex");

  if (checksumCalculado.toLowerCase() !== String(checksum).toLowerCase()) {
    return NextResponse.json({ ok: false, error: "Firma inválida" }, { status: 401 });
  }

  const transaccion = payload?.data?.transaction;
  if (payload?.event === "transaction.updated" && transaccion?.status === "APPROVED") {
    const pedido = {
      reference: transaccion.reference as string,
      amountInCents: transaccion.amount_in_cents as number,
      currency: transaccion.currency as string,
      customerEmail: (transaccion.customer_email as string | null) ?? null,
      shippingAddress: transaccion.shipping_address ?? null,
      wompiTransactionId: transaccion.id as string,
    };

    await Promise.allSettled([
      enviarCorreoPedido(pedido),
      registrarPedidoEnSheet(pedido),
      enviarCompraAMeta({
        eventId: pedido.wompiTransactionId,
        amountInCents: pedido.amountInCents,
        currency: pedido.currency,
        email: pedido.customerEmail,
        telefono: pedido.shippingAddress?.phone_number ?? null,
      }),
    ]);
  } else if (payload?.event === "transaction.updated" && transaccion?.status === "VOIDED") {
    // Un pedido que ya se había aprobado (y notificado) se anuló o reembolsó
    // después — avisamos para que no se despache.
    await enviarCorreoCancelacion({
      reference: transaccion.reference as string,
      wompiTransactionId: transaccion.id as string,
    });
  }

  return NextResponse.json({ ok: true });
}
