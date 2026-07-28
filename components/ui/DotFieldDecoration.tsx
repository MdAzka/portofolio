export function DotFieldDecoration({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(rgba(212, 197, 169, 0.55) 1px, transparent 1.6px)",
        backgroundSize: "20px 20px",
        WebkitMaskImage:
          "radial-gradient(circle at 85% 15%, black 0%, transparent 65%)",
        maskImage:
          "radial-gradient(circle at 85% 15%, black 0%, transparent 65%)",
      }}
    />
  );
}
