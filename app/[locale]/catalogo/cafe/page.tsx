import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { CafePurchase } from "@/components/catalogo/CafePurchase";
import { CafeScrollStory } from "@/components/catalogo/CafeScrollStory";
import { products } from "@/lib/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Café de Origen — Veragua",
  description:
    "Café de origen colombiano de Veragua, con compra en línea y envíos a Colombia y al mundo.",
};

export default async function CafePage({ params }: PageProps<"/[locale]/catalogo/cafe">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cafe");

  const cafe = products.find((p) => p.slug === "cafe-de-origen")!;
  const paqueton = cafe.variantes.find((v) => v.id === "5lb-molido")!;

  return (
    <>
      <section className="bg-beige-100 px-6 pb-24 pt-40 md:pt-48">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-start">
          <Reveal>
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-beige-300">
              <Image
                src={cafe.imagen}
                alt={cafe.nombre}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 40vw, 100vw"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="inline-block rounded-full bg-tierra-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-verde-950">
              {t("badge")}
            </span>
            <h1 className="mt-6 font-logo text-4xl italic text-verde-950">{cafe.nombre}</h1>
            <p className="mt-4 text-base leading-relaxed text-verde-800">{cafe.descripcion}</p>

            <div id="comprar" className="mt-8 scroll-mt-32">
              <CafePurchase product={cafe} />
            </div>
          </Reveal>
        </div>
      </section>

      <CafeScrollStory imagen={cafe.imagen} />

      <section className="border-y border-tierra-500/30 bg-verde-950 px-6 py-16 md:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-tierra-400">
              {t("combo.kicker")}
            </p>
            <h2 className="mt-3 font-logo text-2xl italic text-beige-100 sm:text-3xl">
              {t("combo.titulo")}
            </h2>
            <p className="mt-3 text-sm text-beige-300">
              {t("combo.texto", { unidad: paqueton.unidad })}
            </p>
          </div>
          <a
            href="#comprar"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-tierra-500 px-8 py-4 text-sm font-semibold text-verde-950 transition hover:bg-tierra-400"
          >
            {t("combo.cta")}
          </a>
        </div>
      </section>

      <section className="bg-beige-200 px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-tierra-600">
              {t("negocio.kicker")}
            </p>
            <h2 className="mt-4 font-logo text-2xl italic leading-snug text-verde-950 sm:text-3xl">
              {t("negocio.titulo")}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-verde-800">
              {t("negocio.texto")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={buildWhatsAppLink(t("negocio.mensajeWhatsApp"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-verde-950 px-8 py-4 text-sm font-semibold text-beige-100 transition hover:bg-verde-800"
            >
              {t("negocio.cta")}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
