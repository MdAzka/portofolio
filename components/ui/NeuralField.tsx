"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label?: string;
  r: number;
}

const LABELS = ["AI", "Vision", "Data", "Web", "HCI", "Research"];

/**
 * The site's one deliberate visual flourish: a quiet, drifting node graph
 * standing in for the connective, associative nature of the work — model
 * to interface, research to product. Nodes are labelled with the author's
 * actual focus areas. Freezes for prefers-reduced-motion.
 */
export function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let raf = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 480 ? 7 : 11;
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: i < LABELS.length ? 2.6 : 1.6,
        label: i < LABELS.length ? LABELS[i] : undefined,
      }));
    }

    function step() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          if (!a || !b) continue;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          const max = 180;
          if (d < max) {
            ctx.strokeStyle = `rgba(86, 194, 184, ${0.16 * (1 - d / max)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = n.label
          ? "rgba(232, 163, 61, 0.9)"
          : "rgba(199, 205, 200, 0.55)";
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();

        if (n.label) {
          ctx.font = "500 11px ui-monospace, monospace";
          ctx.fillStyle = "rgba(199, 205, 200, 0.6)";
          ctx.fillText(n.label, n.x + 8, n.y + 3);
        }
      }

      if (!prefersReduced) {
        raf = requestAnimationFrame(step);
      }
    }

    resize();
    step();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      role="img"
      aria-label="An animated diagram of connected nodes labelled AI, Vision, Data, Web, HCI, and Research"
    />
  );
}
