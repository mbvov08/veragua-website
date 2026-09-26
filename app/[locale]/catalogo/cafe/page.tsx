import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { CafePurchase } from "@/components/catalogo/CafePurchase";
import { CafeScrollStory } from "@/components/catalogo/CafeScrollStory";
import { products, TREINTA_CATALOG_URL } from "@/lib/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";

// Listado simple de todo lo demás que se consigue en el catálogo de Treinta
// (sincronizado a mano contra esa URL — ver la nota en lib/products.ts).
// A propósito NO son tarjetas individuales: el cliente solo pidió una lista
// para "conocer más" antes de mandar el link de Treinta + WhatsApp.
const OTROS_PRODUCTOS = [
  {
    categoria: "Huevos",
    items: ["Huevos Marrones x15", "Huevos Marrones x30", "Huevos Azules x15", "Huevos Azules x30", "Huevos Mixtos x30"],
  },
  {
    categoria: "Carnes",
    items: ["Gallina entera congelada", "Pollo criollo entero congelado"],
  },
  {
    categoria: "Artesanales",
    items: ["Arepas Finas de Fátima"],
  },
  {
    categoria: "Lácteos A2 Sanorigen",
    items: ["Leche A2", "Kéfir A2", "Yogur líquido A2", "Yogur griego A2", "Queso fresco A2", "Queso parrillero A2"],
  },
  {
    categoria: "Bebidas Guali",
    items: ["Agua con gas", "Agua sin gas", "Soda de jengibre", "Soda de limón"],
  },
  {
    categoria: "Postres Sanorigen",
    items: ["Gelato (más de 15 sabores)", "Paletas surtidas", "Galletas (chocolate, churro, milo)", "Granola con miel"],
  },
] as const;

export const metadata: Metadata = {
  title: "Compra ahora — Veragua",
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

      <section className="bg-verde-900 px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl bg-verde-950 md:mx-0">
              <Image
                src={cafe.imagen}
                alt={cafe.nombre}
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

      <section className="bg-verde-950 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-tierra-400">
              También encuentras en Veragua
            </p>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {OTROS_PRODUCTOS.map((grupo, i) => (
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
              <p className="max-w-md text-sm leading-relaxed text-beige-300">
                Para conocer más de estos productos —fotos, presentaciones y
                disponibilidad— entra a nuestro catálogo de Treinta, y
                finalmente haz tu pedido por WhatsApp.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={TREINTA_CATALOG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-tierra-400 px-6 py-3 text-sm font-semibold text-tierra-300 transition hover:bg-tierra-400 hover:text-verde-950"
                >
                  Conoce más aquí
                </a>
                <a
                  href={buildWhatsAppLink(
                    "¡Hola Veragua! Quiero hacer un pedido de productos que vi en su catálogo."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-tierra-500 px-6 py-3 text-sm font-semibold text-verde-950 transition hover:bg-tierra-400"
                >
                  Haz tu pedido por WhatsApp
                </a>
              </div>
              <p className="text-xs text-tierra-400">
                Entrega bajo pedido en Armenia, Pereira y Manizales.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
