"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/suscripciones", label: "Suscripciones" },
  { href: "/preguntas-frecuentes", label: "Preguntas" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

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
          </nav>

          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setMenuOpen(true)}
            className={`flex shrink-0 flex-col gap-1.5 md:hidden ${
              transparent ? "text-beige-100" : "text-verde-950"
            }`}
          >
            <span className="block h-0.5 w-7 bg-current" />
            <span className="block h-0.5 w-7 bg-current" />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />
    </>
  );
}
