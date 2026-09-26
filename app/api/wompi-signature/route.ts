import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

// Firma de integridad de Wompi: SHA256(referencia + montoEnCentavos + moneda + secretoIntegridad).
// Se calcula acá (servidor) para que el secreto nunca viaje al navegador —
// si se calculara en el cliente, cualquiera podría ver el secreto y firmar
// montos falsos. Ver: https://docs.wompi.co/en/docs/colombia/widget-checkout-web/
export async function POST(request: Request) {
  const secret = process.env.WOMPI_INTEGRITY_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "WOMPI_INTEGRITY_SECRET no está configurado" },
      { status: 500 }
    );
  }

  const { reference, amountInCents, currency } = await request.json();
  if (!reference || !amountInCents || !currency) {
    return NextResponse.json(
      { error: "Faltan reference, amountInCents o currency" },
      { status: 400 }
    );
  }

  const signature = createHash("sha256")
    .update(`${reference}${amountInCents}${currency}${secret}`)
    .digest("hex");

  return NextResponse.json({ signature });
}
