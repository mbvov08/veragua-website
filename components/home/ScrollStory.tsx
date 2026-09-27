"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";

export function ScrollStory() {
  const n = useTranslations("nosotros");
  const s = useTranslations("home.scrollStory");

  return (
    <>
      <section className="bg-verde-950 px-6 py-28 text-beige-100 md:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-300">
              {n("mision.kicker")}
            </p>
            <p className="font-logo italic text-lg leading-snug sm:text-xl md:text-2xl">
              {n("mision.texto")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-200 px-6 py-28 md:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
              {n("diferenciacion.kicker")}
            </p>
            <h2 className="font-logo text-3xl italic leading-snug text-verde-950 sm:text-4xl md:text-5xl">
              {n("diferenciacion.titulo")}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-verde-800 sm:text-lg">
              {n("diferenciacion.texto")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-200 px-6 py-28 md:py-36">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
              {s("catalogoKicker")}
            </p>
            <h2 className="font-logo text-2xl italic leading-snug text-verde-950 sm:text-3xl">
              {s("catalogoTitulo")}
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col justify-between rounded-3xl bg-verde-950 p-10 text-beige-100">
                <div>
                  <span className="inline-block rounded-full bg-tierra-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-verde-950">
                    {s("cafeBadge")}
                  </span>
                  <h3 className="mt-6 font-heading text-xl">{s("cafeTitulo")}</h3>
                  <p className="mt-3 text-sm text-beige-300">{s("cafeTexto")}</p>
                </div>
                <Link
                  href="/catalogo/cafe#comprar"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-tierra-500 px-6 py-3 text-sm font-semibold text-verde-950 transition hover:bg-tierra-400"
                >
                  {s("cafeCta")}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex h-full flex-col justify-between rounded-3xl bg-beige-100 p-10">
                <div>
                  <span className="inline-block rounded-full bg-verde-800 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-beige-100">
                    {s("otrosBadge")}
                  </span>
                  <h3 className="mt-6 font-heading text-xl text-verde-950">{s("otrosTitulo")}</h3>
                  <p className="mt-3 text-sm text-verde-800">{s("otrosTexto")}</p>
                </div>
                <Link
                  href="/catalogo/cafe"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border-2 border-verde-950 px-6 py-3 text-sm font-semibold text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
                >
                  {s("otrosCta")}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Bloque sólido de Amarillo Tierra — combinación tomada del brand book
          (logo/contenido en verde oscuro sobre fondo amarillo tierra). */}
      <section className="bg-tierra-500 px-6 py-28 md:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-verde-950">
              {s("suscripcionesKicker")}
            </p>
            <h2 className="font-logo text-2xl italic leading-snug text-verde-950 sm:text-3xl">
              {s("suscripcionesTitulo")}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-verde-950">
              {s("suscripcionesTexto")}
            </p>
            <Link
              href="/suscripciones"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-verde-950 px-8 py-4 text-sm font-semibold text-beige-100 transition hover:bg-verde-800"
            >
              {s("suscripcionesCta")}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
