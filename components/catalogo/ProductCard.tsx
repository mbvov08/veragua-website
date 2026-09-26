"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/lib/products";
import { formatCOP } from "@/lib/exchangeRate";
import { WhatsAppOrderButton } from "@/components/catalogo/WhatsAppOrderButton";

export function ProductCard({ product }: { product: Product }) {
  const [varianteId, setVarianteId] = useState(product.variantes[0].id);
  const variante = product.variantes.find((v) => v.id === varianteId) ?? product.variantes[0];
  const tieneVariantes = product.variantes.length > 1;
  const nombrePedido = tieneVariantes ? `${product.nombre} (${variante.nombre})` : product.nombre;

  if (product.proximamente) {
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-dashed border-beige-400 bg-beige-100">
        <div className="relative aspect-[4/3] w-full bg-beige-300 opacity-70">
          <Image
            src={product.imagen}
            alt={product.nombre}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
          <span className="absolute left-4 top-4 rounded-full bg-beige-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-verde-800">
            Próximamente
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-heading text-xl text-verde-950">{product.nombre}</h3>
          <p className="mt-2 text-sm leading-relaxed text-verde-700">{product.descripcion}</p>
        </div>
      </div>
    );
  }

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

          {tieneVariantes && (
            <select
              value={varianteId}
              onChange={(e) => setVarianteId(e.target.value)}
              aria-label={`Presentación de ${product.nombre}`}
              className="mt-3 w-full rounded-full border border-beige-400 bg-beige-100 px-4 py-2 text-sm text-verde-950"
            >
              {product.variantes.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.nombre}
                </option>
              ))}
            </select>
          )}

          <p className="mt-4 text-lg font-semibold text-verde-950">
            {formatCOP(variante.precioCOP)}{" "}
            <span className="text-sm font-normal text-verde-700">/ {variante.unidad}</span>
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
            <WhatsAppOrderButton nombreProducto={nombrePedido} />
          )}
        </div>
      </div>
    </div>
  );
}
