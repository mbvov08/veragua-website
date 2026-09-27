"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const PASOS = ["01", "02", "03", "04", "05"] as const;

// Imagen fija a la izquierda (sticky) mientras el texto de la derecha avanza
// paso a paso al hacer scroll — cada paso se activa cuando cruza el centro
// del viewport (IntersectionObserver), sin necesidad de librerías de scroll.
export function CafeScrollStory({ imagen }: { imagen: string }) {
  const t = useTranslations("cafe.historia");
  const [activo, setActivo] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Un IntersectionObserver con una banda central angosta puede "saltarse"
    // un paso si el usuario hace scroll rápido (el paso nunca queda marcado
    // como intersecting en ningún frame renderizado). En su lugar, en cada
    // scroll calculamos qué paso tiene su centro más cerca del centro del
    // viewport — así nunca se pierde un paso sin importar la velocidad.
    function actualizarActivo() {
      const centroViewport = window.innerHeight / 2;
      let mejorIndice = 0;
      let mejorDistancia = Infinity;

      refs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const centroEl = rect.top + rect.height / 2;
        const distancia = Math.abs(centroEl - centroViewport);
        if (distancia < mejorDistancia) {
          mejorDistancia = distancia;
          mejorIndice = i;
        }
      });

      setActivo(mejorIndice);
    }

    actualizarActivo();
    window.addEventListener("scroll", actualizarActivo, { passive: true });
    window.addEventListener("resize", actualizarActivo);
    return () => {
      window.removeEventListener("scroll", actualizarActivo);
      window.removeEventListener("resize", actualizarActivo);
    };
  }, []);

  return (
    <section className="bg-verde-950 px-6 py-24 text-beige-100 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-16 md:grid-cols-2">
          <div className="hidden md:block">
            <div className="sticky top-32 flex flex-col items-center gap-6">
              <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl bg-verde-900">
                <Image src={imagen} alt="Café de Origen Veragua" fill className="object-cover" sizes="400px" />
              </div>
              <div className="flex gap-2">
                {PASOS.map((numero, i) => (
                  <span
                    key={numero}
                    className={`h-1.5 w-1.5 rounded-full transition ${
                      i === activo ? "bg-tierra-500" : "bg-verde-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-32 md:gap-48">
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl bg-verde-900 md:hidden">
              <Image src={imagen} alt="Café de Origen Veragua" fill className="object-cover" sizes="400px" />
            </div>

            {PASOS.map((numero, i) => (
              <div
                key={numero}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={`transition-opacity duration-500 ${
                  i === activo ? "opacity-100" : "opacity-40"
                }`}
              >
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-tierra-500">
                  {t(`${numero}.kicker`)}
                </p>
                <h3 className="mt-4 font-logo text-3xl font-medium italic text-beige-100 sm:text-4xl">
                  {t(`${numero}.titulo`)}
                </h3>
                <p className="mt-6 max-w-md text-base leading-relaxed text-beige-300">
                  {t(`${numero}.texto`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
