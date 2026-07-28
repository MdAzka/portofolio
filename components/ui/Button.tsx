import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  icon?: ReactNode;
  className?: string;
}

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  icon,
  className,
}: ButtonProps) {
  const classes = clsx(
    "group inline-flex items-center gap-2 rounded-md px-5 py-3 font-mono text-sm tracking-wide transition-all duration-200",
    variant === "primary" &&
      "bg-amber-400 text-ink-950 hover:bg-amber-300 shadow-[0_0_0_1px_rgba(232,163,61,0.4)]",
    variant === "ghost" &&
      "border border-ink-600 text-paper-200 hover:border-teal-400/60 hover:text-teal-300",
    className
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  );
}
