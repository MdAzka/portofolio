export interface SkillGroup {
  id: string;
  label: string;
  eyebrow: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    eyebrow: "§ Languages",
    label: "Programming Languages",
    items: ["Python", "JavaScript", "PHP", "C++", "HTML", "CSS"],
  },
  {
    id: "focus",
    eyebrow: "§ Focus & Tools",
    label: "Focus Areas & Tools",
    items: [
      "Data Science",
      "Computer Vision",
      "Git & GitHub",
      "Canva",
      "DaVinci Resolve",
    ],
  },
];
