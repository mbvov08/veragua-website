"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type CafeGalleryProps = {
  imagenes: string[];
  alt: string;
};

// Carrusel simple con scroll-snap nativo: se desliza con el dedo en celular
// sin necesitar ninguna librería. Los puntos/miniaturas de abajo permiten
// saltar directo a una foto y siempre reflejan cuál está visible.
export function CafeGallery({ imagenes, alt }: CafeGalleryProps) {
  const [activo, setActivo] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  function irA(indice: number) {
    const contenedor = scrollRef.current;
    if (!contenedor) return;
    contenedor.scrollTo({ left: contenedor.clientWidth * indice, behavior: "smooth" });
    setActivo(indice);
  }

  function alHacerScroll() {
    const contenedor = scrollRef.current;
    if (!contenedor) return;
    const indice = Math.round(contenedor.scrollLeft / contenedor.clientWidth);
    setActivo(indice);
  }

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={alHacerScroll}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-3xl bg-beige-300 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {imagenes.map((src, i) => (
          <div key={src} className="relative aspect-square w-full shrink-0 snap-center">
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 40vw, 100vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {imagenes.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {imagenes.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => irA(i)}
              aria-label={`${alt} ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === activo ? "w-6 bg-tierra-500" : "w-2 bg-beige-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
