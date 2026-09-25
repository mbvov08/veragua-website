import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/catalogo/ProductCard";
import { products, type Product } from "@/lib/products";

// Íconos de línea del brand book, recortados del logo completo de Veragua.
// "Bebidas" no tiene ícono propio en el brand book (solo huevos/lácteos/
// café/carnes), así que se muestra sin ícono, igual que "Artesanales".
const CATEGORY_ICONS: Record<string, string> = {
  Huevos: "/logo/icono-huevos.png",
  Lácteos: "/logo/icono-lacteos.png",
  Café: "/logo/icono-cafe-cereales.png",
  Carnes: "/logo/icono-carnes.png",
};

export const metadata: Metadata = {
  title: "Catálogo — Veragua",
  description:
    "Café de origen con compra en línea, y huevos, lácteos y productos artesanales bajo pedido por WhatsApp.",
};

export default function CatalogoPage() {
  const cafe = products.filter((p) => p.categoria === "cafe");
  const huevos = products.filter((p) => p.categoria === "huevos");
  const lacteos = products.filter((p) => p.categoria === "lacteos");
  const carnes = products.filter((p) => p.categoria === "carnes");
  const bebidas = products.filter((p) => p.categoria === "bebidas");
  const artesanales = products.filter((p) => p.categoria === "artesanales");

  return (
    <>
      <section className="bg-verde-950 px-6 pb-16 pt-40 text-beige-100 md:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-300">
              Catálogo
            </p>
            <h1 className="font-heading text-3xl leading-snug sm:text-4xl">
              El café se compra en línea. Todo lo demás, a un mensaje de distancia.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-beige-300">
              Busca la etiqueta &ldquo;Compra en línea&rdquo; para pagar directamente
              aquí, o &ldquo;Pide por WhatsApp&rdquo; para coordinar tu pedido con
              entrega en Armenia, Pereira y Manizales.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl space-y-20">
          <CategoryGrid title="Café" products={cafe} />
          <CategoryGrid title="Huevos" products={huevos} />
          <CategoryGrid title="Lácteos" products={lacteos} />
          <CategoryGrid title="Carnes" products={carnes} />
          <CategoryGrid title="Bebidas" products={bebidas} />
          <CategoryGrid title="Artesanales" products={artesanales} />
        </div>
      </section>
    </>
  );
}

function CategoryGrid({ title, products }: { title: string; products: Product[] }) {
  if (products.length === 0) return null;
  const icon = CATEGORY_ICONS[title];

  return (
    <div>
      <Reveal>
        <div className="flex items-center gap-4">
          {icon && (
            <Image
              src={icon}
              alt=""
              width={72}
              height={72}
              className="h-10 w-auto shrink-0"
            />
          )}
          <h2 className="font-heading text-xl text-verde-950 sm:text-2xl">{title}</h2>
        </div>
      </Reveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <Reveal key={product.slug} delay={i * 0.05}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
