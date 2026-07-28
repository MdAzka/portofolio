import type { ProjectCategory } from "@/lib/types";

interface CardArtProps {
  category: ProjectCategory;
}

/**
 * Small, self-contained SVG motifs standing in for project photography —
 * one abstract pattern per category, drawn from the site's own palette.
 * Keeps every project card visually consistent without needing an image
 * asset pipeline.
 */
export function CardArt({ category }: CardArtProps) {
  if (category === "ai-research") {
    const nodes = [
      [20, 30], [70, 15], [110, 40], [40, 65], [90, 75], [140, 55], [15, 85],
    ];
    return (
      <svg viewBox="0 0 160 100" className="h-full w-full" aria-hidden>
        <rect width="160" height="100" fill="#121A27" />
        {nodes.map(([x1, y1], i) =>
          nodes.slice(i + 1).map(([x2, y2], j) => {
            const d = Math.hypot((x1 ?? 0) - (x2 ?? 0), (y1 ?? 0) - (y2 ?? 0));
            if (d > 55) return null;
            return (
              <line
                key={`${i}-${j}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#379C93"
                strokeOpacity={0.35}
                strokeWidth={0.7}
              />
            );
          })
        )}
        {nodes.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 3 === 0 ? 3 : 2}
            fill={i % 3 === 0 ? "#E8A33D" : "#56C2B8"}
          />
        ))}
      </svg>
    );
  }

  if (category === "web-development") {
    return (
      <svg viewBox="0 0 160 100" className="h-full w-full" aria-hidden>
        <rect width="160" height="100" fill="#121A27" />
        <rect
          x="14"
          y="14"
          width="132"
          height="72"
          rx="4"
          fill="none"
          stroke="#243044"
          strokeWidth="1.5"
        />
        <line x1="14" y1="28" x2="146" y2="28" stroke="#243044" strokeWidth="1.5" />
        <circle cx="22" cy="21" r="2" fill="#C8623F" />
        <circle cx="30" cy="21" r="2" fill="#E8A33D" />
        <circle cx="38" cy="21" r="2" fill="#56C2B8" />
        <rect x="24" y="38" width="46" height="8" rx="2" fill="#39465e" opacity="0.7" />
        <rect x="24" y="52" width="70" height="5" rx="2" fill="#243044" />
        <rect x="24" y="62" width="58" height="5" rx="2" fill="#243044" />
        <rect x="24" y="72" width="34" height="8" rx="2" fill="#379C93" opacity="0.5" />
        <rect x="96" y="38" width="40" height="42" rx="3" fill="#1A2434" stroke="#243044" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 100" className="h-full w-full" aria-hidden>
      <rect width="160" height="100" fill="#121A27" />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={`t-${i}`} x={i * 18} y={0} width="8" height="6" fill="#0D131D" />
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={`b-${i}`} x={i * 18} y={94} width="8" height="6" fill="#0D131D" />
      ))}
      <rect x="18" y="18" width="124" height="64" fill="#1A2434" stroke="#243044" />
      <polygon points="70,38 70,62 92,50" fill="#E8A33D" opacity="0.85" />
    </svg>
  );
}
