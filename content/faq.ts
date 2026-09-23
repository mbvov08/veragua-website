export type FaqItem = {
  pregunta: string;
  respuesta: string;
};

export const faqs: FaqItem[] = [
  {
    pregunta: "¿Dónde puedo comprar los productos de Veragua?",
    respuesta:
      "El café se compra en línea directamente en esta página, con envío a toda Colombia y también al exterior. Los demás productos (huevos, lácteos, arepas y más) se piden por WhatsApp, con entrega bajo pedido en Armenia, Pereira y Manizales.",
  },
  {
    pregunta: "¿Por qué el café es el único producto con compra en línea?",
    respuesta:
      "El café viaja bien y llega en perfecto estado a cualquier parte del país o del mundo. Los demás productos son frescos y de vida útil corta, por eso preferimos coordinarlos directamente contigo por WhatsApp para asegurar que lleguen en las mejores condiciones.",
  },
  {
    pregunta: "¿En qué ciudades hacen entregas?",
    respuesta:
      "Hacemos entregas bajo pedido en Armenia, Pereira y Manizales. El café con compra en línea llega a cualquier ciudad de Colombia y también fuera del país.",
  },
  {
    pregunta: "¿Cómo funcionan las suscripciones?",
    respuesta:
      "Eliges el plan que más se ajuste a ti y el día de la semana en que prefieres recibir tu pedido. Cada mes renuevas tu suscripción con un pago manual: no guardamos tu tarjeta ni hacemos cobros automáticos, tú decides cada vez que quieres continuar.",
  },
  {
    pregunta: "¿Puedo cambiar el día de entrega de mi suscripción?",
    respuesta:
      "Sí. Escríbenos por WhatsApp y con gusto ajustamos el día de entrega semanal que mejor te funcione.",
  },
  {
    pregunta: "¿Cómo cuidan a las gallinas de pastoreo?",
    respuesta:
      "Nuestras gallinas caminan libres, se alimentan naturalmente y viven al aire libre. Preferimos mostrarte cómo es el día a día en el campo con fotos y videos reales, en lugar de solo contártelo.",
  },
  {
    pregunta: "¿Qué es la leche A2 y por qué la ofrecen?",
    respuesta:
      "Es leche producida por vacas seleccionadas por su tipo de proteína, lo que la hace más suave para muchas personas. La ofrecemos a través de alianzas con productores regionales que comparten nuestros mismos principios de calidad.",
  },
];

export const socialEmbeds = {
  instagram: {
    label: "Instagram",
    url: "https://www.instagram.com/veragua_col/",
    // TODO: reemplazar por el embed de un Reel/post específico que muestre el proceso en el campo.
  },
  tiktok: {
    label: "TikTok",
    url: "", // Pendiente: agregar enlace de TikTok cuando esté disponible.
  },
};
