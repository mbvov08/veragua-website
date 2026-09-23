import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "public");

const VERDE = "#16281a";
const TIERRA = "#c69a2e";
const BEIGE = "#f5f0e4";

function svgPlaceholder(label, { bg = BEIGE, fg = VERDE, accent = TIERRA } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="${bg}"/>
  <circle cx="400" cy="230" r="90" fill="none" stroke="${accent}" stroke-width="3" opacity="0.5"/>
  <text x="400" y="240" font-family="Georgia, serif" font-size="28" fill="${fg}" text-anchor="middle" opacity="0.7">veragua</text>
  <text x="400" y="340" font-family="Arial, sans-serif" font-size="24" fill="${fg}" text-anchor="middle" font-weight="600">${label}</text>
</svg>`;
}

const items = [
  ["images/productos/cafe.svg", "Café de Origen"],
  ["images/productos/huevos.svg", "Huevos de Pastoreo"],
  ["images/productos/leche.svg", "Leche A2"],
  ["images/productos/yogur.svg", "Yogur Artesanal"],
  ["images/productos/queso.svg", "Queso Campesino"],
  ["images/productos/brownies.svg", "Brownies"],
  ["images/productos/arepas.svg", "Arepas"],
];

for (const [path, label] of items) {
  const full = join(root, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, svgPlaceholder(label));
  console.log("Created", path);
}

// Sin texto: el título del hero ya lo pone el HTML por encima (ver HeroVideo.tsx).
// Este poster es solo un fondo de respaldo mientras no hay video real.
function posterPlaceholder() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
  <defs>
    <radialGradient id="glow" cx="50%" cy="35%" r="75%">
      <stop offset="0%" stop-color="#25391f"/>
      <stop offset="100%" stop-color="${VERDE}"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#glow)"/>
</svg>`;
}

const poster = join(root, "images/hero/poster.svg");
mkdirSync(dirname(poster), { recursive: true });
writeFileSync(poster, posterPlaceholder());
console.log("Created images/hero/poster.svg");
