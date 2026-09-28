"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

const PASOS = ["01", "02", "03", "04", "05"] as const;

// En escritorio, la imagen y el texto quedan fijos (sticky), centrados en el
// viewport, y solo se ve un paso a la vez: la persona hace scroll a través de
// un contenedor alto (uno de estos "vh" por paso) que nunca se muestra —
// solo controla cuánto hay que scrollear para pasar al siguiente letrero,
// que hace un crossfade con el anterior. En celular no hay espacio para fijar
// nada, así que ahí se mantiene la lista simple de toda la vida.
export function CafeScrollStory({ imagen }: { imagen: string }) {
  const t = useTranslations("cafe.historia");
  const [activo, setActivo] = useState(0);
  const contenedorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function actualizarActivo() {
      const contenedor = contenedorRef.current;
      if (!contenedor) return;

      const rect = contenedor.getBoundingClientRect();
      const centroViewport = window.innerHeight / 2;
      const progreso = (centroViewport - rect.top) / rect.height;
      const indice = Math.min(
        PASOS.length - 1,
        Math.max(0, Math.floor(progreso * PASOS.length))
      );
      setActivo(indice);
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
    <section className="bg-verde-950 text-beige-100">
      {/* Desktop: contenedor alto que solo da espacio de scroll; el bloque
          fijo (sticky) adentro es lo único que se ve. */}
      <div ref={contenedorRef} className="hidden md:block md:h-[400vh]">
        <div className="sticky top-0 flex h-screen items-center px-6">
          <div className="mx-auto grid w-full max-w-5xl gap-16 md:grid-cols-2 md:items-center">
            <div className="flex flex-col items-center gap-6">
              <div className="relative aspect-square w-full max-w-sm">
                <Image
                  src={imagen}
                  alt="Café de Origen Veragua"
                  fill
                  className="object-contain drop-shadow-[0_35px_40px_rgba(0,0,0,0.55)]"
                  sizes="400px"
                />
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

            <div className="relative min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activo}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-tierra-500">
                    {t(`${PASOS[activo]}.kicker`)}
                  </p>
                  <h3 className="mt-4 font-logo text-3xl font-medium italic text-beige-100 sm:text-4xl">
                    {t(`${PASOS[activo]}.titulo`)}
                  </h3>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-beige-300">
                    {t(`${PASOS[activo]}.texto`)}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Celular: lista simple, sin sticky. */}
      <div className="px-6 py-24 md:hidden">
        <div className="mx-auto flex max-w-5xl flex-col gap-32">
          <div className="relative aspect-square w-full max-w-sm">
            <Image
              src={imagen}
              alt="Café de Origen Veragua"
              fill
              className="object-contain drop-shadow-[0_35px_40px_rgba(0,0,0,0.55)]"
              sizes="400px"
            />
          </div>

          {PASOS.map((numero) => (
            <Reveal key={numero}>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-tierra-500">
                {t(`${numero}.kicker`)}
              </p>
              <h3 className="mt-4 font-logo text-3xl font-medium italic text-beige-100 sm:text-4xl">
                {t(`${numero}.titulo`)}
              </h3>
              <p className="mt-6 max-w-md text-base leading-relaxed text-beige-300">
                {t(`${numero}.texto`)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
