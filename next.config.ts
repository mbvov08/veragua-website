import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // Habilitado temporalmente para los placeholders SVG en /public/images.
    // Quitar (o dejar en false) cuando se reemplacen por fotos reales.
    dangerouslyAllowSVG: true,
  },
};

export default withNextIntl(nextConfig);
