import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";

// Página legal en español, independiente del idioma del sitio: el Estatuto
// del Consumidor colombiano (Ley 1480 de 2011) aplica igual sin importar en
// qué idioma esté navegando la persona.
export const metadata: Metadata = {
  title: "Cambios y Devoluciones — Veragua",
  description:
    "Nuestra política de cambios, devoluciones y derecho de retracto, de acuerdo con la Ley 1480 de 2011.",
};

export default async function CambiosYDevolucionesPage({
  params,
}: PageProps<"/[locale]/cambios-y-devoluciones">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <section className="bg-verde-950 px-6 pb-16 pt-40 text-beige-100 md:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-300">
              Información legal
            </p>
            <h1 className="font-logo text-2xl italic leading-snug sm:text-3xl">
              Política de Cambios, Devoluciones y Garantías
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-sm text-beige-300">
              Última actualización: septiembre de 2026
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-16 md:py-24">
        <Reveal>
          <div className="mx-auto max-w-3xl space-y-8 text-base leading-relaxed text-verde-800">
            <p>
              Queremos que compres con toda tranquilidad. Esta política resume tus derechos como
              comprador en línea, de acuerdo con la Ley 1480 de 2011 (Estatuto del Consumidor) de
              Colombia.
            </p>

            <div>
              <h2 className="font-heading text-xl text-verde-950">1. Responsable</h2>
              <p className="mt-3">
                Veragua
                <br />
                NIT: 1092851991-0
                <br />
                Dirección: Carrera 14 # 27 Norte - 80, Local 109, Armenia, Quindío, Colombia
                <br />
                Correo de contacto: compras@veraguaalimentos.com
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl text-verde-950">2. Derecho de retracto</h2>
              <p className="mt-3">
                Al tratarse de una compra por medios electrónicos, tienes derecho a retractarte de
                tu compra dentro de los cinco (5) días hábiles siguientes a la entrega del producto,
                sin necesidad de justificar tu decisión, según el artículo 47 de la Ley 1480 de
                2011.
              </p>
              <p className="mt-3">
                Para ejercerlo, escríbenos por WhatsApp o al correo{" "}
                <span className="font-semibold">compras@veraguaalimentos.com</span> dentro de ese
                plazo, indicando tu número de pedido. Te confirmamos el proceso y el reembolso se
                realiza por el mismo medio de pago que usaste, dentro de los términos que fija la
                ley.
              </p>
              <p className="mt-3">
                Por tratarse de un producto alimenticio, el café debe conservarse cerrado y en su
                empaque original para que el retracto sea procedente, salvo que el producto llegue
                en mal estado o no corresponda a lo pedido — en ese caso, la garantía legal (numeral
                3) aplica sin ninguna condición adicional.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl text-verde-950">3. Garantía legal</h2>
              <p className="mt-3">
                Todo producto de Veragua cuenta con garantía legal frente a cualquier defecto de
                calidad o inconsistencia con lo ofrecido en la página. Si tu café llega en mal
                estado, con el empaque averiado o no corresponde a lo que compraste, escríbenos con
                fotos del producto y del empaque, y coordinamos contigo el cambio o la devolución
                de tu dinero sin costo adicional.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl text-verde-950">4. Cómo solicitar un cambio o devolución</h2>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>Escríbenos por WhatsApp contándonos qué pasó, con tu número de pedido.</li>
                <li>Comparte fotos del producto recibido cuando aplique.</li>
                <li>
                  Te confirmamos los siguientes pasos y el tiempo estimado de respuesta, siempre en
                  contacto directo contigo hasta resolverlo.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-xl text-verde-950">5. Tiempos de entrega</h2>
              <p className="mt-3">
                Despachamos los pedidos de café dentro de un máximo de 48 horas hábiles después de
                confirmado el pago, y tu pedido llega a la puerta de tu casa en alrededor de 5 días
                hábiles, según tu ubicación. El envío se coordina con la transportadora y se paga
                contra entrega, salvo en compras superiores a $200.000, donde el envío es gratis.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
