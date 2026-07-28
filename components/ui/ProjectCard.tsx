import Link from "next/link";
import type { Project } from "@/lib/types";
import { PROJECT_CATEGORIES } from "@/lib/types";
import { Tag } from "@/components/ui/Tag";
import { CardArt } from "@/components/ui/CardArt";
import { Reveal } from "@/components/ui/Reveal";

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

const STATUS_LABEL: Record<Project["status"], string> = {
  completed: "Completed",
  "in-progress": "In progress",
  archived: "Archived",
};

export function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink-700 bg-ink-800/30 transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/50 hover:shadow-[0_20px_50px_-25px_rgba(86,194,184,0.35)]"
      >
        <div className="aspect-[16/10] w-full overflow-hidden">
          <CardArt category={project.category} />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between gap-3">
            <Tag tone="amber">{PROJECT_CATEGORIES[project.category].label}</Tag>
            <span className="font-mono text-[0.65rem] text-paper-500">
              {project.year} · {STATUS_LABEL[project.status]}
            </span>
          </div>

          <h3 className="mt-4 font-display text-xl text-paper-100 group-hover:text-teal-300 transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-paper-400">
            {project.summary}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="font-mono text-[0.65rem] text-paper-500"
              >
                {s}
              </span>
            ))}
          </div>

          <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-amber-300">
            Read the case study
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
