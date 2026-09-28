import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { CafeGallery } from "@/components/catalogo/CafeGallery";
import { products } from "@/lib/products";
import { buildHuevosOrderLink } from "@/lib/whatsapp";

const GALERIA_HUEVOS = ["/images/nosotros/huevos-hato-azul.jpg", "/images/nosotros/gallina.jpg"];
const OG_IMAGE_HUEVOS = "/images/nosotros/huevos-hato-azul.jpg";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("huevos");
  const titulo = `${t("producto.nombre")} — Veragua`;
  const descripcion = t("producto.descripcion");
  return {
    title: titulo,
    description: descripcion,
    openGraph: {
      title: titulo,
      description: descripcion,
      images: [OG_IMAGE_HUEVOS],
    },
  };
}

export default async function HuevosPage({ params }: PageProps<"/[locale]/catalogo/huevos">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("huevos");
  const localeTipada = locale as "es" | "en";

  const huevos = products.find((p) => p.slug === "huevos-de-pastoreo")!;
  const nombreProducto = t("producto.nombre");
  const enlaceWhatsApp = buildHuevosOrderLink(localeTipada);

  return (
    <>
      <section className="bg-beige-100 px-6 pb-24 pt-40 md:pt-48">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-start">
          <Reveal>
            <CafeGallery imagenes={GALERIA_HUEVOS} alt={nombreProducto} />
          </Reveal>

          <Reveal delay={0.1}>
            <span className="inline-block rounded-full bg-tierra-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-verde-950">
              {t("badge")}
            </span>
            <h1 className="mt-6 font-logo text-4xl italic text-verde-950">{nombreProducto}</h1>
            <p className="mt-4 text-base leading-relaxed text-verde-800">
              {t("producto.descripcion")}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-beige-400 py-6">
              <div>
                <dt className="text-xs uppercase tracking-wide text-tierra-600">
                  {t("ficha.sistema")}
                </dt>
                <dd className="mt-1 font-logo italic text-verde-950">{t("ficha.sistemaValor")}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-tierra-600">
                  {t("ficha.colores")}
                </dt>
                <dd className="mt-1 font-logo italic text-verde-950">{t("ficha.coloresValor")}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs uppercase tracking-wide text-tierra-600">
                  {t("ficha.presentaciones")}
                </dt>
                <dd className="mt-1 font-logo italic text-verde-950">
                  {t("ficha.presentacionesValor")}
                </dd>
              </div>
            </dl>

            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-tierra-600">
              {t("precios.kicker")}
            </p>
            <ul className="mt-3 space-y-2">
              {huevos.variantes.map((v) => (
                <li
                  key={v.id}
                  className="flex items-center justify-between border-b border-beige-400 pb-2 text-sm text-verde-900"
                >
                  <span>
                    {v.id === "marrones-x30" && t("precios.marrones30")}
                    {v.id === "marrones-x15" && t("precios.marrones15")}
                    {v.id === "azules-x30" && t("precios.azules30")}
                    {v.id === "azules-x15" && t("precios.azules15")}
                    {v.id === "mixtos-x30" && t("precios.mixtos30")}
                  </span>
                  <span className="font-logo italic text-verde-950">
                    {v.precioCOP.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={enlaceWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-verde-950 px-8 py-4 text-sm font-semibold text-beige-100 transition hover:bg-verde-800"
            >
              {t("cta")}
            </a>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-24 text-beige-100 md:py-32">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/gallinas-criollas.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-verde-950/60" aria-hidden />
        <div className="relative mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-300">
              {t("pastoreo.kicker")}
            </p>
            <h2 className="font-logo text-2xl italic leading-snug sm:text-3xl">
              {t("pastoreo.titulo")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-beige-200">{t("pastoreo.texto")}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-200 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-tierra-600">
              {t("quienLasCuida.kicker")}
            </p>
            <h2 className="mt-4 font-logo text-2xl italic leading-snug text-verde-950 sm:text-3xl">
              {t("quienLasCuida.titulo")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-verde-800">
              {t("quienLasCuida.texto")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-24 md:py-32">
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
              href={buildHuevosOrderLink(localeTipada)}
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
