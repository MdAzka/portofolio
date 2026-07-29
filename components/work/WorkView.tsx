"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Grid3x3 } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { workProjects } from "@/data/work-projects";

export function WorkView() {
  const searchParams = useSearchParams();
  const [index, setIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const category = searchParams.get("category");
    if (!category) return;
    const match = workProjects.findIndex((p) => p.categorySlug === category);
    if (match >= 0) setIndex(match);
  }, [searchParams]);

  const project = workProjects[index];
  if (!project) return null;

  const goPrev = () =>
    setIndex((i) => (i - 1 + workProjects.length) % workProjects.length);
  const goNext = () => setIndex((i) => (i + 1) % workProjects.length);

  if (showAll) {
    return (
      <main className="mx-auto max-w-content px-6 pb-24 pt-32 lg:px-10">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-paper-100 sm:text-5xl">
            All Projects
          </h1>
          <button
            type="button"
            onClick={() => setShowAll(false)}
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-paper-100 transition-colors hover:border-teal-400/60 hover:text-teal-300"
          >
            Back to view
          </button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workProjects.map((p, i) => (
            <button
              key={p.title}
              type="button"
              onClick={() => {
                setIndex(i);
                setShowAll(false);
              }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left transition-colors hover:bg-white/[0.05]"
            >
              <span className="font-mono text-sm text-teal-400">
                {p.number}
              </span>
              <p className="mt-1 text-xs text-paper-500">{p.category}</p>
              <h3 className="mt-3 text-xl font-bold text-paper-100">
                {p.title}
              </h3>
            </button>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-content px-6 pb-24 pt-32 lg:px-10">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-4xl text-paper-500">
                {project.number}
              </span>
              <span className="h-6 w-px bg-white/20" />
              <span className="text-sm font-medium text-teal-400">
                {project.category}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold text-paper-100 sm:text-5xl">
              {project.title}
            </h1>

            <p className="mt-5 max-w-md leading-relaxed text-paper-400">
              {project.description}
            </p>

            {project.techStack.length > 0 && (
              <p className="mt-5 font-mono text-sm text-teal-300">
                {project.techStack.join(", ")}
              </p>
            )}

            <div className="mt-8 border-t border-white/10 pt-6">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="View on GitHub"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-paper-200 transition-colors hover:border-teal-400/60 hover:text-teal-300"
                >
                  <SiGithub className="h-5 w-5" />
                </a>
              ) : (
                <span className="text-xs text-paper-600">Link coming soon</span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Media placeholder */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-ink-800"
          >
            {project.mediaSrc ? (
              <img
                src={project.mediaSrc}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm text-paper-500">
                Preview coming soon
              </span>
            )}
            <span className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-ink-950/70 text-paper-100">
              <Play className="h-5 w-5 translate-x-0.5" />
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-14 flex items-center justify-between border-t border-white/10 pt-6">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous project"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-paper-200 transition-colors hover:border-teal-400/60 hover:text-teal-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next project"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-paper-200 transition-colors hover:border-teal-400/60 hover:text-teal-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-paper-100 transition-colors hover:border-teal-400/60 hover:text-teal-300"
        >
          <Grid3x3 className="h-4 w-4" />
          Show all
        </button>
      </div>
    </main>
  );
}
