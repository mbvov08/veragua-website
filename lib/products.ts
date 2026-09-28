export type ProductVariant = {
  id: string;
  nombre: string;
  precioCOP: number;
  unidad: string;
  // false = no se vende por ahora (queda en los datos para reactivarla más
  // adelante sin tener que reconstruirla). Si no está presente, se asume activa.
  activa?: boolean;
};

export type Product = {
  slug: string;
  nombre: string;
  categoria: "cafe" | "huevos" | "lacteos" | "artesanales" | "carnes" | "bebidas";
  descripcion: string;
  imagen: string;
  comprableEnLinea: boolean;
  // Se muestra en el catálogo como anuncio ("Próximamente"), sin precio,
  // variantes ni botón de pedido — todavía no está disponible para la venta.
  proximamente?: boolean;
  variantes: ProductVariant[];
};

// Catálogo público de Treinta (fotos reales + precios), categoría "Alma de
// Campo" — nombre operativo anterior de Veragua. Es la fuente que se enlaza
// desde /catalogo para todo lo que no sea café (ver esa página).
export const TREINTA_CATALOG_URL = "https://catalogo.treinta.co/Veragua-2026";

// Precios sincronizados manualmente con el catálogo de Treinta (mismo enlace
// de arriba). No hay API pública para automatizar esta sincronización: al
// pedir una revisión de precios, hay que abrir esa URL y comparar a mano
// contra los valores de aquí. Café es el único producto con tarjeta/checkout
// propio en el sitio (/catalogo/cafe); las demás categorías ya no se listan
// como tarjetas individuales en /catalogo (ese enlaza a Treinta + WhatsApp),
// pero sus precios se dejan documentados aquí como referencia rápida.
export const products: Product[] = [
  {
    slug: "cafe-de-origen",
    nombre: "Café de Origen Veragua",
    categoria: "cafe",
    descripcion:
      "Café seleccionado de origen colombiano, tostado para resaltar su mejor perfil de sabor.",
    imagen: "/images/productos/cafe-bolsa-blanco.png",
    comprableEnLinea: true,
    // Por ahora solo se vende la presentación de 340 g (Molido / Grano). Las
    // demás quedan desactivadas (activa: false) para poder reactivarlas más
    // adelante sin perder sus datos.
    variantes: [
      { id: "340g-molido", nombre: "340 g · Molido", precioCOP: 43000, unidad: "bolsa x 340 g" },
      { id: "340g-grano", nombre: "340 g · Grano", precioCOP: 43000, unidad: "bolsa x 340 g" },
      {
        id: "250g-grano",
        nombre: "250 g · Grano",
        precioCOP: 21000,
        unidad: "bolsa x 250 g",
        activa: false,
      },
      {
        id: "500g-grano",
        nombre: "500 g · Grano",
        precioCOP: 47000,
        unidad: "bolsa x 500 g",
        activa: false,
      },
      {
        id: "500g-molido",
        nombre: "500 g · Molido",
        precioCOP: 47000,
        unidad: "bolsa x 500 g",
        activa: false,
      },
      {
        id: "5lb-grano",
        nombre: "Paquetón 5 lb · Grano",
        precioCOP: 170000,
        unidad: "paquetón x 5 lb",
        activa: false,
      },
      {
        id: "5lb-molido",
        nombre: "Paquetón 5 lb · Molido",
        precioCOP: 170000,
        unidad: "paquetón x 5 lb",
        activa: false,
      },
    ],
  },
  {
    slug: "huevos-de-pastoreo",
    nombre: "Huevos de Gallinas de Pastoreo",
    categoria: "huevos",
    descripcion:
      "Huevos frescos de gallinas en pastoreo regenerativo, que caminan libres y se alimentan naturalmente en el campo.",
    imagen: "/images/productos/huevos.svg",
    comprableEnLinea: false,
    variantes: [
      { id: "marrones-x30", nombre: "Marrones x 30", precioCOP: 27000, unidad: "cubeta x 30 unidades" },
      { id: "marrones-x15", nombre: "Marrones x 15", precioCOP: 14000, unidad: "cubeta x 15 unidades" },
      { id: "azules-x30", nombre: "Azules x 30", precioCOP: 29000, unidad: "cubeta x 30 unidades" },
      { id: "azules-x15", nombre: "Azules x 15", precioCOP: 15000, unidad: "cubeta x 15 unidades" },
      { id: "mixtos-x30", nombre: "Mixtos x 30", precioCOP: 28000, unidad: "cubeta x 30 unidades" },
    ],
  },
  {
    slug: "leche-a2",
    nombre: "Leche A2 Sanorigen",
    categoria: "lacteos",
    descripcion: "Leche fresca A2, elaborada por Sanorigen, nuestro aliado en lácteos de calidad.",
    imagen: "/images/productos/leche.svg",
    comprableEnLinea: false,
    variantes: [{ id: "unico", nombre: "Botella x 1 L", precioCOP: 15000, unidad: "botella x 1 L" }],
  },
  {
    slug: "yogur-artesanal",
    nombre: "Yogur Líquido A2 Sanorigen",
    categoria: "lacteos",
    descripcion: "Yogur líquido natural, elaborado por Sanorigen con leche A2.",
    imagen: "/images/productos/yogur.svg",
    comprableEnLinea: false,
    variantes: [{ id: "unico", nombre: "Envase x 500 g", precioCOP: 31000, unidad: "envase x 500 g" }],
  },
  {
    slug: "yogur-griego",
    nombre: "Yogur Griego A2 Sanorigen",
    categoria: "lacteos",
    descripcion: "Yogur griego cremoso, elaborado por Sanorigen con leche A2.",
    imagen: "/images/productos/yogur-griego.svg",
    comprableEnLinea: false,
    variantes: [{ id: "unico", nombre: "Envase x 500 g", precioCOP: 32000, unidad: "envase x 500 g" }],
  },
  {
    slug: "queso-campesino",
    nombre: "Queso Fresco A2 Sanorigen",
    categoria: "lacteos",
    descripcion: "Queso fresco, elaborado por Sanorigen con leche A2.",
    imagen: "/images/productos/queso.svg",
    comprableEnLinea: false,
    variantes: [{ id: "unico", nombre: "Libra", precioCOP: 17000, unidad: "libra" }],
  },
  {
    slug: "queso-parrillero",
    nombre: "Queso Parrillero A2 Sanorigen",
    categoria: "lacteos",
    descripcion: "Queso parrillero ideal para asar, elaborado por Sanorigen con leche A2.",
    imagen: "/images/productos/queso-parrillero.svg",
    comprableEnLinea: false,
    variantes: [{ id: "unico", nombre: "Libra", precioCOP: 19000, unidad: "libra" }],
  },
  {
    slug: "kefir-a2",
    nombre: "Kéfir A2 Sanorigen",
    categoria: "lacteos",
    descripcion: "Kéfir natural, elaborado por Sanorigen con leche A2.",
    imagen: "/images/productos/kefir.svg",
    comprableEnLinea: false,
    variantes: [{ id: "unico", nombre: "Envase", precioCOP: 33000, unidad: "envase" }],
  },
  {
    slug: "arepas",
    nombre: "Arepas Artesanales",
    categoria: "artesanales",
    descripcion: "Arepas frescas elaboradas artesanalmente, ideales para el desayuno.",
    imagen: "/images/productos/arepas.svg",
    comprableEnLinea: false,
    // TODO: confirmar cuántas arepas trae "Arepas Finas de Fátima" en Treinta.
    variantes: [{ id: "unico", nombre: "Paquete", precioCOP: 6000, unidad: "paquete" }],
  },
  {
    slug: "gallina-entera",
    nombre: "Gallina Entera",
    categoria: "carnes",
    descripcion: "Gallina campesina entera, congelada para que la prepares cuando quieras.",
    imagen: "/images/productos/gallina.svg",
    comprableEnLinea: false,
    variantes: [{ id: "unico", nombre: "Entera congelada", precioCOP: 27000, unidad: "unidad" }],
  },
  {
    slug: "pollo-criollo",
    nombre: "Pollo Criollo",
    categoria: "carnes",
    descripcion: "Pollo criollo entero, criado en el campo y congelado para conservar su frescura.",
    imagen: "/images/productos/pollo.svg",
    comprableEnLinea: false,
    variantes: [{ id: "unico", nombre: "Entero congelado", precioCOP: 9500, unidad: "libra" }],
  },
  {
    slug: "carnes-de-res",
    nombre: "Carnes de Res",
    categoria: "carnes",
    descripcion:
      "Una línea de cortes de res está en camino, con el mismo cuidado de origen que ya conoces.",
    imagen: "/images/productos/carnes-de-res.svg",
    comprableEnLinea: false,
    proximamente: true,
    variantes: [{ id: "unico", nombre: "Próximamente", precioCOP: 0, unidad: "" }],
  },
  {
    slug: "agua-con-gas-guali",
    nombre: "Agua con Gas Guali",
    categoria: "bebidas",
    descripcion: "Agua con gas Veragua, ideal para acompañar cualquier comida.",
    imagen: "/images/productos/agua-con-gas.svg",
    comprableEnLinea: false,
    variantes: [{ id: "unico", nombre: "Lata", precioCOP: 7000, unidad: "lata" }],
  },
  {
    slug: "agua-sin-gas-guali",
    nombre: "Agua sin Gas Guali",
    categoria: "bebidas",
    descripcion: "Agua natural Veragua, fresca y sencilla.",
    imagen: "/images/productos/agua-sin-gas.svg",
    comprableEnLinea: false,
    variantes: [{ id: "unico", nombre: "Lata", precioCOP: 7000, unidad: "lata" }],
  },
  {
    slug: "soda-jengibre-guali",
    nombre: "Soda de Jengibre Guali",
    categoria: "bebidas",
    descripcion: "Soda artesanal de jengibre, con un toque natural y refrescante.",
    imagen: "/images/productos/soda-jengibre.svg",
    comprableEnLinea: false,
    variantes: [{ id: "unico", nombre: "Lata", precioCOP: 8000, unidad: "lata" }],
  },
  {
    slug: "soda-limon-guali",
    nombre: "Soda de Limón Guali",
    categoria: "bebidas",
    descripcion: "Soda artesanal de limón, ligera y refrescante.",
    imagen: "/images/productos/soda-limon.svg",
    comprableEnLinea: false,
    variantes: [{ id: "unico", nombre: "Lata", precioCOP: 8000, unidad: "lata" }],
  },
];

export const ciudadesDeEntrega = ["Armenia", "Pereira", "Manizales"] as const;
