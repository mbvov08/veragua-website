"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LogoWordmark } from "@/components/ui/Logo";

export function HeroVideo() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden bg-verde-950">
      {/* Reemplazar con el video real del campo, los animales y el proceso en /public/videos/hero.mp4 */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero/poster.svg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-verde-950/70 via-verde-950/40 to-verde-950/80" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-sm font-medium uppercase tracking-[0.4em] text-tierra-300"
        >
          {t("kicker")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <LogoWordmark
            variant="light"
            className="mx-auto [&_span:first-child]:text-5xl [&_span:first-child]:sm:text-6xl [&_span:first-child]:md:text-7xl [&_span:first-child]:lg:text-8xl [&_span:last-child]:mt-2 [&_span:last-child]:text-xs [&_span:last-child]:sm:text-sm"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-8 max-w-md font-logo text-lg italic text-beige-200 sm:text-xl"
        >
          {t("subtitulo")}
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-10 w-6 rounded-full border-2 border-beige-100/70">
          <div className="mx-auto mt-2 h-2 w-1 rounded-full bg-beige-100/70" />
        </div>
      </motion.div>
    </section>
  );
}
