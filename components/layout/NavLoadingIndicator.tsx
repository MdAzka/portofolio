"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export function NavLoadingIndicator() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed right-6 top-6 z-[60] sm:right-10 sm:top-8">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-teal-400 shadow-[0_0_14px_3px_rgba(86,194,184,0.55)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
