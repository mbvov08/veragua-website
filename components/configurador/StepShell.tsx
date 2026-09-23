import type { ReactNode } from "react";

type StepShellProps = {
  kicker: string;
  titulo: string;
  subtitulo?: string;
  children: ReactNode;
};

export function StepShell({ kicker, titulo, subtitulo, children }: StepShellProps) {
  return (
    <div>
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-tierra-600">{kicker}</p>
      <h2 className="mt-3 font-heading text-xl text-verde-950 sm:text-2xl">{titulo}</h2>
      {subtitulo && <p className="mt-2 text-sm text-verde-800">{subtitulo}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}
