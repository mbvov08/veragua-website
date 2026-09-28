import nodemailer from "nodemailer";
import { google } from "googleapis";
import { decodificarReferencia } from "@/lib/cart";
import { formatCOP } from "@/lib/exchangeRate";

export type PedidoConfirmado = {
  reference: string;
  amountInCents: number;
  currency: string;
  customerEmail: string | null;
  // Nombres de campo tal como los devuelve Wompi en shipping_address
  // (snake_case, igual que el resto de su API) — no camelCase.
  shippingAddress: {
    name?: string;
    phone_number?: string;
    address_line_1?: string;
    city?: string;
    region?: string;
    country?: string;
  } | null;
  wompiTransactionId: string;
};

// Envía el correo de notificación de un pedido de café aprobado. No lanza si
// faltan las variables de entorno: en ese caso simplemente no envía nada, para
// que el webhook siga respondiendo 200 aunque el correo no esté configurado.
export async function enviarCorreoPedido(pedido: PedidoConfirmado) {
  const { GMAIL_USER, GMAIL_APP_PASSWORD, NOTIFICACIONES_PEDIDOS_EMAIL } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !NOTIFICACIONES_PEDIDOS_EMAIL) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  const direccion = pedido.shippingAddress;
  const montoCOP = (pedido.amountInCents / 100).toLocaleString("es-CO");
  const items = decodificarReferencia(pedido.reference);

  await transporter.sendMail({
    from: GMAIL_USER,
    to: NOTIFICACIONES_PEDIDOS_EMAIL,
    subject: `Nuevo pedido de café — ${pedido.reference}`,
    text: [
      `Referencia: ${pedido.reference}`,
      `Monto: $${montoCOP} ${pedido.currency}`,
      `Transacción Wompi: ${pedido.wompiTransactionId}`,
      `Correo del cliente: ${pedido.customerEmail ?? "no informado"}`,
      "",
      "Productos:",
      ...(items
        ? items.map((item) => `  ${item.cantidad} × ${item.nombre} (${formatCOP(item.precioCOP)} c/u)`)
        : ["  (no se pudo leer el detalle desde la referencia)"]),
      "",
      "Envío:",
      `  Nombre: ${direccion?.name ?? "-"}`,
      `  Teléfono: ${direccion?.phone_number ?? "-"}`,
      `  Dirección: ${direccion?.address_line_1 ?? "-"}`,
      `  Ciudad: ${direccion?.city ?? "-"}`,
      `  Región: ${direccion?.region ?? "-"}`,
      `  País: ${direccion?.country ?? "-"}`,
    ].join("\n"),
  });
}

// Agrega una fila al Google Sheet de pedidos. Igual que el correo: si faltan
// las credenciales de la cuenta de servicio, no hace nada (el webhook sigue
// respondiendo 200).
export async function registrarPedidoEnSheet(pedido: PedidoConfirmado) {
  const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, GOOGLE_SHEET_ID } =
    process.env;
  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
    return;
  }

  const auth = new google.auth.JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const direccion = pedido.shippingAddress;
  const items = decodificarReferencia(pedido.reference);
  const productos = items
    ? items.map((item) => `${item.cantidad} × ${item.nombre}`).join("; ")
    : "";

  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: "Pedidos!A:K",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          pedido.reference,
          pedido.wompiTransactionId,
          (pedido.amountInCents / 100).toString(),
          pedido.currency,
          pedido.customerEmail ?? "",
          direccion?.name ?? "",
          direccion?.phone_number ?? "",
          direccion?.address_line_1 ?? "",
          `${direccion?.city ?? ""}, ${direccion?.region ?? ""}`,
          productos,
        ],
      ],
    },
  });
}
