"use client";

import { useEffect, useRef } from "react";

interface ParticleTextProps {
  /** Words to cycle through, e.g. ["AZ", "KA"] */
  texts: string[];
  className?: string;
  /** RGB triplet as a string, e.g. "86, 194, 184" (teal) */
  color?: string;
  dotOpacity?: number;
  dotSize?: number;
  /** Horizontal anchor for the text, 0 = left edge, 1 = right edge */
  focalX?: number;
  maxParticles?: number;
  /** Milliseconds each word stays formed before morphing to the next */
  holdDuration?: number;
}

interface Point {
  x: number;
  y: number;
}

export function ParticleText({
  texts,
  className = "",
  color = "86, 194, 184",
  dotOpacity = 0.5,
  dotSize = 2,
  focalX = 0.5,
  maxParticles = 900,
  holdDuration = 3200,
}: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let animationFrame = 0;
    let cycleTimer: ReturnType<typeof setInterval> | undefined;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      startX: number;
      startY: number;
      targetX: number;
      targetY: number;
      progress: number;
      speed: number;
      size: number;
      opacity: number;
      angle: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
        this.targetX = x;
        this.targetY = y;
        this.progress = 1;
        this.speed = 0.018 + Math.random() * 0.022;
        this.size = dotSize * (0.6 + Math.random() * 0.7);
        this.opacity = dotOpacity * (0.5 + Math.random() * 0.5);
        this.angle = Math.random() * Math.PI * 2;
      }

      retarget(x: number, y: number) {
        this.startX = this.x;
        this.startY = this.y;
        this.targetX = x;
        this.targetY = y;
        this.progress = 0;
      }

      update() {
        if (this.progress < 1) {
          this.progress = Math.min(1, this.progress + this.speed);
          const eased = 1 - Math.pow(1 - this.progress, 3);
          this.x = this.startX + (this.targetX - this.startX) * eased;
          this.y = this.startY + (this.targetY - this.startY) * eased;
        } else {
          this.angle += 0.02;
          this.x = this.targetX + Math.cos(this.angle) * 1.1;
          this.y = this.targetY + Math.sin(this.angle) * 1.1;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(${color}, ${this.opacity})`;
        context.fill();
      }
    }

    function buildPoints(word: string, width: number, height: number): Point[] {
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return [];

      const fontSize = Math.min(width / (word.length * 0.75), height * 0.55);
      offCtx.fillStyle = "#fff";
      offCtx.font = `800 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";

      const textWidth = offCtx.measureText(word).width;
      const margin = 24;
      const rawX = width * focalX;
      const x = Math.min(
        Math.max(rawX, textWidth / 2 + margin),
        width - textWidth / 2 - margin,
      );
      offCtx.fillText(word, x, height / 2);

      const imageData = offCtx.getImageData(0, 0, width, height).data;
      const gap = Math.max(2, Math.floor(fontSize / 55));
      const points: Point[] = [];

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4 + 3;
          const alpha = imageData[index];
          if (alpha !== undefined && alpha > 128) points.push({ x, y });
        }
      }
      return points;
    }

    function setupWithSize(width: number, height: number) {
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const pointSets = texts.map((word) => buildPoints(word, width, height));
      const largestSet = Math.max(...pointSets.map((set) => set.length), 1);
      const count = Math.min(maxParticles, largestSet);

      const firstSet = pointSets[0] ?? [];
      particles = Array.from({ length: count }, (_, i) => {
        const target = firstSet[i % Math.max(firstSet.length, 1)] ?? {
          x: width / 2,
          y: height / 2,
        };
        const p = new Particle(Math.random() * width, Math.random() * height);
        p.retarget(target.x, target.y);
        return p;
      });

      if (prefersReducedMotion) {
        particles.forEach((p) => {
          p.progress = 1;
          p.x = p.targetX;
          p.y = p.targetY;
        });
      }

      if (cycleTimer) clearInterval(cycleTimer);
      if (texts.length > 1 && !prefersReducedMotion) {
        let textIndex = 0;
        cycleTimer = setInterval(() => {
          textIndex = (textIndex + 1) % texts.length;
          const nextSet = pointSets[textIndex] ?? [];
          particles.forEach((p, i) => {
            const target = nextSet[i % Math.max(nextSet.length, 1)] ?? {
              x: width / 2,
              y: height / 2,
            };
            p.retarget(target.x, target.y);
          });
        }, holdDuration);
      }
    }

    function render() {
      const rect = canvas!.getBoundingClientRect();
      ctx!.clearRect(0, 0, rect.width, rect.height);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx!);
      });
      animationFrame = requestAnimationFrame(render);
    }

    let renderStarted = false;
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (width === 0 || height === 0) return;

      cancelAnimationFrame(animationFrame);
      setupWithSize(width, height);

      if (!renderStarted) {
        renderStarted = true;
        render();
      }
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      if (cycleTimer) clearInterval(cycleTimer);
    };
  }, [texts, color, dotOpacity, dotSize, focalX, maxParticles, holdDuration]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none block h-full w-full ${className}`}
    />
  );
}
