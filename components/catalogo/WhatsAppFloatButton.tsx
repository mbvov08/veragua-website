"use client";

import { useLocale, useTranslations } from "next-intl";
import { buildCafeQuestionLink } from "@/lib/whatsapp";

// Botón flotante fijo en la esquina inferior derecha. bottom-20 en celular
// para no tapar el botón de pago cuando el usuario llega al final del
// checkout; en escritorio no hay ese riesgo, así que baja a bottom-6.
export function WhatsAppFloatButton() {
  const locale = useLocale() as "es" | "en";
  const t = useTranslations("cafe.whatsappFlotante");

  return (
    <a
      href={buildCafeQuestionLink(locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("ariaLabel")}
      className="fixed bottom-20 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-verde-950/20 transition hover:scale-105 md:bottom-6"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden>
        <path d="M12.01 2C6.48 2 2 6.48 2 12.01c0 1.99.58 3.85 1.58 5.42L2 22l4.71-1.53a9.94 9.94 0 0 0 5.3 1.53c5.53 0 10.01-4.48 10.01-10.01S17.54 2 12.01 2Zm0 18.14c-1.73 0-3.34-.5-4.7-1.36l-.34-.2-2.79.91.92-2.72-.22-.35a8.13 8.13 0 0 1-1.29-4.41c0-4.5 3.66-8.15 8.15-8.15a8.1 8.1 0 0 1 5.77 2.39 8.1 8.1 0 0 1 2.39 5.77c0 4.5-3.66 8.12-8.15 8.12Zm4.47-6.1c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.21-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.04 0 1.2.88 2.36 1 2.52.12.16 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.44-.59 1.65-1.16.2-.57.2-1.05.14-1.16-.06-.11-.22-.18-.46-.29Z" />
      </svg>
    </a>
  );
}
