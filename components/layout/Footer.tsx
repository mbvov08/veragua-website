import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { buildGeneralContactLink } from "@/lib/whatsapp";
import { socialEmbeds } from "@/content/faq";

const NAV_LINKS = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/suscripciones", label: "Suscripciones" },
  { href: "/preguntas-frecuentes", label: "Preguntas Frecuentes" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="bg-verde-950 text-beige-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3 md:px-10">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm text-beige-300">
            Alimentos de origen, producidos con responsabilidad y seleccionados con el
            mismo cuidado con que alimentaríamos a los nuestros.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-lg text-tierra-300">Navegación</h3>
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
          <h3 className="font-heading text-lg text-tierra-300">Contacto</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={buildGeneralContactLink()} target="_blank" rel="noopener noreferrer" className="hover:text-tierra-300">
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={socialEmbeds.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-tierra-300"
              >
                Instagram
              </a>
            </li>
            <li className="text-beige-300">Carrera 14 # 27 Norte - 80, Armenia</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-verde-800 px-6 py-6 text-center text-xs text-beige-400 md:px-10">
        © {new Date().getFullYear()} Veragua — Alimentos de Origen. Todos los derechos reservados.
      </div>
    </footer>
  );
}
