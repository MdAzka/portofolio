"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { organizationalExperience } from "@/data/resume-content";

const ROTATE_MS = 1000;
const EASING = [0.22, 1, 0.36, 1] as const;

// Visual offset for each layer of the stack: front, then two peeking behind.
const STACK = [
  { rotate: 0, x: 0, y: 0 },
  { rotate: -7, x: -22, y: 14 },
  { rotate: 7, x: 22, y: 22 },
];

// Floating badge spots for items waiting further back in the queue.
const SPOTS = [
  { x: 60, y: -55 },
  { x: -58, y: 55 },
];

export function HighlightCard() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const items = organizationalExperience;

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [items.length]);

  if (items.length === 0) return null;

  const stackCount = Math.min(3, items.length);
  const stackIndexes = Array.from(
    { length: stackCount },
    (_, k) => (index + k) % items.length,
  );
  const floatingItems = items.filter((_, i) => !stackIndexes.includes(i));

  return (
    <div className="relative aspect-[4/5]">
      {/* Floating badges for whatever's left in the queue, further back */}
      {floatingItems.slice(0, 2).map((item, i) => {
        const spot = SPOTS[i % SPOTS.length]!;
        return (
          <div
            key={item.title}
            className="pointer-events-none absolute z-40 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${50 + spot.x}%`, top: `${50 + spot.y}%` }}
          >
            <motion.div
              className="flex h-14 w-14 items-center justify-center rounded-xl border border-teal-400/20 bg-ink-950/90 shadow-lg backdrop-blur-sm"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4.5 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-[10px] font-semibold text-paper-300">
                {item.period.split(" ")[0]}
              </span>
            </motion.div>
          </div>
        );
      })}

      {/* Fanned card deck: back layers first, front on top */}
      {Array.from(
        { length: stackCount },
        (_, layer) => stackCount - 1 - layer,
      ).map((layer) => {
        const itemIndex = stackIndexes[layer]!;
        const item = items[itemIndex]!;
        const offset = STACK[layer]!;
        const isFront = layer === 0;

        const inner = (
          <motion.div
            key={`${itemIndex}-${index}`}
            className={`absolute inset-0 overflow-hidden rounded-[1.75rem] border p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] ${
              isFront
                ? "border-teal-400/30 bg-ink-800"
                : "border-white/10 bg-ink-800/80"
            }`}
            initial={{
              rotate: offset.rotate,
              x: offset.x,
              y: offset.y,
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              rotate: offset.rotate,
              x: offset.x,
              y: offset.y,
              opacity: isFront ? 1 : 0.7,
              scale: isFront ? 1 : 0.96,
            }}
            transition={{ duration: 0.5, ease: EASING }}
          >
            {isFront && (
              <motion.div
                key={index}
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[1.75rem] border-2 border-teal-400"
                initial={{ opacity: 0.15 }}
                animate={{ opacity: [0.15, 0.85, 0.15] }}
                transition={{ duration: ROTATE_MS / 1000, ease: "easeInOut" }}
              />
            )}
            <div className="relative flex h-full flex-col justify-end">
              <p className="text-sm font-medium text-teal-300">{item.period}</p>
              <h3 className="mt-2 text-2xl font-bold leading-snug text-paper-100">
                {item.title}
              </h3>
              <p className="mt-1 text-paper-400">{item.org}</p>
              {item.note && (
                <p className="mt-2 text-sm text-paper-500">{item.note}</p>
              )}
              {isFront && (
                <div className="mt-6 flex gap-2">
                  {items.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                        i === index ? "bg-teal-400" : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        );

        if (isFront) {
          return (
            <Link
              key={layer}
              href="/resume"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="group absolute inset-0 block"
              style={{ zIndex: 30 }}
            >
              {inner}
              <AnimatePresence>
                {hovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="pointer-events-none absolute left-1/2 top-5 z-50 w-[85%] -translate-x-1/2 rounded-xl border border-teal-400/30 bg-ink-950/90 px-4 py-2 text-center text-xs text-paper-200 backdrop-blur-sm"
                  >
                    See the full resume →
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          );
        }

        return (
          <div
            key={layer}
            className="absolute inset-0"
            style={{ zIndex: 30 - layer }}
          >
            {inner}
          </div>
        );
      })}
    </div>
  );
}
