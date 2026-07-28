export type ProjectCategory = "ai-research" | "web-development" | "creative";

export const PROJECT_CATEGORIES: Record<
  ProjectCategory,
  { label: string; short: string }
> = {
  "ai-research": { label: "AI & Research", short: "AI" },
  "web-development": { label: "Web Development", short: "Web" },
  creative: { label: "Creative", short: "Creative" },
};

export type ProjectStatus = "completed" | "in-progress" | "archived";

export interface ProjectLinks {
  github?: string;
  live?: string;
  writeup?: string;
}

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  summary: string;
  category: ProjectCategory;
  tags: string[];
  stack: string[];
  year: string;
  status: ProjectStatus;
  order: number;
  featured?: boolean;
  links?: ProjectLinks;
  role?: string;
}

export interface Project extends ProjectFrontmatter {
  content: string;
}

export interface ExperienceItem {
  id: string;
  org: string;
  role: string;
  period: string;
  location?: string;
  description: string;
  kind: "research" | "leadership" | "athletics" | "creative" | "exchange";
}

export interface EducationItem {
  id: string;
  institution: string;
  program: string;
  period: string;
  detail: string;
  highlights: string[];
}
