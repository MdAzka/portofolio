import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllProjectSlugs,
  getAllProjects,
  getProjectBySlug,
} from "@/lib/projects";
import { PROJECT_CATEGORIES } from "@/lib/types";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

interface ProjectPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const related = getAllProjects()
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 2);

  return (
    <article className="pt-32 pb-24">
      <div className="mx-auto max-w-prose px-6">
        <Reveal>
          <Link
            href="/#projects"
            className="font-mono text-xs text-teal-300 hover:text-teal-200"
          >
            ← Back to projects
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <Tag tone="amber">{PROJECT_CATEGORIES[project.category].label}</Tag>
            <span className="font-mono text-xs text-paper-500">
              {project.year}
            </span>
          </div>

          <h1 className="mt-4 font-display text-4xl text-paper-100 text-balance sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-paper-400">
            {project.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-ink-700 py-5 font-mono text-xs text-paper-500">
            <span>
              <span className="text-paper-300">Stack</span> ·{" "}
              {project.stack.join(", ")}
            </span>
            {project.role ? (
              <span>
                <span className="text-paper-300">Role</span> · {project.role}
              </span>
            ) : null}
          </div>

          {project.links && (project.links.github || project.links.live) ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.github ? (
                <Button href={project.links.github} variant="ghost" external>
                  View source ↗
                </Button>
              ) : null}
              {project.links.live ? (
                <Button href={project.links.live} variant="primary" external>
                  Live demo ↗
                </Button>
              ) : null}
            </div>
          ) : null}
        </Reveal>

        <Reveal delay={0.1} className="prose-project mt-12">
          <MDXRemote source={project.content} />
        </Reveal>
      </div>

      {related.length > 0 ? (
        <div className="mx-auto mt-24 max-w-content px-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-paper-500">
            More in {PROJECT_CATEGORIES[project.category].label}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}
