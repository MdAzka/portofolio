export type ResumeCategoryId =
  | "experience"
  | "education"
  | "research"
  | "skills"
  | "about";

export const resumeCategories: { id: ResumeCategoryId; label: string }[] = [
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About Me" },
];

export interface ResumeEntry {
  period: string;
  title: string;
  org: string;
  note?: string;
}

export const organizationalExperience: ResumeEntry[] = [
  {
    period: "2025",
    title: "ASEAN Week Delegate",
    org: "Vietnam — International Level",
  },
  {
    period: "2024 — Present",
    title: "Student Chamber Buddy",
    org: "Universitas Dian Nuswantoro",
  },
  {
    period: "2024",
    title: "AIESEC Future Leaders Delegate",
    org: "Regional Level",
  },
  {
    period: "2023 — Present",
    title: "Kelas Unggulan (Excellence Class)",
    org: "Informatics Engineering, UDINUS",
    note: "Academic track — Regional",
  },
];

export const education: ResumeEntry[] = [
  {
    period: "2022 — Present",
    title: "B.Eng. Informatics Engineering",
    org: "Universitas Dian Nuswantoro (UDINUS)",
    note: "GPA 3.93",
  },
  {
    period: "2019 — 2022",
    title: "High School",
    org: "SMAN 1 Sukamara",
  },
];

// No formal research publications yet — add entries here when available.
export const research: ResumeEntry[] = [];

export const skillsList: string[] = [
  "Python",
  "JavaScript",
  "PHP",
  "C++",
  "HTML",
  "CSS",
  "GitHub",
  "Canva",
  "Data Science",
  "Computer Vision",
  "Video Editing",
];

export const aboutMe =
  "I'm an Informatics Engineering student at Universitas Dian Nuswantoro, currently in the university's selective Excellence Class. My work sits between applied machine learning and the software that makes it usable — prediction models, data tools, and the interfaces that carry them to real people. Outside the lab, I've represented my campus and region across a few different stages, from international delegations to organizational work.";
