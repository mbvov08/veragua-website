import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion, type FaqItem } from "@/components/faq/FaqAccordion";
import { SocialEmbed } from "@/components/faq/SocialEmbed";
import { socialLinks } from "@/lib/socialLinks";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes — Veragua",
  description: "Resolvemos tus dudas sobre productos, entregas y suscripciones de Veragua.",
};

export default async function FaqPage({ params }: PageProps<"/[locale]/preguntas-frecuentes">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <>
      <section className="bg-verde-950 px-6 pb-16 pt-40 text-beige-100 md:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-300">
              {t("kicker")}
            </p>
            <h1 className="font-logo text-2xl italic leading-snug sm:text-3xl">{t("titulo")}</h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <FaqAccordion items={items} />
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-200 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
              {t("verlo.kicker")}
            </p>
            <h2 className="font-heading text-2xl text-verde-950 sm:text-3xl">
              {t("verlo.titulo")}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <Reveal delay={0.1}>
              <SocialEmbed
                label={t("instagram.label")}
                url={socialLinks.instagram}
                descripcion={t("instagram.descripcion")}
                enlacePendiente={t("enlacePendiente")}
                verProceso={t("verProceso")}
              />
            </Reveal>
            <Reveal delay={0.2}>
              <SocialEmbed
                label={t("tiktok.label")}
                url={socialLinks.tiktok}
                descripcion={t("tiktok.descripcion")}
                enlacePendiente={t("enlacePendiente")}
                verProceso={t("verProceso")}
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
