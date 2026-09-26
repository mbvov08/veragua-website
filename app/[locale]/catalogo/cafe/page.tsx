import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { CafePurchase } from "@/components/catalogo/CafePurchase";
import { CafeScrollStory } from "@/components/catalogo/CafeScrollStory";
import { products, TREINTA_CATALOG_URL } from "@/lib/products";
import { buildWhatsAppLink } from "@/lib/whatsapp";

// Íconos de línea del brand book, recortados del logo completo de Veragua.
// "Bebidas" no tiene ícono propio en el brand book (solo huevos/lácteos/
// café/carnes), así que se muestra sin ícono, igual que "Artesanales".
const OTRAS_CATEGORIAS = [
  {
    titulo: "Huevos",
    icono: "/logo/icono-huevos.png",
    descripcion: "Huevos de gallinas de pastoreo, marrones, azules y mixtos.",
  },
  {
    titulo: "Lácteos",
    icono: "/logo/icono-lacteos.png",
    descripcion: "Leche, yogur, kéfir y quesos A2, elaborados por Sanorigen.",
  },
  {
    titulo: "Carnes",
    icono: "/logo/icono-carnes.png",
    descripcion: "Gallina y pollo criollo, criados en el campo.",
  },
  {
    titulo: "Bebidas",
    icono: null,
    descripcion: "Aguas y sodas artesanales Guali.",
  },
  {
    titulo: "Artesanales",
    icono: null,
    descripcion: "Arepas artesanales, frescas para el desayuno.",
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
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-tierra-400">
              El resto del catálogo
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-beige-300">
              Estos productos tienen fotos reales y precios actualizados en
              nuestro catálogo de Treinta. Míralo ahí y escríbenos por
              WhatsApp para coordinar tu pedido.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OTRAS_CATEGORIAS.map((categoria, i) => (
              <Reveal key={categoria.titulo} delay={i * 0.05}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-beige-100/10 bg-verde-900 p-8">
                  <div>
                    <div className="flex items-center gap-3">
                      {categoria.icono && (
                        <Image
                          src={categoria.icono}
                          alt=""
                          width={72}
                          height={72}
                          className="h-8 w-auto shrink-0 brightness-0 invert"
                        />
                      )}
                      <h3 className="font-logo italic text-lg text-beige-100">
                        {categoria.titulo}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-beige-300">
                      {categoria.descripcion}
                    </p>
                    <p className="mt-2 text-xs text-tierra-400">
                      Entrega bajo pedido en Armenia, Pereira y Manizales.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <a
                      href={TREINTA_CATALOG_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-tierra-400 px-5 py-2.5 text-sm font-semibold text-tierra-300 transition hover:bg-tierra-400 hover:text-verde-950"
                    >
                      Ver catálogo con fotos
                    </a>
                    <a
                      href={buildWhatsAppLink(
                        `¡Hola Veragua! Quiero pedir productos de ${categoria.titulo}. ¿Me ayudan con la disponibilidad y la entrega?`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-tierra-500 px-5 py-2.5 text-sm font-semibold text-verde-950 transition hover:bg-tierra-400"
                    >
                      Pide por WhatsApp
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
