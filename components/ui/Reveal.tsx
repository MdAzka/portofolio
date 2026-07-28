"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}

const variants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const sharedProps = {
    className,
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-80px" },
    custom: delay,
    variants,
  };

  if (as === "li") {
    return <motion.li {...sharedProps}>{children}</motion.li>;
  }

  return <motion.div {...sharedProps}>{children}</motion.div>;
}
