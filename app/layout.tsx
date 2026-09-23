import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// Una sola familia (Montserrat) para todo el sitio, a pedido del cliente
// (prefiere no usar Quicksand). La jerarquía título/subtítulo se construye
// con peso y tamaño en vez de mezclar tipografías: 600 para títulos, 500
// para subtítulos y cuerpo de texto (ver globals.css).
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Solo para el wordmark de texto del logo (fondos oscuros donde no se puede
// usar la imagen real), para que combine con la serif elegante del logo real.
const cormorant = Cormorant_Garamond({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Veragua — Alimentos de Origen",
  description:
    "Alimentos de origen producidos con responsabilidad: huevos de pastoreo, café de origen, lácteos y más. Veragua compite por calidad, no por precio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-beige-100 text-verde-950">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
