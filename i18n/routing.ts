import { defineRouting } from "next-intl/routing";

// Español es el idioma principal del sitio (clientes en Colombia) y no lleva
// prefijo de ruta; el inglés queda disponible en /en para compradores
// internacionales (el café tiene envíos al mundo).
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
});
