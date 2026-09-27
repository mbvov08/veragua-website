import { getTranslations } from "next-intl/server";
import { cafeReviews } from "@/lib/reviews";
import { Reveal } from "@/components/ui/Reveal";

export async function CafeReviews() {
  if (cafeReviews.length === 0) return null;

  const t = await getTranslations("cafe.resenas");

  return (
    <section className="bg-beige-100 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-tierra-600">
            {t("kicker")}
          </p>
          <h2 className="mt-3 text-center font-logo text-2xl italic text-verde-950 sm:text-3xl">
            {t("titulo")}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {cafeReviews.map((review, i) => (
            <Reveal key={`${review.nombre}-${i}`} delay={i * 0.05}>
              <div className="h-full rounded-3xl border border-beige-400 bg-white p-6">
                <p className="text-sm leading-relaxed text-verde-800">“{review.texto}”</p>
                <p className="mt-4 text-sm font-semibold text-verde-950">{review.nombre}</p>
                <p className="text-xs text-verde-700">{review.ciudad}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
