import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/catalogo/ProductCard";
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
  title: "Catálogo — Veragua",
  description:
    "Café de origen con compra en línea, y huevos, lácteos, carnes, bebidas y artesanales bajo pedido por WhatsApp.",
};

export default function CatalogoPage() {
  const cafe = products.filter((p) => p.categoria === "cafe");

  return (
    <>
      <section className="bg-verde-950 px-6 pb-16 pt-40 text-beige-100 md:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-300">
              Catálogo
            </p>
            <h1 className="font-logo text-2xl italic leading-snug sm:text-3xl">
              El café se compra en línea. Todo lo demás, a un mensaje de distancia.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-beige-300">
              Busca la etiqueta &ldquo;Compra en línea&rdquo; para pagar directamente
              aquí, o consulta nuestro catálogo completo con fotos y pide por
              WhatsApp, con entrega en Armenia, Pereira y Manizales.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl space-y-20">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <Image
                  src="/logo/icono-cafe-cereales.png"
                  alt=""
                  width={72}
                  height={72}
                  className="h-10 w-auto shrink-0"
                />
                <h2 className="text-xl text-verde-950 sm:text-2xl">Café</h2>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cafe.map((product, i) => (
                <Reveal key={product.slug} delay={i * 0.05}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-verde-700">
                El resto de nuestros productos tiene fotos reales y precios
                actualizados en nuestro catálogo de Treinta. Míralo ahí y
                escríbenos por WhatsApp para coordinar tu pedido.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {OTRAS_CATEGORIAS.map((categoria, i) => (
                <Reveal key={categoria.titulo} delay={i * 0.05}>
                  <div className="flex h-full flex-col justify-between rounded-3xl border border-beige-400 bg-beige-100 p-8">
                    <div>
                      <div className="flex items-center gap-3">
                        {categoria.icono && (
                          <Image
                            src={categoria.icono}
                            alt=""
                            width={72}
                            height={72}
                            className="h-8 w-auto shrink-0"
                          />
                        )}
                        <h3 className="text-lg text-verde-950">{categoria.titulo}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-verde-800">
                        {categoria.descripcion}
                      </p>
                      <p className="mt-2 text-xs text-verde-700">
                        Entrega bajo pedido en Armenia, Pereira y Manizales.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                      <a
                        href={TREINTA_CATALOG_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-verde-950 px-5 py-2.5 text-sm font-semibold text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
                      >
                        Ver catálogo con fotos
                      </a>
                      <a
                        href={buildWhatsAppLink(
                          `¡Hola Veragua! Quiero pedir productos de ${categoria.titulo}. ¿Me ayudan con la disponibilidad y la entrega?`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-verde-950 px-5 py-2.5 text-sm font-semibold text-beige-100 transition hover:bg-verde-800"
                      >
                        Pide por WhatsApp
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
