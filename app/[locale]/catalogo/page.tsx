import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

// El café es el único producto con compra en línea, así que "Compra ahora"
// en la navegación va directo a esa página; esta ruta se conserva por si
// algo enlaza a /catalogo directamente.
export default async function CatalogoPage() {
  const locale = await getLocale();
  redirect({ href: "/catalogo/cafe", locale });
}
