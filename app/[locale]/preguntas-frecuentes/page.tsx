import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { SocialEmbed } from "@/components/faq/SocialEmbed";
import { faqs, socialEmbeds } from "@/content/faq";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes — Veragua",
  description: "Resolvemos tus dudas sobre productos, entregas y suscripciones de Veragua.",
};

export default function FaqPage() {
  return (
    <>
      <section className="bg-verde-950 px-6 pb-16 pt-40 text-beige-100 md:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-300">
              Preguntas Frecuentes
            </p>
            <h1 className="font-logo text-2xl italic leading-snug sm:text-3xl">
              Todo lo que quieres saber antes de pedir.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-200 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
              Míralo con tus propios ojos
            </p>
            <h2 className="font-heading text-2xl text-verde-950 sm:text-3xl">
              Preferimos mostrarte el proceso, no solo contártelo.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <Reveal delay={0.1}>
              <SocialEmbed
                label={socialEmbeds.instagram.label}
                url={socialEmbeds.instagram.url}
                descripcion="Síguenos para ver el día a día en el campo, las gallinas de pastoreo y cómo preparamos cada producto."
              />
            </Reveal>
            <Reveal delay={0.2}>
              <SocialEmbed
                label={socialEmbeds.tiktok.label}
                url={socialEmbeds.tiktok.url}
                descripcion="Videos cortos mostrando el proceso real de producción, de principio a fin."
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
