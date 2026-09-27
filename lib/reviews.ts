export type Review = {
  nombre: string;
  ciudad: string;
  texto: string;
};

// Reseñas reales de clientes del café. Se agregan a mano aquí a medida que
// van llegando (WhatsApp, redes, etc.) — mientras el arreglo esté vacío, la
// sección de reseñas de la página de café no se muestra.
export const cafeReviews: Review[] = [];
