"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const wipeEasing = [0.76, 0, 0.24, 1] as const;

/**
 * Solid full-screen wipe that sweeps left -> right on route change,
 * fully covering content (no translucent "wash" look), with a glowing
 * teal line riding the leading edge. Skips the very first page load.
 */
export function RouteTransitionOverlay() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const [transitionKey, setTransitionKey] = useState<string | null>(null);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      setTransitionKey(pathname);
    }
  }, [pathname]);

  if (!transitionKey) return null;

  return (
    <motion.div
      key={transitionKey}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 bottom-0 z-[70] flex justify-end overflow-hidden bg-ink-950"
      initial={{ width: "0%" }}
      animate={{ width: ["0%", "100%", "100%", "0%"] }}
      transition={{
        duration: 0.75,
        times: [0, 0.45, 0.55, 1],
        ease: wipeEasing,
      }}
    >
      <div className="h-full w-[2px] shrink-0 bg-teal-400 shadow-[0_0_24px_4px_rgba(86,194,184,0.55)]" />
    </motion.div>
  );
}
