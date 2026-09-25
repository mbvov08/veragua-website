import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { CafePurchase } from "@/components/catalogo/CafePurchase";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Café de Origen — Veragua",
  description:
    "Café de origen colombiano de Veragua, con compra en línea y envíos a Colombia y al mundo.",
};

export default function CafePage() {
  const cafe = products.find((p) => p.slug === "cafe-de-origen")!;

  return (
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
            Compra en línea · Envíos a Colombia y al mundo
          </span>
          <h1 className="mt-6 font-heading text-3xl text-verde-950">{cafe.nombre}</h1>
          <p className="mt-4 text-base leading-relaxed text-verde-800">{cafe.descripcion}</p>

          <div className="mt-8">
            <CafePurchase product={cafe} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
