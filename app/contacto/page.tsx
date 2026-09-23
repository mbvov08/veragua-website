import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { buildGeneralContactLink } from "@/lib/whatsapp";
import { socialEmbeds } from "@/content/faq";

export const metadata: Metadata = {
  title: "Contacto — Veragua",
  description: "Escríbenos por WhatsApp, síguenos en redes o visítanos en Armenia, Quindío.",
};

export default function ContactoPage() {
  return (
    <>
      <section className="bg-verde-950 px-6 pb-16 pt-40 text-beige-100 md:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-300">
              Contacto
            </p>
            <h1 className="font-heading text-3xl leading-snug sm:text-4xl">
              Hablemos.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-beige-300">
              Escríbenos y con gusto te contamos más sobre nuestros productos y
              suscripciones.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          <Reveal>
            <a
              href={buildGeneralContactLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col justify-between rounded-3xl border border-beige-400 bg-beige-100 p-8 transition hover:border-tierra-500"
            >
              <div>
                <h2 className="font-heading text-xl text-verde-950">WhatsApp</h2>
                <p className="mt-2 text-sm text-verde-800">
                  La forma más rápida de resolver tus dudas y hacer tu pedido.
                </p>
              </div>
              <span className="mt-6 text-sm font-semibold text-tierra-600">
                Escribir ahora →
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href={socialEmbeds.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col justify-between rounded-3xl border border-beige-400 bg-beige-100 p-8 transition hover:border-tierra-500"
            >
              <div>
                <h2 className="font-heading text-xl text-verde-950">Instagram</h2>
                <p className="mt-2 text-sm text-verde-800">
                  Síguenos para ver el campo, los animales y el proceso real.
                </p>
              </div>
              <span className="mt-6 text-sm font-semibold text-tierra-600">
                Ir al perfil →
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-beige-400 bg-beige-100 p-8">
              <div>
                <h2 className="font-heading text-xl text-verde-950">Ubicación</h2>
                <p className="mt-2 text-sm text-verde-800">
                  Carrera 14 # 27 Norte - 80, Armenia, Quindío
                </p>
              </div>
              <p className="mt-6 text-xs text-verde-700">
                Entregas bajo pedido en Armenia, Pereira y Manizales.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="mt-8">
          <div className="overflow-hidden rounded-3xl border border-beige-400">
            <iframe
              title="Ubicación de Veragua en Armenia, Quindío"
              src="https://www.google.com/maps?q=Carrera+14+%2327+Norte+-+80%2C+Armenia%2C+Quind%C3%ADo&output=embed"
              className="h-96 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
