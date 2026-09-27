type SocialEmbedProps = {
  label: string;
  url: string;
  descripcion: string;
  enlacePendiente: string;
  verProceso: string;
};

// Placeholder de enlace. Cuando se tengan los Reels/videos puntuales que muestran
// el proceso en el campo, reemplazar por el embed oficial de Instagram/TikTok
// (blockquote + script de embed.js) usando la URL de esa publicación específica.
export function SocialEmbed({ label, url, descripcion, enlacePendiente, verProceso }: SocialEmbedProps) {
  if (!url) {
    return (
      <div className="flex h-full flex-col justify-between rounded-3xl border border-dashed border-beige-400 bg-beige-200 p-8 text-verde-700">
        <div>
          <h3 className="font-heading text-xl text-verde-950">{label}</h3>
          <p className="mt-2 text-sm">{descripcion}</p>
        </div>
        <p className="mt-6 text-xs uppercase tracking-wide">{enlacePendiente}</p>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full flex-col justify-between rounded-3xl border border-beige-400 bg-beige-100 p-8 transition hover:border-tierra-500"
    >
      <div>
        <h3 className="font-heading text-xl text-verde-950">{label}</h3>
        <p className="mt-2 text-sm text-verde-800">{descripcion}</p>
      </div>
      <span className="mt-6 text-sm font-semibold text-tierra-600">{verProceso}</span>
    </a>
  );
}
