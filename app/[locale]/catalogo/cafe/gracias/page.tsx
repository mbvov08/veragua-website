import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { PurchaseTracker } from "@/components/catalogo/PurchaseTracker";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Gracias por tu compra — Veragua",
  description: "Confirmación de compra de Café de Origen Veragua.",
};

export default async function GraciasCafePage({
  params,
}: PageProps<"/[locale]/catalogo/cafe/gracias">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cafe.gracias");

  return (
    <section className="bg-beige-100 px-6 py-40 md:py-48">
      <Suspense fallback={null}>
        <PurchaseTracker />
      </Suspense>
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <span className="inline-block rounded-full bg-tierra-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-verde-950">
            {t("badge")}
          </span>
          <h1 className="mt-6 font-logo text-4xl italic text-verde-950">{t("titulo")}</h1>
          <p className="mt-4 text-base leading-relaxed text-verde-800">{t("texto")}</p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/catalogo"
              className="rounded-full border border-verde-950 px-6 py-2.5 text-sm font-medium text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
            >
              {t("volverCatalogo")}
            </Link>
            <a
              href={buildWhatsAppLink(t("mensajeWhatsApp"))}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-verde-950 px-6 py-2.5 text-sm font-medium text-beige-100 transition hover:bg-verde-800"
            >
              {t("escribirWhatsapp")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
