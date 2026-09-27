import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { PlanCard } from "@/components/suscripciones/PlanCard";
import { subscriptionPlans } from "@/lib/subscriptions";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("suscripciones");
  return {
    title: `${t("hero.kicker")} — Veragua`,
    description: t("hero.texto"),
  };
}

export default async function SuscripcionesPage({ params }: PageProps<"/[locale]/suscripciones">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("suscripciones");

  return (
    <>
      <section className="bg-verde-950 px-6 pb-16 pt-40 text-beige-100 md:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-300">
              {t("hero.kicker")}
            </p>
            <h1 className="font-logo text-3xl italic leading-snug sm:text-4xl">
              {t("hero.titulo")}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-beige-300">{t("hero.texto")}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {subscriptionPlans.map((plan, i) => (
            <Reveal key={plan.slug} delay={i * 0.1}>
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-beige-200 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
              {t("personalizadoCta.kicker")}
            </p>
            <h2 className="font-heading text-2xl text-verde-950 sm:text-3xl">
              {t("personalizadoCta.titulo")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-verde-800">
              {t("personalizadoCta.texto")}
            </p>
            <Link
              href="/suscripciones/personalizado"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-verde-950 px-8 py-4 text-sm font-semibold text-beige-100 transition hover:bg-verde-800"
            >
              {t("personalizadoCta.cta")}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
