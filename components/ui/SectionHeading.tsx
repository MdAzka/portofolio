import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
}: SectionHeadingProps) {
  const parts =
    highlight && title.includes(highlight) ? title.split(highlight) : [title];

  return (
    <Reveal
      className={`relative mb-12 md:mb-16 max-w-2xl ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-teal-500/10 blur-3xl"
      />
      <p className="relative mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">
        {eyebrow}
      </p>
      <h2 className="relative font-sans text-3xl sm:text-4xl font-extrabold text-balance [text-shadow:0_10px_40px_rgba(0,0,0,0.55)]">
        {highlight ? (
          <>
            <span className="text-paper-400">{parts[0]}</span>
            <span className="text-paper-100">{highlight}</span>
            <span className="text-paper-400">{parts[1]}</span>
          </>
        ) : (
          <span className="text-paper-100">{title}</span>
        )}
      </h2>
      {description ? (
        <p className="relative mt-4 text-paper-400 leading-relaxed">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
