import Link from "next/link";
import { Film } from "lucide-react";
import { personalProjects } from "@/data/personal-projects";
import { instagramVideos } from "@/data/instagram-videos";
import { ShinyText } from "@/components/ui/ShinyText";

export default function PersonalProjectPage() {
  return (
    <main className="mx-auto max-w-content px-6 pb-24 pt-32 lg:px-10">
      <p className="mb-3 text-sm font-medium text-teal-400">
        Personal Project
      </p>
      <h1 className="mb-14 text-4xl font-bold sm:text-5xl">
        <ShinyText text="Things I've built on my own" speed={3} />
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {personalProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-colors hover:bg-white/[0.05]"
          >
            <h2 className="text-xl font-bold text-paper-100 transition-colors group-hover:text-teal-300">
              {project.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-paper-400">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-paper-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20">
        <p className="mb-3 text-sm font-medium text-teal-400">
          From Instagram
        </p>
        <h2 className="mb-8 text-3xl font-bold text-paper-100">
          Video edits
        </h2>

        {instagramVideos.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {instagramVideos.map((video) => (
              <a
                key={video.url}
                href={video.url}
                target="_blank"
                rel="noreferrer noopener"
                className="flex aspect-[9/16] flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-ink-800 p-6 text-center transition-colors hover:bg-white/[0.05]"
              >
                <Film className="h-8 w-8 text-teal-400" />
                <span className="text-sm text-paper-300">
                  {video.caption ?? "Watch on Instagram"}
                </span>
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-paper-500">
            Video edits coming soon.
          </div>
        )}
      </div>
    </main>
  );
}
