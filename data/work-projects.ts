export interface WorkProject {
  number: string;
  category: string;
  categorySlug: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  mediaSrc?: string;
}

// Placeholder entries — replace each with your real projects once you send them over.
export const workProjects: WorkProject[] = [
  {
    number: "01",
    category: "Video Editing",
    categorySlug: "video-editing",
    title: "Sample Video Project",
    description:
      "Placeholder entry — replace with your real video editing project once it's ready.",
    techStack: ["Premiere Pro", "DaVinci Resolve"],
  },
  {
    number: "02",
    category: "Machine Learning & Deep Learning",
    categorySlug: "machine-learning",
    title: "Sample ML Project",
    description:
      "Placeholder entry — replace with your real machine learning project once it's ready.",
    techStack: ["Python", "TensorFlow"],
  },
  {
    number: "03",
    category: "Web Development",
    categorySlug: "web-development",
    title: "Sample Web Project",
    description:
      "Placeholder entry — replace with your real web development project once it's ready.",
    techStack: ["Next.js", "TypeScript"],
  },
];
