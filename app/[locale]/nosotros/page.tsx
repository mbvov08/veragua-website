import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { LogoStory } from "@/components/nosotros/LogoStory";

const ORDEN_ELEMENTOS = ["vaca", "gallina", "guayacan"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nosotros");
  return {
    title: "Nosotros — Veragua",
    description: t("mision.texto"),
  };
}

export default async function NosotrosPage({ params }: PageProps<"/[locale]/nosotros">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nosotros");

  const principios = t.raw("principios") as { titulo: string; descripcion: string }[];
  const valoresLista = t.raw("valores.lista") as { titulo: string; descripcion: string }[];
  const elementos = ORDEN_ELEMENTOS.map((id) => ({
    id,
    nombre: t(`historiaLogo.elementos.${id}.nombre`),
    texto: t(`historiaLogo.elementos.${id}.texto`),
  }));

  return (
    <>
      <section className="relative overflow-hidden bg-verde-950 px-6 pb-20 pt-40 text-beige-100 md:pt-48">
        <Image
          src="/logo/veragua-icon.png"
          alt=""
          width={587}
          height={450}
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-16 w-[28rem] max-w-none opacity-[0.08] sm:w-[36rem]"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-300">
              {t("heroKicker")}
            </p>
            <h1 className="font-logo text-4xl italic leading-snug sm:text-5xl">
              {t("heroTitle")}
              <br />
              <span className="text-tierra-300">{t("heroHighlight")}</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl space-y-8">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
              {t("historia.kicker")}
            </p>
          </Reveal>
          {(t.raw("historia.parrafos") as string[]).map((parrafo, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="text-lg leading-relaxed text-verde-900">{parrafo}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-beige-200 px-6 py-24 md:py-32">
        <Reveal>
          <p className="mb-4 text-center text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
            {t("historiaLogo.kicker")}
          </p>
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-verde-900">
            {t("historiaLogo.introduccion")}
          </p>
          <div className="mt-16">
            <LogoStory
              titulo={t("historiaLogo.titulo")}
              subtitulo={t("historiaLogo.subtitulo")}
              placeholder={t("historiaLogo.placeholder")}
              elementos={elementos}
            />
          </div>
        </Reveal>
      </section>

      <section className="bg-beige-100 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
              {t("filosofia.kicker")}
            </p>
            <p className="mt-4 text-xl leading-relaxed text-verde-900 sm:text-2xl">
              {t("filosofia.texto")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
              {t("mision.kicker")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-verde-900 sm:text-lg">
              {t("mision.texto")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-verde-950 px-6 py-24 text-beige-100 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-300">
              {t("promesa.kicker")}
            </p>
            <p className="font-logo italic text-2xl leading-snug sm:text-3xl">
              &ldquo;{t("promesa.texto")}&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-logo italic text-2xl text-verde-950 sm:text-3xl">
              {t("principiosTitulo")}
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {principios.map((principio, i) => (
              <Reveal key={principio.titulo} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-beige-400 bg-beige-100 p-8">
                  <h3 className="font-heading text-xl text-verde-950">{principio.titulo}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-verde-800">
                    {principio.descripcion}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-beige-200 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
              {t("valores.kicker")}
            </p>
            <h2 className="font-logo italic text-2xl text-verde-950 sm:text-3xl">
              {t("valores.titulo")}
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valoresLista.map((valor, i) => (
              <Reveal key={valor.titulo} delay={i * 0.06}>
                <div className="h-full rounded-2xl bg-beige-100 p-6">
                  <span className="block h-0.5 w-8 bg-tierra-500" />
                  <h3 className="mt-4 font-heading text-lg text-verde-950">{valor.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-verde-800">
                    {valor.descripcion}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
