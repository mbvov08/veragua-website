import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { ConfiguratorLoader } from "@/components/configurador/ConfiguratorLoader";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("configurador.hero");
  return {
    title: `${t("kicker")} — Veragua`,
    description: t("texto"),
  };
}

export default async function PlanPersonalizadoPage({
  params,
}: PageProps<"/[locale]/suscripciones/personalizado">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("configurador.hero");

  return (
    <>
      <section className="bg-verde-950 px-6 pb-16 pt-40 text-beige-100 md:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-300">
              {t("kicker")}
            </p>
            <h1 className="font-logo text-3xl italic leading-snug sm:text-4xl">{t("titulo")}</h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-beige-300">{t("texto")}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-16 md:py-24">
        <ConfiguratorLoader />
      </section>
    </>
  );
}
