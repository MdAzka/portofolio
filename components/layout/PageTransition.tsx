"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { Children, isValidElement } from "react";

const easing = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: easing },
  },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sections = Children.toArray(children).filter(isValidElement);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={container}
        initial="hidden"
        animate="show"
        exit={{
          opacity: 0,
          y: -18,
          filter: "blur(6px)",
          transition: { duration: 0.3, ease: easing },
        }}
      >
        {sections.map((section, index) => (
          <motion.div key={index} variants={item}>
            {section}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
