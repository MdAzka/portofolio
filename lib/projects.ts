import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  Project,
  ProjectCategory,
  ProjectFrontmatter,
} from "@/lib/types";

/**
 * Projects are a file-based content collection: one MDX file per project
 * in /content/projects. Add a file to add a project. Delete it to remove
 * one. Edit frontmatter to change category, tags, links, or order. No
 * other code needs to change — pages, filters, and cards all read from
 * this single source at build time.
 *
 * See /content/projects/README.md for the frontmatter schema.
 */

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function readProjectFile(fileName: string): Project {
  const fullPath = path.join(PROJECTS_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as ProjectFrontmatter;

  if (!frontmatter.slug) {
    frontmatter.slug = fileName.replace(/\.mdx?$/, "");
  }

  return { ...frontmatter, content };
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx"));

  return files
    .map(readProjectFile)
    .sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return getAllProjects().filter((project) => project.category === category);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured);
}

export function getAllProjectSlugs(): string[] {
  return getAllProjects().map((project) => project.slug);
}
