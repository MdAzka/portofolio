export interface PersonalProject {
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

export const personalProjects: PersonalProject[] = [
  {
    slug: "student-dropout-predictor",
    title: "Student Dropout Predictor",
    description:
      "A machine learning model that predicts student dropout risk from academic and demographic data.",
    tags: ["Python", "Machine Learning"],
  },
  {
    slug: "daily-journal",
    title: "Daily Journal",
    description:
      "A simple, focused journaling app for daily reflection and habit tracking.",
    tags: ["Web App"],
  },
  {
    slug: "portfolio-site",
    title: "Portfolio Site",
    description:
      "This very site — built section by section with Next.js, Tailwind CSS, and Framer Motion.",
    tags: ["Next.js", "TypeScript"],
  },
];
