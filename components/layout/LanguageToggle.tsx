"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const siguiente = locale === "es" ? "en" : "es";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: siguiente })}
      className={className}
      aria-label={siguiente === "en" ? "Switch to English" : "Cambiar a español"}
    >
      {siguiente === "en" ? "EN" : "ES"}
    </button>
  );
}
