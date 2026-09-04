export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl mb-10 md:mb-14">
      <p className="font-mono-tag text-xs uppercase tracking-[0.18em] text-accent mb-3">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted leading-relaxed">{description}</p>
      )}
    </div>
  );
}
