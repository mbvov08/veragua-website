import Image from "next/image";

type Variant = "dark" | "light";

// El ícono y el wordmark reales son verde oscuro sobre transparente,
// recortados por separado del logo completo de Veragua para poder combinarlos
// o usarlos de forma independiente según el contexto. Para fondos oscuros
// (navbar sobre el hero, footer, hero grande) existe además una versión
// "-light" del ícono, generada recoloreando esos mismos píxeles a beige
// claro y conservando el canal alfa original (ver scripts de recorte) — el
// wordmark en fondos oscuros sigue usando el texto de respaldo en serif.

export function LogoIcon({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: Variant;
}) {
  return (
    <Image
      src={variant === "light" ? "/logo/veragua-icon-light.png" : "/logo/veragua-icon.png"}
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
  return (
    <Image
      src={
        variant === "light"
          ? "/logo/veragua-wordmark-light.png"
          : "/logo/veragua-wordmark.png"
      }
      alt="Veragua — Alimentos de Origen"
      width={723}
      height={188}
      className={className}
    />
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

  return <LogoWordmark variant="light" className={`h-7 w-auto ${className}`} />;
}
