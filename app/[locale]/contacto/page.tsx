import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { buildGeneralContactLink } from "@/lib/whatsapp";
import { socialLinks } from "@/lib/socialLinks";

const CORREOS = ["admin", "compras", "gerencia"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contacto");
  return {
    title: `${t("titulo")} — Veragua`,
    description: t("subtitulo"),
  };
}

export default async function ContactoPage({ params }: PageProps<"/[locale]/contacto">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contacto");

  return (
    <>
      <section className="bg-verde-950 px-6 pb-16 pt-40 text-beige-100 md:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-300">
              {t("kicker")}
            </p>
            <h1 className="font-logo text-4xl italic leading-snug sm:text-5xl">{t("titulo")}</h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-beige-300">{t("subtitulo")}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-20 md:py-28">
        <Reveal className="mx-auto max-w-5xl">
          <p className="text-center text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
            {t("correosKicker")}
          </p>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-5xl gap-8 md:grid-cols-3">
          {CORREOS.map((correo, i) => (
            <Reveal key={correo} delay={i * 0.1}>
              <a
                href={`mailto:${t(`correos.${correo}.email`)}`}
                className="flex h-full flex-col justify-between rounded-3xl border border-beige-400 bg-beige-100 p-8 transition hover:border-tierra-500"
              >
                <div>
                  <h2 className="font-heading text-xl text-verde-950">
                    {t(`correos.${correo}.titulo`)}
                  </h2>
                  <p className="mt-2 text-sm text-verde-800">{t(`correos.${correo}.texto`)}</p>
                </div>
                <span className="mt-6 text-sm font-semibold text-tierra-600">
                  {t(`correos.${correo}.email`)}
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-8 md:grid-cols-3">
          <Reveal>
            <a
              href={buildGeneralContactLink(locale as "es" | "en")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col justify-between rounded-3xl border border-beige-400 bg-beige-100 p-8 transition hover:border-tierra-500"
            >
              <div>
                <h2 className="font-heading text-xl text-verde-950">{t("whatsapp.titulo")}</h2>
                <p className="mt-2 text-sm text-verde-800">{t("whatsapp.texto")}</p>
              </div>
              <span className="mt-6 text-sm font-semibold text-tierra-600">
                {t("whatsapp.cta")}
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col justify-between rounded-3xl border border-beige-400 bg-beige-100 p-8 transition hover:border-tierra-500"
            >
              <div>
                <h2 className="font-heading text-xl text-verde-950">{t("instagram.titulo")}</h2>
                <p className="mt-2 text-sm text-verde-800">{t("instagram.texto")}</p>
              </div>
              <span className="mt-6 text-sm font-semibold text-tierra-600">
                {t("instagram.cta")}
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-beige-400 bg-beige-100 p-8">
              <div>
                <h2 className="font-heading text-xl text-verde-950">{t("ubicacion.titulo")}</h2>
                <p className="mt-2 text-sm text-verde-800">{t("ubicacion.direccion")}</p>
              </div>
              <p className="mt-6 text-xs text-verde-700">{t("ubicacion.entregas")}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="mt-8">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-beige-400">
            <iframe
              title="Ubicación de Veragua en Armenia, Quindío"
              src="https://www.google.com/maps?q=Carrera+14+%2327+Norte+-+80%2C+Armenia%2C+Quind%C3%ADo&output=embed"
              className="h-96 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
