"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { trackMetaEvent } from "@/lib/metaPixel";

// Wompi agrega "?id=<transactionId>" a la redirectUrl al volver del widget.
// Acá consultamos el estado real de esa transacción en la API pública de
// Wompi (no requiere autenticación para GET) antes de disparar el evento de
// compra a Meta — así no contamos como compra un pago rechazado o pendiente.
export function PurchaseTracker() {
  const searchParams = useSearchParams();
  const yaDisparado = useRef(false);

  useEffect(() => {
    const id = searchParams.get("id");
    if (!id || yaDisparado.current) return;
    yaDisparado.current = true;

    fetch(`https://production.wompi.co/v1/transactions/${id}`)
      .then((res) => res.json())
      .then((json) => {
        const transaccion = json?.data;
        if (transaccion?.status === "APPROVED") {
          trackMetaEvent(
            "Purchase",
            {
              value: transaccion.amount_in_cents / 100,
              currency: transaccion.currency,
              content_type: "product",
            },
            transaccion.id,
          );
        }
      })
      .catch(() => {
        // Si la consulta falla, no disparamos el evento — mejor no contar
        // una compra que no pudimos confirmar, que contar una falsa.
      });
  }, [searchParams]);

  return null;
}
