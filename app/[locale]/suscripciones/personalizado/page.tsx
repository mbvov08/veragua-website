import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { ConfiguratorLoader } from "@/components/configurador/ConfiguratorLoader";

export const metadata: Metadata = {
  title: "Plan Personalizado — Veragua",
  description:
    "Arma tu propia suscripción de Veragua a la medida de tu hogar: huevos, lácteos, arepas y café calculados para ti.",
};

export default function PlanPersonalizadoPage() {
  return (
    <>
      <section className="bg-verde-950 px-6 pb-16 pt-40 text-beige-100 md:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-300">
              Plan Personalizado
            </p>
            <h1 className="font-logo text-3xl italic leading-snug sm:text-4xl">
              Tu suscripción, calculada a tu medida.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-beige-300">
              Responde unas preguntas sobre tu hogar y armamos un plan con las
              cantidades justas que necesitas, con el mismo 5% de descuento y sin
              tarjeta guardada.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-16 md:py-24">
        <ConfiguratorLoader />
      </section>
    </>
  );
}
