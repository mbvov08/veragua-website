import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";

// Página legal en español, independiente del idioma del sitio: el tratamiento
// de datos personales se rige por la ley colombiana (Ley 1581 de 2012) y
// aplica igual sin importar en qué idioma esté navegando la persona.
export const metadata: Metadata = {
  title: "Política de Privacidad — Veragua",
  description:
    "Cómo Veragua recolecta, usa y protege tus datos personales, de acuerdo con la Ley 1581 de 2012.",
};

export default async function PoliticaDePrivacidadPage({
  params,
}: PageProps<"/[locale]/politica-de-privacidad">) {
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
              Política de Privacidad
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-sm text-beige-300">
              Última actualización: septiembre de 2026
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-16 md:py-24">
        <Reveal>
          <div className="prose-veragua mx-auto max-w-3xl space-y-8 text-base leading-relaxed text-verde-800">
            <p>
              En Veragua valoramos la confianza que depositas en nosotros al compartir tus datos
              para procesar tu pedido. Esta política te cuenta, de forma clara, qué información
              recolectamos, para qué la usamos y cómo puedes ejercer tus derechos, en línea con la
              Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia.
            </p>

            <div>
              <h2 className="font-heading text-xl text-verde-950">1. Responsable del tratamiento</h2>
              <p className="mt-3">
                Veragua
                <br />
                NIT: 1092851991-0
                <br />
                Dirección: Carrera 14 # 27 Norte - 80, Armenia, Quindío, Colombia
                <br />
                Correo de contacto: compras@veraguaalimentos.com
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl text-verde-950">2. Datos que recolectamos</h2>
              <p className="mt-3">Cuando realizas una compra o nos escribes, guardamos datos como:</p>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>Nombre completo y datos de contacto (teléfono).</li>
                <li>Dirección de envío (dirección, ciudad y departamento).</li>
                <li>
                  Datos de la transacción de pago, que viajan cifrados directamente a nuestro
                  procesador de pagos (Wompi) — Veragua nunca almacena los datos completos de tu
                  tarjeta.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-xl text-verde-950">3. Para qué usamos tus datos</h2>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>Procesar y despachar tu pedido, y coordinar el envío contigo por WhatsApp.</li>
                <li>Responder tus preguntas y darte soporte postventa.</li>
                <li>
                  Cumplir con nuestras obligaciones legales, contables y tributarias.
                </li>
                <li>
                  Medir y mejorar nuestras campañas de publicidad (por ejemplo, en Meta Ads y
                  Google), usando información agregada y estadística.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-xl text-verde-950">4. Con quién compartimos tus datos</h2>
              <p className="mt-3">
                Compartimos tus datos únicamente con los aliados que necesitamos para completar tu
                pedido: nuestro procesador de pagos (Wompi) y la transportadora encargada de tu
                envío. Estos aliados están obligados a proteger tu información y usarla solo para
                el fin acordado.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl text-verde-950">5. Tus derechos</h2>
              <p className="mt-3">Como titular de tus datos, en todo momento puedes:</p>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>Conocer, actualizar y rectificar tus datos.</li>
                <li>Solicitar prueba de la autorización otorgada para su tratamiento.</li>
                <li>Solicitar la supresión de tus datos cuando ya no sean necesarios.</li>
                <li>Revocar la autorización que nos diste para tratarlos.</li>
                <li>Presentar quejas ante la Superintendencia de Industria y Comercio.</li>
              </ul>
              <p className="mt-3">
                Para ejercer cualquiera de estos derechos, escríbenos a{" "}
                <span className="font-semibold">compras@veraguaalimentos.com</span> o por
                WhatsApp, y atendemos tu solicitud dentro de los términos que establece la ley.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl text-verde-950">6. Seguridad de la información</h2>
              <p className="mt-3">
                Aplicamos medidas técnicas y organizativas razonables para proteger tus datos frente
                a acceso, pérdida o uso indebido, y guardamos solo la información necesaria para
                atenderte.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl text-verde-950">7. Cambios a esta política</h2>
              <p className="mt-3">
                Podemos actualizar esta política para reflejar mejoras en nuestros procesos o
                cambios normativos. Publicaremos siempre la versión vigente en esta misma página.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
