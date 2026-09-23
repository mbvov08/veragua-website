import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatCOP } from "@/lib/exchangeRate";
import { WhatsAppOrderButton } from "@/components/catalogo/WhatsAppOrderButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-beige-400 bg-beige-100">
      <div className="relative aspect-[4/3] w-full bg-beige-300">
        <Image
          src={product.imagen}
          alt={product.nombre}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            product.comprableEnLinea
              ? "bg-tierra-500 text-verde-950"
              : "bg-verde-800 text-beige-100"
          }`}
        >
          {product.comprableEnLinea ? "Compra en línea" : "Pide por WhatsApp"}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="font-heading text-xl text-verde-950">{product.nombre}</h3>
          <p className="mt-2 text-sm leading-relaxed text-verde-800">{product.descripcion}</p>
          <p className="mt-4 text-lg font-semibold text-verde-950">
            {formatCOP(product.precioCOP)}{" "}
            <span className="text-sm font-normal text-verde-700">/ {product.unidad}</span>
          </p>
          {!product.comprableEnLinea && (
            <p className="mt-1 text-xs text-verde-700">
              Entrega bajo pedido en Armenia, Pereira y Manizales.
            </p>
          )}
        </div>

        <div className="mt-6">
          {product.comprableEnLinea ? (
            <Link
              href={`/catalogo/${product.slug === "cafe-de-origen" ? "cafe" : product.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-tierra-500 px-6 py-3 text-sm font-semibold text-verde-950 transition hover:bg-tierra-400"
            >
              Comprar ahora
            </Link>
          ) : (
            <WhatsAppOrderButton nombreProducto={product.nombre} />
          )}
        </div>
      </div>
    </div>
  );
}
