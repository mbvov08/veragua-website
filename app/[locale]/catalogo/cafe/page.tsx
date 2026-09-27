import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { CafePurchase } from "@/components/catalogo/CafePurchase";
import { CafeScrollStory } from "@/components/catalogo/CafeScrollStory";
import { CafeGallery } from "@/components/catalogo/CafeGallery";
import { CafeReviews } from "@/components/catalogo/CafeReviews";
import { WhatsAppFloatButton } from "@/components/catalogo/WhatsAppFloatButton";
import { products, TREINTA_CATALOG_URL } from "@/lib/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type GrupoOtrosProductos = { categoria: string; items: string[] };

const GALERIA_CAFE = [
  "/images/productos/cafe-bolsa-blanco.png",
  "/images/productos/cafe-bolsa-granos.png",
  "/images/productos/cafe-bolsa-beige.png",
];
const OG_IMAGE_CAFE = "/images/productos/cafe-bolsa-granos.png";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cafe");
  const titulo = `${t("producto.nombre")} — Veragua`;
  const descripcion = t("producto.descripcion");
  return {
    title: titulo,
    description: descripcion,
    openGraph: {
      title: titulo,
      description: descripcion,
      images: [OG_IMAGE_CAFE],
    },
  };
}

export default async function CafePage({ params }: PageProps<"/[locale]/catalogo/cafe">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cafe");

  const cafe = products.find((p) => p.slug === "cafe-de-origen")!;
  const nombreProducto = t("producto.nombre");
  const otrosGrupos = t.raw("otros.grupos") as GrupoOtrosProductos[];

  return (
    <>
      <section className="bg-beige-100 px-6 pb-24 pt-40 md:pt-48">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-start">
          <Reveal>
            <CafeGallery imagenes={GALERIA_CAFE} alt={nombreProducto} />
          </Reveal>

          <Reveal delay={0.1}>
            <span className="inline-block rounded-full bg-tierra-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-verde-950">
              {t("badge")}
            </span>
            <h1 className="mt-6 font-logo text-4xl italic text-verde-950">{nombreProducto}</h1>
            <p className="mt-4 text-base leading-relaxed text-verde-800">
              {t("producto.descripcion")}
            </p>

            <div id="comprar" className="mt-8 scroll-mt-32">
              <CafePurchase product={cafe} />
            </div>
          </Reveal>
        </div>
      </section>

      <CafeScrollStory imagen={cafe.imagen} />

      <section className="bg-verde-900 px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl bg-verde-950 md:mx-0">
              <Image
                src={cafe.imagen}
                alt={nombreProducto}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 30vw, 100vw"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-tierra-400">
              {t("ficha.kicker")}
            </p>
            <h2 className="mt-3 font-logo text-2xl italic text-beige-100 sm:text-3xl">
              {t("ficha.titulo")}
            </h2>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-beige-100/15 py-6">
              <div>
                <dt className="text-xs uppercase tracking-wide text-tierra-300">
                  {t("ficha.finca")}
                </dt>
                <dd className="mt-1 font-logo italic text-beige-100">{t("ficha.fincaValor")}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-tierra-300">
                  {t("ficha.altitud")}
                </dt>
                <dd className="mt-1 font-logo italic text-beige-100">{t("ficha.altitudValor")}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-tierra-300">
                  {t("ficha.tueste")}
                </dt>
                <dd className="mt-1 font-logo italic text-beige-100">{t("ficha.tuesteValor")}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-tierra-300">
                  {t("ficha.molienda")}
                </dt>
                <dd className="mt-1 font-logo italic text-beige-100">{t("ficha.moliendaValor")}</dd>
              </div>
            </dl>

            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-tierra-300">
              {t("ficha.notasKicker")}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {t.raw("ficha.notas").map((nota: string) => (
                <span
                  key={nota}
                  className="rounded-full border border-tierra-400/60 px-4 py-1.5 text-sm text-beige-100"
                >
                  {nota}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CafeReviews />

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

      <section className="bg-verde-950 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-tierra-400">
              {t("otros.kicker")}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {otrosGrupos.map((grupo, i) => (
              <Reveal key={grupo.categoria} delay={i * 0.05}>
                <h3 className="font-logo italic text-lg text-beige-100">{grupo.categoria}</h3>
                <p className="mt-2 text-sm leading-relaxed text-beige-300">
                  {grupo.items.join(" · ")}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-col items-center gap-4 border-t border-beige-100/15 pt-10 text-center">
              <p className="max-w-md text-sm leading-relaxed text-beige-300">{t("otros.aviso")}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={TREINTA_CATALOG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-tierra-400 px-6 py-3 text-sm font-semibold text-tierra-300 transition hover:bg-tierra-400 hover:text-verde-950"
                >
                  {t("otros.conoceMas")}
                </a>
                <a
                  href={buildWhatsAppLink(t("otros.mensajeWhatsApp"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-tierra-500 px-6 py-3 text-sm font-semibold text-verde-950 transition hover:bg-tierra-400"
                >
                  {t("otros.haPedido")}
                </a>
              </div>
              <p className="text-xs text-tierra-400">{t("otros.entregaAviso")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <WhatsAppFloatButton />
    </>
  );
}
