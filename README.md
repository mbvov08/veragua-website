# Veragua — Sitio web

Sitio institucional y de e-commerce parcial de Veragua, construido con Next.js
(App Router) + Tailwind CSS.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Copia `.env.example` a `.env.local` y completa:

- `NEXT_PUBLIC_WOMPI_PUBLIC_KEY`: llave pública de Wompi para activar el checkout
  embebido del producto Café. Sin esta variable, esa sección muestra un aviso
  en vez del botón de pago.

## Estructura

- `app/` — páginas (App Router): Inicio, Nosotros, Catálogo (+ Café), Suscripciones
  (+ Plan Personalizado), Preguntas Frecuentes, Contacto, y la API de tasa de cambio.
- `components/` — componentes de UI, agrupados por sección.
- `content/` — copy editable (misión, promesa, FAQ) sin tocar la lógica de UI.
- `lib/` — datos de productos y planes de suscripción, y utilidades (WhatsApp,
  tasa de cambio).
- `public/` — imágenes, video y logo.

## Plan Personalizado (`/suscripciones/personalizado`)

Encuesta paso a paso que calcula una suscripción a la medida del hogar del
cliente (huevos, lácteos, arepas y café), reutilizando el mismo esquema de pago
manual mensual y 5% de descuento que los planes fijos.

- `lib/configurador/calculoProteina.ts` — cálculo de huevos por semana a partir
  del peso y nivel de actividad de cada persona (dosis de proteína por comida
  según la ISSN, no el requerimiento diario completo — ver justificación en el
  archivo).
- `lib/configurador/calculoCafe.ts` — conversión de tazas/día a libras y bolsas
  de café al mes.
- `lib/configurador/calculoPlan.ts` — arma la lista de productos y cantidades,
  y aplica el descuento reutilizando `calcularDesdeComponentes` de
  `lib/subscriptions.ts`.
- `lib/configurador/whatsappPlan.ts` — arma el mensaje de WhatsApp con todas las
  respuestas de la encuesta y el plan calculado. Como el sitio no tiene base de
  datos propia, esa conversación de WhatsApp es el registro que usa el equipo
  de Veragua para dar seguimiento; además, la última configuración se guarda en
  `localStorage` del navegador para que el cliente pueda retomarla.
- `components/configurador/` — el wizard (`Configurator.tsx`) y sus pasos.
  Se carga solo en el navegador vía `ConfiguratorLoader.tsx` (sin SSR), porque
  lee `localStorage` al montar.

## Logo

El archivo real está en `public/logo/` (`veragua-logo.jpg` es el original;
`veragua-logo-full.png` y `veragua-logo-compact.png` son recortes con fondo
transparente generados a partir de ese original). Es verde oscuro sobre
transparente, por lo que solo se ve bien en fondos claros. [`Logo.tsx`](components/ui/Logo.tsx)
usa la imagen real cuando `variant="dark"` (fondos claros: navbar con scroll,
la mayoría de las páginas) y cae de vuelta a un wordmark de texto en beige
cuando `variant="light"` (fondos oscuros: navbar transparente sobre el hero,
footer), porque el logo real quedaría verde-sobre-verde ahí.

**Pendiente:** si Veragua tiene (o puede generar) una versión clara/invertida
del logo pensada para fondos oscuros, reemplazar esa rama en `Logo.tsx` por la
imagen real también en esos casos.

## Pendientes para producción

- **Video del hero**: agregar el video real del campo en
  `public/videos/hero.mp4` (y un poster de respaldo en `public/images/hero/`).
- **Fotos de producto**: reemplazar los placeholders SVG en
  `public/images/productos/` por fotos reales, y actualizar las rutas en
  [`lib/products.ts`](lib/products.ts).
- **Precios reales**: los precios en [`lib/products.ts`](lib/products.ts) y
  [`lib/subscriptions.ts`](lib/subscriptions.ts) son de referencia.
- **Llave pública de Wompi**: ver sección de variables de entorno arriba.
- **Enlace de TikTok**: agregar en [`content/faq.ts`](content/faq.ts) (`socialEmbeds.tiktok.url`).
- **Dirección exacta**: la página de Contacto usa "Armenia, Quindío, Colombia"
  como ubicación general; agregar la dirección exacta si se quiere un pin más preciso.
