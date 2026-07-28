/**
 * Single source of truth for personal/profile data.
 * Edit this file to update the name, bio, links, and contact info
 * anywhere they appear across the site.
 */

export const siteConfig = {
  name: "Muhammad Azka Zahrani",
  shortName: "Azka Zahrani",
  initials: "AZ",
  role: "Informatics Student · AI Research & Web Development",
  tagline:
    "Studying how systems learn and building the interfaces that put them to work.",
  location: "Semarang, Indonesia",
  origin: "Sukamara, Central Kalimantan",
  email: "muhammad.azkazahrani@gmail.com",
  url: "https://azkazahrani.dev",
  university: "Universitas Dian Nuswantoro (UDINUS)",
  degree: "B.Eng. Informatics Engineering",
  degreeStatus: "In progress · 4th semester",
  social: {
    github: "https://github.com/MdAzka",
    instagram: "https://www.instagram.com/azkahrani/",
    linkedin: "https://www.linkedin.com/in/muhammad-azka-zahrani-5ab66230a/",
  },
  resumeUrl: "/resume.pdf",
  bio: [
    "I'm an Informatics Engineering student at Universitas Dian Nuswantoro, currently in the university's selective Excellence Class — a track for undergraduates focused on research, leadership, and early academic development.",
    "My work sits at the line between applied machine learning and the software that makes it usable: prediction models, data-driven tools, and the web interfaces that carry them to real people. I'm especially drawn to computer vision and human-computer interaction — the parts of AI that meet a person face to face.",
    "Outside the lab, I've directed a short film, represented my region in competitive tennis, and sat at the table as a student delegate across Southeast Asia. Different disciplines, same instinct: notice a system, understand it, then make it better.",
  ],
  resumeNote:
    "Formal research publications will land here once they exist — for now, this is a running log of what I'm building and learning.",
} as const;

export type SiteConfig = typeof siteConfig;
