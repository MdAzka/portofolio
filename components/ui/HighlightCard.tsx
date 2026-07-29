"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { organizationalExperience } from "@/data/resume-content";

const ROTATE_MS = 2800;
const PHOTO_ROTATE_MS = 1800;
const EASING = [0.16, 1, 0.3, 1] as const;

// Offset per displacement from front: 0 = front, 1/2 = peeking behind, 3+ = waiting off to the side.
function slotFor(displacement: number) {
  switch (displacement) {
    case 0:
      return { rotate: 0, x: 0, y: 0, opacity: 1, scale: 1, z: 30 };
    case 1:
      return { rotate: -8, x: -26, y: 16, opacity: 0.75, scale: 0.95, z: 20 };
    case 2:
      return { rotate: 8, x: 26, y: 22, opacity: 0.55, scale: 0.92, z: 10 };
    default:
      return { rotate: 16, x: 120, y: -50, opacity: 0, scale: 0.9, z: 0 };
  }
}

export function HighlightCard() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const items = organizationalExperience;

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [items.length]);

  const activeImages = items[index]?.images ?? [];

  useEffect(() => {
    setPhotoIndex(0);
    if (!hovered || activeImages.length <= 1) return;
    const timer = setInterval(() => {
      setPhotoIndex((i) => (i + 1) % activeImages.length);
    }, PHOTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [hovered, activeImages.length]);

  if (items.length === 0) return null;

  return (
    <div className="relative aspect-[4/5]">
      {items.map((item, itemIndex) => {
        const displacement =
          (itemIndex - index + items.length) % items.length;
        const slot = slotFor(displacement);
        const isFront = displacement === 0;
        const hasPhoto = isFront && hovered && item.images && item.images.length > 0;

        return (
          <motion.div
            key={itemIndex}
            className="absolute inset-0"
            style={{ zIndex: slot.z }}
            animate={{
              rotate: slot.rotate,
              x: slot.x,
              y: slot.y,
              opacity: slot.opacity,
              scale: slot.scale,
            }}
            transition={{ duration: 0.65, ease: EASING }}
          >
            <Link
              href="/resume"
              tabIndex={isFront ? 0 : -1}
              aria-hidden={!isFront}
              onMouseEnter={() => isFront && setHovered(true)}
              onMouseLeave={() => isFront && setHovered(false)}
              className={`relative block h-full w-full overflow-hidden rounded-[1.75rem] border p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] ${
                isFront
                  ? "pointer-events-auto border-teal-400/30 bg-ink-800"
                  : "pointer-events-none border-white/10 bg-ink-800/80"
              }`}
            >
              {/* Hover: card "opens up" into a photo (or a soft placeholder if no photo yet) */}
              {isFront && (
                <AnimatePresence>
                  {hovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 z-10"
                    >
                      {hasPhoto ? (
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={photoIndex}
                            src={item.images![photoIndex]}
                            alt=""
                            initial={{ opacity: 0, scale: 1.04 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="h-full w-full object-cover"
                          />
                        </AnimatePresence>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-700 to-ink-900">
                          <span className="text-xs text-paper-500">
                            Photo coming soon
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              <div className="relative z-20 flex h-full flex-col justify-end">
                <p className="text-sm font-medium text-teal-300">
                  {item.period}
                </p>
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
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
