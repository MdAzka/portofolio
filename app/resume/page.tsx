"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  resumeCategories,
  organizationalExperience,
  education,
  research,
  aboutMe,
  type ResumeCategoryId,
  type ResumeEntry,
} from "@/data/resume-content";
import { resumeSkills } from "@/data/resume-skills";

const PHOTO_ROTATE_MS = 3000;

function EntryCard({
  period,
  title,
  org,
  note,
  description,
  images = [],
}: ResumeEntry) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setPhotoIndex((i) => (i + 1) % images.length);
    }, PHOTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [images.length]);

  const hasPhoto = images.length > 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
      {/* Photo area */}
      <div className="relative aspect-[4/3] w-full bg-ink-800">
        {hasPhoto ? (
          <>
            <AnimatePresence mode="wait">
              <motion.img
                key={photoIndex}
                src={images[photoIndex]}
                alt={title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === photoIndex ? "w-5 bg-white" : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-700 to-ink-900">
            <span className="text-xs text-paper-500">Photo coming soon</span>
          </div>
        )}
      </div>

      {/* Text */}
      <button
        type="button"
        onClick={() => description && setExpanded((v) => !v)}
        className="block w-full p-5 text-left transition-colors hover:bg-white/[0.03]"
      >
        <h3 className="text-lg font-bold text-paper-100">{title}</h3>
        <p className="mt-1 text-sm text-paper-400">
          {org} <span className="mx-1.5 text-paper-600">··</span> {period}
        </p>
        {note && <p className="mt-1 text-xs text-paper-500">{note}</p>}

        <AnimatePresence>
          {expanded && description && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden text-sm leading-relaxed text-paper-300"
            >
              <span className="mb-0 mt-3 block">{description}</span>
            </motion.p>
          )}
        </AnimatePresence>

        {description && (
          <span className="mt-3 block text-xs font-medium text-teal-400/80">
            {expanded ? "Show less" : "Tap for details"}
          </span>
        )}
      </button>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-paper-500">
      No {label} entries yet.
    </div>
  );
}

export default function ResumePage() {
  const [active, setActive] = useState<ResumeCategoryId>("experience");
  const activeLabel = resumeCategories.find((c) => c.id === active)?.label;
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSelect = (id: ResumeCategoryId) => {
    setActive(id);
    // On mobile the sidebar sits above the content (stacked layout), so
    // auto-scroll down to the content when a category is tapped.
    if (window.innerWidth < 1024) {
      requestAnimationFrame(() => {
        contentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  };

  return (
    <main className="mx-auto max-w-[96rem] px-6 pb-24 pt-32 lg:px-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr]">
        {/* Sidebar */}
        <aside className="flex flex-col gap-3">
          {resumeCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelect(cat.id)}
              className={`shrink-0 rounded-xl px-5 py-4 text-left text-sm font-semibold transition-colors lg:text-base ${
                active === cat.id
                  ? "bg-teal-400 text-ink-950"
                  : "bg-white/[0.03] text-paper-300 hover:bg-white/[0.06] hover:text-paper-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <div ref={contentRef} className="scroll-mt-28">
          <h1 className="mb-8 text-4xl font-bold text-paper-100 sm:text-5xl">
            {activeLabel}
          </h1>

          {active === "experience" && (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {organizationalExperience.map((item, i) => (
                <EntryCard key={i} {...item} />
              ))}
            </div>
          )}

          {active === "education" && (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {education.map((item, i) => (
                <EntryCard key={i} {...item} />
              ))}
            </div>
          )}

          {active === "research" && (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {research.length > 0 ? (
                research.map((item, i) => <EntryCard key={i} {...item} />)
              ) : (
                <EmptyState label="research" />
              )}
            </div>
          )}

          {active === "skills" && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {resumeSkills.map(({ name, Icon, color }) => (
                <div
                  key={name}
                  className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 text-center transition-colors hover:bg-white/[0.06]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-paper-100">
                    <Icon className="h-9 w-9" style={{ color }} />
                  </div>
                  <span className="text-sm font-medium text-paper-200">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {active === "about" && (
            <p className="max-w-2xl leading-relaxed text-paper-300">
              {aboutMe}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
