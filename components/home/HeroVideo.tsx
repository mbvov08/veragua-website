"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LogoIcon, LogoWordmark } from "@/components/ui/Logo";

// El fondo del hero alterna entre varios videos cortos de la finca. Los tres
// quedan montados todo el tiempo (superpuestos) y solo se cruza la opacidad
// del activo — así no hay que desmontar/montar el <video> al cambiar, que es
// lo que causaba el destello del fondo verde entre clips.
const VIDEOS_HERO = [
  "/videos/gallinas-criollas.mp4",
  "/videos/ganado-pastoreo.mp4",
  "/videos/gallina-hierba.mp4",
];
const DURACION_MS = 3500;

export function HeroVideo() {
  const [indice, setIndice] = useState(0);
  const videosRef = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const siguiente = () => setIndice((i) => (i + 1) % VIDEOS_HERO.length);
    const timer = setTimeout(siguiente, DURACION_MS);
    return () => clearTimeout(timer);
  }, [indice]);

  useEffect(() => {
    videosRef.current.forEach((video, i) => {
      if (!video) return;
      if (i === indice) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [indice]);

  return (
    <section className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden bg-verde-950">
      {VIDEOS_HERO.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            videosRef.current[i] = el;
          }}
          muted
          playsInline
          preload="auto"
          onEnded={() => setIndice((idx) => (idx + 1) % VIDEOS_HERO.length)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === indice ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
      <div className="absolute inset-0 bg-verde-950/50" aria-hidden />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <LogoIcon variant="light" className="h-28 w-auto sm:h-32 md:h-36" />
          <LogoWordmark variant="light" className="mt-5 h-20 w-auto sm:h-24 md:h-28" />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-10 w-6 rounded-full border-2 border-beige-100/60">
          <div className="mx-auto mt-2 h-2 w-1 rounded-full bg-beige-100/60" />
        </div>
      </motion.div>
    </section>
  );
}
