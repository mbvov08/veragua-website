import Image from "next/image";

type Variant = "dark" | "light";

// Los archivos reales (ícono y wordmark) son verde oscuro sobre transparente,
// recortados por separado del logo completo de Veragua para poder combinarlos
// o usarlos de forma independiente según el contexto. Solo se ven bien en
// fondos claros — en fondos oscuros (navbar sobre el hero, footer) se usa el
// wordmark de texto en beige, porque las imágenes reales quedarían casi
// invisibles verde-sobre-verde. Si Veragua tiene una versión clara/invertida
// del ícono o el wordmark, reemplazar esas ramas por las imágenes reales.

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo/veragua-icon.png"
      alt=""
      width={587}
      height={450}
      className={className}
    />
  );
}

export function LogoWordmark({
  variant = "dark",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  if (variant === "dark") {
    return (
      <Image
        src="/logo/veragua-wordmark.png"
        alt="Veragua — Alimentos de Origen"
        width={723}
        height={188}
        className={className}
      />
    );
  }

  return (
    <span className={`inline-flex flex-col leading-none whitespace-nowrap ${className}`}>
      <span className="font-logo text-3xl font-medium tracking-[0.25em] text-beige-100">
        veragua
      </span>
      <span className="font-sans text-[0.55rem] tracking-[0.2em] text-tierra-300">
        ALIMENTOS DE ORIGEN
      </span>
    </span>
  );
}

type LogoProps = {
  variant?: Variant;
  className?: string;
};

// Lockup combinado (ícono + wordmark en línea), para el navbar y otros usos
// donde se quiere el logo completo en un solo bloque horizontal.
export function Logo({ variant = "dark", className = "" }: LogoProps) {
  if (variant === "dark") {
    return (
      <span className={`inline-flex items-center gap-3 ${className}`}>
        <LogoIcon className="h-10 w-auto shrink-0" />
        <LogoWordmark variant="dark" className="h-7 w-auto" />
      </span>
    );
  }

  return <LogoWordmark variant="light" className={className} />;
}
