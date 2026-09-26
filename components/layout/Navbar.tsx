"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { LanguageToggle } from "@/components/layout/LanguageToggle";

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const NAV_LINKS = [
    { href: "/", label: t("inicio") },
    { href: "/nosotros", label: t("nosotros") },
    { href: "/catalogo", label: t("catalogo") },
    { href: "/suscripciones", label: t("suscripciones") },
    { href: "/preguntas-frecuentes", label: t("preguntas") },
    { href: "/contacto", label: t("contacto") },
  ] as const;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          transparent ? "bg-transparent" : "bg-beige-100/95 backdrop-blur-sm shadow-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" aria-label="Veragua — Inicio" className="shrink-0">
            <Logo variant={transparent ? "light" : "dark"} />
          </Link>

          <nav className="hidden items-center gap-4 md:flex lg:gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap text-sm font-medium tracking-wide transition-colors ${
                  transparent
                    ? "text-beige-100 hover:text-tierra-300"
                    : "text-verde-950 hover:text-tierra-600"
                } ${pathname === link.href ? "underline underline-offset-8" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <LanguageToggle
              className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition-colors ${
                transparent
                  ? "border-beige-100 text-beige-100 hover:bg-beige-100 hover:text-verde-950"
                  : "border-verde-950 text-verde-950 hover:bg-verde-950 hover:text-beige-100"
              }`}
            />
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <LanguageToggle
              className={`rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide ${
                transparent ? "border-beige-100 text-beige-100" : "border-verde-950 text-verde-950"
              }`}
            />
            <button
              type="button"
              aria-label={t("abrirMenu")}
              onClick={() => setMenuOpen(true)}
              className={`flex shrink-0 flex-col gap-1.5 ${
                transparent ? "text-beige-100" : "text-verde-950"
              }`}
            >
              <span className="block h-0.5 w-7 bg-current" />
              <span className="block h-0.5 w-7 bg-current" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />
    </>
  );
}
