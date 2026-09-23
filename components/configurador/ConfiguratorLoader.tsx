"use client";

import dynamic from "next/dynamic";

// Se carga solo en el navegador: el configurador lee localStorage al montar
// para restaurar la última configuración, lo que causaría un desajuste de
// hidratación si se renderizara también en el servidor.
const Configurator = dynamic(
  () => import("@/components/configurador/Configurator").then((m) => m.Configurator),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-2xl">
        <div className="h-1.5 w-full rounded-full bg-beige-300" />
        <div className="mt-8 h-64 animate-pulse rounded-3xl bg-beige-200" />
      </div>
    ),
  }
);

export function ConfiguratorLoader() {
  return <Configurator />;
}
