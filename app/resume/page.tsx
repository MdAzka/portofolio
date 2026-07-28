"use client";

import { useState } from "react";
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

function EntryCard({ period, title, org, note }: ResumeEntry) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
      <p className="text-sm font-medium text-teal-400">{period}</p>
      <h3 className="mt-2 text-xl font-bold text-paper-100">{title}</h3>
      <p className="mt-1 text-paper-400">{org}</p>
      {note && <p className="mt-2 text-sm text-paper-500">{note}</p>}
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

  return (
    <main className="mx-auto max-w-[96rem] px-6 pb-24 pt-32 lg:px-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr]">
        {/* Sidebar */}
        <aside className="flex flex-row gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {resumeCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
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
        <div>
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
