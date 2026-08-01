"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const BRAND_ICONS: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  Python: SiPython,
  JavaScript: SiJavascript,
  PHP: SiPhp,
  "C++": SiCplusplus,
  HTML: SiHtml5,
  CSS: SiCss,
  "Git & GitHub": SiGithub,
  Canva: SiCanvas,
};

const GENERIC_ICONS: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  "Data Science": BarChart3,
  "Computer Vision": Eye,
  "DaVinci Resolve": Film,
};

// Delay kilau tiap label, biar icon berkedip gantian (twinkle), bukan bareng semua
const SHINE_DELAYS: Record<string, number> = {
  Python: 0,
  JavaScript: 0.3,
  PHP: 0.6,
  "C++": 0.9,
  HTML: 1.2,
  CSS: 1.5,
  "Git & GitHub": 1.8,
  Canva: 2.1,
  "Data Science": 0.45,
  "Computer Vision": 1.05,
  "DaVinci Resolve": 1.65,
};

function SkillPill({ label }: { label: string }) {
  const Brand = BRAND_ICONS[label];
  const Generic = GENERIC_ICONS[label];
  const Icon = Brand ?? Generic;
  const delay = SHINE_DELAYS[label] ?? 0;

  return (
    <div className="mx-2.5 flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border border-ink-600 bg-ink-800/60 px-5 py-3">
      {Icon ? (
        <Icon
          className="h-7 w-7 shrink-0 text-teal-400 animate-icon-shine"
          style={{ animationDelay: `${delay}s` }}
        />
      ) : null}
      <span className="text-base font-medium text-paper-200">{label}</span>
    </div>
  );
}

/**
 * Smooth marquee engine — adapted from React Bits' LogoLoop approach:
 * requestAnimationFrame + exponential velocity smoothing instead of
 * CSS @keyframes. Behavior/markup of SkillPill is untouched.
 */
const SMOOTH_TAU = 0.25; // smoothing time constant (bigger = lazier/smoother)
const MIN_COPIES = 2;
const COPY_HEADROOM = 2;
const HOVER_DAMPING = 0.25; // slow down to 25% speed on hover instead of hard pause

function MarqueeRow({
  items,
  direction,
  speed,
}: {
  items: string[];
  direction: "left" | "right";
  speed: number; // base speed in px/second
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLDivElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const targetVelocity = direction === "left" ? speed : -speed;

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth = seqRef.current?.getBoundingClientRect().width ?? 0;
    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const copiesNeeded =
        Math.ceil(containerWidth / sequenceWidth) + COPY_HEADROOM;
      setCopyCount(Math.max(MIN_COPIES, copiesNeeded));
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    if (!window.ResizeObserver) {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
    const ro = new ResizeObserver(updateDimensions);
    if (containerRef.current) ro.observe(containerRef.current);
    if (seqRef.current) ro.observe(seqRef.current);
    return () => ro.disconnect();
  }, [updateDimensions, items]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId: number;
    let lastTimestamp: number | null = null;
    let offset = 0;
    let velocity = 0;

    const animate = (timestamp: number) => {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const deltaTime = Math.max(0, timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      const target = isHovered
        ? targetVelocity * HOVER_DAMPING
        : targetVelocity;
      const easingFactor = 1 - Math.exp(-deltaTime / SMOOTH_TAU);
      velocity += (target - velocity) * easingFactor;

      if (seqWidth > 0) {
        let next = offset + velocity * deltaTime;
        next = ((next % seqWidth) + seqWidth) % seqWidth;
        offset = next;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [targetVelocity, seqWidth, isHovered]);

  const copies = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <div
          className="flex w-max flex-nowrap"
          key={`copy-${copyIndex}`}
          ref={copyIndex === 0 ? seqRef : undefined}
          aria-hidden={copyIndex > 0}
        >
          {items.map((item, i) => (
            <SkillPill key={`${item}-${copyIndex}-${i}`} label={item} />
          ))}
        </div>
      )),
    [copyCount, items],
  );

  return (
    <div
      ref={containerRef}
      className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div
        ref={trackRef}
        className="flex w-max flex-nowrap will-change-transform"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {copies}
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
            speed={i % 2 === 0 ? 34 : 30}
          />
        ))}
      </div>
    </section>
  );
}
