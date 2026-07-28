import clsx from "clsx";

interface TagProps {
  children: React.ReactNode;
  tone?: "default" | "amber" | "teal";
  className?: string;
}

export function Tag({ children, tone = "default", className }: TagProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.7rem] tracking-wide",
        tone === "default" &&
          "border-ink-600 text-paper-400 bg-ink-800/60",
        tone === "amber" && "border-amber-500/40 text-amber-300 bg-amber-500/10",
        tone === "teal" && "border-teal-500/40 text-teal-300 bg-teal-500/10",
        className
      )}
    >
      {children}
    </span>
  );
}
