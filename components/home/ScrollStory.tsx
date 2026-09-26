import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { nosotros } from "@/content/nosotros";

export function ScrollStory() {
  return (
    <>
      <section className="bg-beige-100 px-6 py-28 md:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
              {nosotros.mision.kicker}
            </p>
            <p className="font-logo italic text-lg leading-snug text-verde-950 sm:text-xl md:text-2xl">
              {nosotros.mision.texto}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-verde-950 px-6 py-28 text-beige-100 md:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-300">
              {nosotros.diferenciacion.kicker}
            </p>
            <h2 className="font-logo text-3xl italic leading-snug sm:text-4xl md:text-5xl">
              {nosotros.diferenciacion.titulo}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-beige-300 sm:text-lg">
              {nosotros.diferenciacion.texto}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-200 px-6 py-28 md:py-36">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
              Nuestro catálogo
            </p>
            <h2 className="font-logo text-2xl italic leading-snug text-verde-950 sm:text-3xl">
              Café con compra en línea. Todo lo demás, a un mensaje de distancia.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col justify-between rounded-3xl bg-verde-950 p-10 text-beige-100">
                <div>
                  <span className="inline-block rounded-full bg-tierra-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-verde-950">
                    Compra en línea
                  </span>
                  <h3 className="mt-6 font-heading text-xl">Café de Origen</h3>
                  <p className="mt-3 text-sm text-beige-300">
                    Pago seguro con Wompi, envíos a Colombia y al mundo.
                  </p>
                </div>
                <Link
                  href="/catalogo/cafe"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-tierra-500 px-6 py-3 text-sm font-semibold text-verde-950 transition hover:bg-tierra-400"
                >
                  Comprar café
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex h-full flex-col justify-between rounded-3xl bg-beige-100 p-10">
                <div>
                  <span className="inline-block rounded-full bg-verde-800 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-beige-100">
                    Pide por WhatsApp
                  </span>
                  <h3 className="mt-6 font-heading text-xl text-verde-950">
                    Huevos, lácteos, artesanales
                  </h3>
                  <p className="mt-3 text-sm text-verde-800">
                    Entrega bajo pedido en Armenia, Pereira y Manizales.
                  </p>
                </div>
                <Link
                  href="/catalogo"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border-2 border-verde-950 px-6 py-3 text-sm font-semibold text-verde-950 transition hover:bg-verde-950 hover:text-beige-100"
                >
                  Ver catálogo completo
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Bloque sólido de Amarillo Tierra — combinación tomada del brand book
          (logo/contenido en verde oscuro sobre fondo amarillo tierra). */}
      <section className="bg-tierra-500 px-6 py-28 md:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-verde-950">
              Suscripciones
            </p>
            <h2 className="font-logo text-2xl italic leading-snug text-verde-950 sm:text-3xl">
              Tu pedido de la semana, sin tener que pensarlo.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-verde-950">
              Elige tu plan, escoge el día que prefieres recibirlo y ahorra frente a
              comprarlo todo por separado.
            </p>
            <Link
              href="/suscripciones"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-verde-950 px-8 py-4 text-sm font-semibold text-beige-100 transition hover:bg-verde-800"
            >
              Ver planes de suscripción
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
