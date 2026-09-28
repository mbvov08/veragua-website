"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type ElementoHistoria = {
  id: string;
  nombre: string;
  texto: string;
  foto?: string;
};

// Zonas táctiles ubicadas a ojo sobre /public/logo/veragua-icon.png
// (587×450): el guayacán ocupa la copa superior, la gallina está parada
// sobre el lomo de la vaca, y la vaca es el cuerpo grande de abajo.
const HOTSPOTS: Record<string, { area: string; punto: string }> = {
  guayacan: {
    area: "inset-x-0 top-0 h-[42%]",
    punto: "left-1/2 top-[16%]",
  },
  gallina: {
    area: "left-[27%] top-[38%] h-[26%] w-[22%]",
    punto: "left-[38%] top-[48%]",
  },
  vaca: {
    area: "left-[14%] top-[55%] h-[38%] w-[65%]",
    punto: "left-[46%] top-[78%]",
  },
};

export function LogoStory({
  titulo,
  subtitulo,
  placeholder,
  elementos,
}: {
  titulo: string;
  subtitulo: string;
  placeholder: string;
  elementos: ElementoHistoria[];
}) {
  const [activoId, setActivoId] = useState<string | null>(null);
  const seleccionado = elementos.find((e) => e.id === activoId);

  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="font-logo italic text-2xl text-verde-950 sm:text-3xl">{titulo}</h2>
      <p className="mt-3 text-sm text-verde-700">{subtitulo}</p>

      <div className="relative mx-auto mt-10 aspect-[587/450] w-full max-w-md">
        <Image
          src="/logo/veragua-icon.png"
          alt="Ícono de Veragua: guayacán, vaca y gallina"
          fill
          className="object-contain"
        />

        {elementos.map((el) => {
          const hotspot = HOTSPOTS[el.id];
          if (!hotspot) return null;
          const activo = activoId === el.id;

          return (
            <button
              key={el.id}
              type="button"
              onClick={() => setActivoId(activo ? null : el.id)}
              aria-pressed={activo}
              aria-label={el.nombre}
              className={`absolute ${hotspot.area} rounded-2xl transition-colors ${
                activo ? "bg-tierra-500/25" : "hover:bg-tierra-500/10"
              }`}
            >
              {!activo && (
                <span className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 ${hotspot.punto}`}>
                  <span className="absolute inset-0 animate-ping rounded-full bg-tierra-500 opacity-75" />
                  <span className="absolute inset-0 rounded-full bg-tierra-500" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 min-h-[9rem] rounded-3xl border border-beige-400 bg-beige-100 p-8">
        <AnimatePresence mode="wait">
          {seleccionado ? (
            <motion.div
              key={seleccionado.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className={seleccionado.foto ? "grid gap-6 text-left sm:grid-cols-[8rem_1fr] sm:items-center" : undefined}
            >
              {seleccionado.foto && (
                <div className="relative mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-2xl sm:mx-0">
                  <Image src={seleccionado.foto} alt={seleccionado.nombre} fill className="object-cover" />
                </div>
              )}
              <div>
                <h3 className="font-logo italic text-xl text-verde-950">{seleccionado.nombre}</h3>
                <p className="mt-3 text-base leading-relaxed text-verde-800">{seleccionado.texto}</p>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-full items-center justify-center text-base text-verde-700"
            >
              {placeholder}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
