"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/lib/types";
import { PROJECT_CATEGORIES } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import clsx from "clsx";

interface ProjectsProps {
  projects: Project[];
}

type FilterValue = "all" | ProjectCategory;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All work" },
  { value: "ai-research", label: PROJECT_CATEGORIES["ai-research"].label },
  {
    value: "web-development",
    label: PROJECT_CATEGORIES["web-development"].label,
  },
  { value: "creative", label: PROJECT_CATEGORIES.creative.label },
];

export function Projects({ projects }: ProjectsProps) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const visible = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.category === filter);
  }, [projects, filter]);

  return (
    <section id="projects" className="border-b border-ink-700 py-24 sm:py-28">
      <div className="mx-auto max-w-content px-6">
        <SectionHeading
          eyebrow="Portfolio"
          title="My Projects"
          highlight="Projects"
          description="Everything here is a real, running repository — not a mockup."
        />

        <div
          className="mb-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={clsx(
                "rounded-full border px-4 py-2 font-mono text-xs tracking-wide transition-colors",
                filter === f.value
                  ? "border-amber-400/60 bg-amber-400/10 text-amber-300"
                  : "border-ink-600 text-paper-400 hover:border-ink-500 hover:text-paper-200",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="font-mono text-sm text-paper-500">
            Nothing filed under this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                delay={(i % 3) * 0.08}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
