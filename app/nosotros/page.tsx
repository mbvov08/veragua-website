import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { LogoStory } from "@/components/nosotros/LogoStory";
import { nosotros } from "@/content/nosotros";

export const metadata: Metadata = {
  title: "Nosotros — Veragua",
  description: nosotros.mision.texto,
};

export default function NosotrosPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-verde-950 px-6 pb-20 pt-40 text-beige-100 md:pt-48">
        <Image
          src="/logo/veragua-icon.png"
          alt=""
          width={587}
          height={450}
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-16 w-[28rem] max-w-none opacity-[0.08] sm:w-[36rem]"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-300">
              {nosotros.heroKicker}
            </p>
            <h1 className="font-heading text-3xl leading-snug sm:text-4xl">
              {nosotros.heroTitle}
              <br />
              <span className="text-tierra-300">{nosotros.heroHighlight}</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl space-y-8">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
              {nosotros.historia.kicker}
            </p>
          </Reveal>
          {nosotros.historia.parrafos.map((parrafo, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="text-lg leading-relaxed text-verde-900">{parrafo}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-beige-200 px-6 py-24 md:py-32">
        <Reveal>
          <p className="mb-4 text-center text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
            {nosotros.historiaLogo.kicker}
          </p>
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-verde-900">
            {nosotros.historiaLogo.introduccion}
          </p>
          <div className="mt-16">
            <LogoStory
              titulo={nosotros.historiaLogo.titulo}
              subtitulo={nosotros.historiaLogo.subtitulo}
              elementos={[...nosotros.historiaLogo.elementos]}
            />
          </div>
        </Reveal>
      </section>

      <section className="bg-beige-100 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
              {nosotros.filosofia.kicker}
            </p>
            <p className="mt-4 text-xl leading-relaxed text-verde-900 sm:text-2xl">
              {nosotros.filosofia.texto}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
              {nosotros.mision.kicker}
            </p>
            <p className="mt-4 text-base leading-relaxed text-verde-900 sm:text-lg">
              {nosotros.mision.texto}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-verde-950 px-6 py-24 text-beige-100 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-300">
              {nosotros.promesa.kicker}
            </p>
            <p className="font-heading text-2xl leading-snug sm:text-3xl">
              &ldquo;{nosotros.promesa.texto}&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl text-verde-950 sm:text-3xl">
              Los principios que guían cada decisión
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {nosotros.principios.map((principio, i) => (
              <Reveal key={principio.titulo} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-beige-400 bg-beige-100 p-8">
                  <h3 className="font-heading text-xl text-verde-950">{principio.titulo}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-verde-800">
                    {principio.descripcion}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-beige-200 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
              {nosotros.valores.kicker}
            </p>
            <h2 className="font-heading text-2xl text-verde-950 sm:text-3xl">
              {nosotros.valores.titulo}
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {nosotros.valores.lista.map((valor, i) => (
              <Reveal key={valor.titulo} delay={i * 0.06}>
                <div className="h-full rounded-2xl bg-beige-100 p-6">
                  <span className="block h-0.5 w-8 bg-tierra-500" />
                  <h3 className="mt-4 font-heading text-lg text-verde-950">{valor.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-verde-800">
                    {valor.descripcion}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
