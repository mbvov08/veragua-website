import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import "../globals.css";

// Montserrat: cuerpo de texto y párrafos en todo el sitio.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Cormorant Garamond: la serif "premium" para TODOS los títulos (h1-h6,
// .font-heading) en globals.css, y para el wordmark de texto del logo en
// fondos oscuros. `style: ["normal", "italic"]` para que la itálica use la
// itálica real de la fuente en vez de una inclinación sintética del navegador.
const cormorant = Cormorant_Garamond({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

// Dominio de producción: veragua.site. Una vez esté conectado en Vercel,
// conviene además fijarlo como NEXT_PUBLIC_SITE_URL en las variables de
// entorno del proyecto para que quede explícito sin depender de este valor
// por defecto.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://veragua.site";
const DESCRIPCION_SITIO =
  "Alimentos de origen producidos con responsabilidad: huevos de pastoreo, café de origen, lácteos y más. Envíos a toda Colombia.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Veragua — Alimentos de Origen",
  description: DESCRIPCION_SITIO,
  openGraph: {
    title: "Veragua — Alimentos de Origen",
    description: DESCRIPCION_SITIO,
    images: ["/images/productos/cafe-bolsa-granos.png"],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Habilita el renderizado estático de las páginas de este locale.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-beige-100 text-verde-950">
        <NextIntlClientProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
