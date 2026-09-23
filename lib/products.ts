export type Product = {
  slug: string;
  nombre: string;
  categoria: "cafe" | "huevos" | "lacteos" | "artesanales";
  descripcion: string;
  precioCOP: number;
  unidad: string;
  imagen: string;
  comprableEnLinea: boolean;
};

// Precios sincronizados manualmente con el catálogo de Treinta
// (https://catalogo.treinta.co/Veragua-2026, categoría "Alma de Campo" — nombre
// operativo anterior de Veragua). Revisar `npm run check-treinta` para comparar
// contra los precios actuales de Treinta antes de actualizar a mano.
export const products: Product[] = [
  {
    slug: "cafe-de-origen",
    nombre: "Café de Origen Veragua",
    categoria: "cafe",
    descripcion:
      "Café seleccionado de origen colombiano, tostado para resaltar su mejor perfil de sabor.",
    precioCOP: 38000,
    unidad: "bolsa x 340 g",
    imagen: "/images/productos/cafe.svg",
    comprableEnLinea: true,
  },
  {
    slug: "huevos-de-pastoreo",
    nombre: "Huevos de Gallinas de Pastoreo",
    categoria: "huevos",
    descripcion:
      "Huevos frescos de gallinas en pastoreo regenerativo, que caminan libres y se alimentan naturalmente en el campo.",
    precioCOP: 27000,
    unidad: "cubeta x 30 unidades",
    imagen: "/images/productos/huevos.svg",
    comprableEnLinea: false,
  },
  {
    slug: "leche-a2",
    nombre: "Leche A2",
    categoria: "lacteos",
    descripcion: "Leche fresca A2, de alianzas con productores regionales de confianza.",
    precioCOP: 15000,
    unidad: "botella x 1 L",
    imagen: "/images/productos/leche.svg",
    comprableEnLinea: false,
  },
  {
    slug: "yogur-artesanal",
    nombre: "Yogur Artesanal",
    categoria: "lacteos",
    descripcion: "Yogur líquido natural elaborado de forma artesanal con leche A2.",
    precioCOP: 31000,
    unidad: "envase x 500 g",
    imagen: "/images/productos/yogur.svg",
    comprableEnLinea: false,
  },
  {
    slug: "queso-campesino",
    nombre: "Queso Campesino",
    categoria: "lacteos",
    descripcion: "Queso fresco artesanal, elaborado con leche de nuestras alianzas regionales.",
    precioCOP: 17000,
    unidad: "libra",
    imagen: "/images/productos/queso.svg",
    comprableEnLinea: false,
  },
  {
    slug: "arepas",
    nombre: "Arepas Artesanales",
    categoria: "artesanales",
    descripcion: "Arepas frescas elaboradas artesanalmente, ideales para el desayuno.",
    precioCOP: 6000,
    unidad: "paquete", // TODO: confirmar cuántas arepas trae "Arepas Finas de Fátima" en Treinta.
    imagen: "/images/productos/arepas.svg",
    comprableEnLinea: false,
  },
];

export const ciudadesDeEntrega = ["Armenia", "Pereira", "Manizales"] as const;
