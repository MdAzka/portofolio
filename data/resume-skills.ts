import type { ComponentType, CSSProperties } from "react";
import {
  SiPython,
  SiJavascript,
  SiPhp,
  SiCplusplus,
  SiHtml5,
  SiCss,
  SiGithub,
  SiCanvas,
} from "react-icons/si";
import { Database, Eye, Film } from "lucide-react";

export interface SkillItem {
  name: string;
  Icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  color: string;
}

export const resumeSkills: SkillItem[] = [
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  { name: "C++", Icon: SiCplusplus, color: "#00599C" },
  { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", Icon: SiCss, color: "#1572B6" },
  { name: "GitHub", Icon: SiGithub, color: "#E8E6DF" },
  { name: "Canva", Icon: SiCanvas, color: "#00C4CC" },
  { name: "Data Science", Icon: Database, color: "#D4C5A9" },
  { name: "Computer Vision", Icon: Eye, color: "#D4C5A9" },
  { name: "Video Editing", Icon: Film, color: "#D4C5A9" },
];
