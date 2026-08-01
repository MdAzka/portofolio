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

// Warna disatukan ke teal-400 (#D4C5A9) dari palette web — bukan warna
// brand asli tiap logo — biar nyatu sama tampilan keseluruhan.
const ACCENT = "#D4C5A9";

export const resumeSkills: SkillItem[] = [
  { name: "Python", Icon: SiPython, color: ACCENT },
  { name: "JavaScript", Icon: SiJavascript, color: ACCENT },
  { name: "PHP", Icon: SiPhp, color: ACCENT },
  { name: "C++", Icon: SiCplusplus, color: ACCENT },
  { name: "HTML", Icon: SiHtml5, color: ACCENT },
  { name: "CSS", Icon: SiCss, color: ACCENT },
  { name: "GitHub", Icon: SiGithub, color: ACCENT },
  { name: "Canva", Icon: SiCanvas, color: ACCENT },
  { name: "Data Science", Icon: Database, color: ACCENT },
  { name: "Computer Vision", Icon: Eye, color: ACCENT },
  { name: "Video Editing", Icon: Film, color: ACCENT },
];
