import { buildProductOrderLink } from "@/lib/whatsapp";

type WhatsAppOrderButtonProps = {
  nombreProducto: string;
  className?: string;
};

export function WhatsAppOrderButton({ nombreProducto, className = "" }: WhatsAppOrderButtonProps) {
  return (
    <a
      href={buildProductOrderLink(nombreProducto)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-verde-950 px-6 py-3 text-sm font-semibold text-beige-100 transition hover:bg-verde-800 ${className}`}
    >
      Pide por WhatsApp
    </a>
  );
}
