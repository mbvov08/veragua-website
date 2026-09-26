import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { PlanCard } from "@/components/suscripciones/PlanCard";
import { subscriptionPlans } from "@/lib/subscriptions";

export const metadata: Metadata = {
  title: "Suscripciones — Veragua",
  description:
    "Planes de suscripción semanal de Veragua: huevos, lácteos y desayuno completo, con descuento cada mes.",
};

export default function SuscripcionesPage() {
  return (
    <>
      <section className="bg-verde-950 px-6 pb-16 pt-40 text-beige-100 md:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-300">
              Suscripciones
            </p>
            <h1 className="font-logo text-3xl italic leading-snug sm:text-4xl">
              Tu pedido de la semana, listo cada vez.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-beige-300">
              Elige tu plan y el día de entrega que prefieras. Cada mes renuevas con un
              pago manual: no guardamos tu tarjeta ni hacemos cobros automáticos.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige-100 px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {subscriptionPlans.map((plan, i) => (
            <Reveal key={plan.slug} delay={i * 0.1}>
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-beige-200 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">
              ¿Ninguno se ajusta del todo?
            </p>
            <h2 className="font-heading text-2xl text-verde-950 sm:text-3xl">
              Arma tu Plan Personalizado.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-verde-800">
              Responde unas preguntas sobre tu hogar y calculamos las cantidades
              exactas que necesitas, con el mismo 5% de descuento. Entregas en
              Armenia y Pereira.
            </p>
            <Link
              href="/suscripciones/personalizado"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-verde-950 px-8 py-4 text-sm font-semibold text-beige-100 transition hover:bg-verde-800"
            >
              Armar mi plan
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
