import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { buildGeneralContactLink } from "@/lib/whatsapp";
import { socialLinks } from "@/lib/socialLinks";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as "es" | "en";

  const NAV_LINKS = [
    { href: "/nosotros", label: tNav("nosotros") },
    { href: "/catalogo/cafe", label: tNav("catalogo") },
    { href: "/suscripciones", label: tNav("suscripciones") },
    { href: "/preguntas-frecuentes", label: t("preguntasFrecuentes") },
    { href: "/contacto", label: tNav("contacto") },
  ] as const;

  return (
    <footer className="bg-verde-950 text-beige-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3 md:px-10">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm text-beige-300">{t("descripcion")}</p>
        </div>

        <div>
          <h3 className="font-heading text-lg text-tierra-300">{t("navegacion")}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-tierra-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-lg text-tierra-300">{t("contacto")}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={buildGeneralContactLink(locale)} target="_blank" rel="noopener noreferrer" className="hover:text-tierra-300">
                {t("whatsapp")}
              </a>
            </li>
            <li>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-tierra-300"
              >
                {t("instagram")}
              </a>
            </li>
            <li className="text-beige-300">{t("direccion")}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-verde-800 px-6 py-6 text-center text-xs text-beige-400 md:px-10">
        © {new Date().getFullYear()} Veragua — Alimentos de Origen. {t("derechos")}
      </div>
    </footer>
  );
}
