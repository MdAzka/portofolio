"use client";

import {
  SiPython,
  SiJavascript,
  SiPhp,
  SiCplusplus,
  SiHtml5,
  SiCss,
  SiGithub,
  SiCanvas,
} from "react-icons/si";
import { BarChart3, Eye, Film } from "lucide-react";
import { skillGroups } from "@/data/skills";

interface BrandIconEntry {
  Icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  color: string;
}

const BRAND_ICONS: Record<string, BrandIconEntry> = {
  Python: { Icon: SiPython, color: "#3776AB" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  PHP: { Icon: SiPhp, color: "#777BB4" },
  "C++": { Icon: SiCplusplus, color: "#00599C" },
  HTML: { Icon: SiHtml5, color: "#E34F26" },
  CSS: { Icon: SiCss, color: "#1572B6" },
  "Git & GitHub": { Icon: SiGithub, color: "#F5F5F5" },
  Canva: { Icon: SiCanvas, color: "#00C4CC" },
};

const GENERIC_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "Data Science": BarChart3,
  "Computer Vision": Eye,
  "DaVinci Resolve": Film,
};

function SkillPill({ label }: { label: string }) {
  const brand = BRAND_ICONS[label];
  const Generic = GENERIC_ICONS[label];

  return (
    <div className="mx-2.5 flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border border-ink-600 bg-ink-800/60 px-5 py-3">
      {brand ? (
        <brand.Icon
          className="h-7 w-7 shrink-0"
          style={{ color: brand.color }}
        />
      ) : Generic ? (
        <Generic className="h-7 w-7 shrink-0 text-teal-400" />
      ) : null}
      <span className="text-base font-medium text-paper-200">{label}</span>
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: string[];
  direction: "left" | "right";
  duration: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex w-max flex-nowrap group-hover:[animation-play-state:paused] ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <SkillPill key={item + i} label={item} />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section className="border-b border-ink-700 bg-ink-950/40 py-16">
      <div className="mx-auto max-w-content px-6 mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
          Skills &amp; Tools
        </p>
      </div>
      <div className="flex flex-col gap-5">
        {skillGroups.map((group, i) => (
          <MarqueeRow
            key={group.id}
            items={group.items}
            direction={i % 2 === 0 ? "left" : "right"}
            duration={22 + group.items.length * 2}
          />
        ))}
      </div>
    </section>
  );
}
