"use client";

import { useState } from "react";

export type FaqItem = {
  pregunta: string;
  respuesta: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-beige-400">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.pregunta}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
              aria-expanded={open}
            >
              <span className="font-heading text-lg text-verde-950">{item.pregunta}</span>
              <span
                className={`shrink-0 text-2xl text-tierra-600 transition-transform ${
                  open ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {open && (
              <p className="pb-6 text-sm leading-relaxed text-verde-800">{item.respuesta}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
