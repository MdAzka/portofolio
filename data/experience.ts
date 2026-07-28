import type { ExperienceItem } from "@/lib/types";

/**
 * Chronological, most recent first. Add an object to extend the timeline —
 * the Experience section re-renders automatically, no layout changes needed.
 */
export const experience: ExperienceItem[] = [
  {
    id: "asean-week",
    org: "ASEAN Week 2025",
    role: "Student Delegate",
    period: "Nov 2025",
    location: "Da Nang, Vietnam",
    description:
      "Represented UDINUS as a delegate in a regional student exchange, taking part in cross-cultural discussion, collaborative sessions, and forums with delegates from across Southeast Asia.",
    kind: "exchange",
  },
  {
    id: "student-chamber",
    org: "Student Chamber — International Buddies",
    role: "Student Buddy",
    period: "2025",
    location: "UDINUS",
    description:
      "Supported incoming international students through academic and cultural adaptation, pairing campus orientation with day-to-day social support.",
    kind: "leadership",
  },
  {
    id: "aiesec",
    org: "AIESEC Future Leaders",
    role: "Program Participant",
    period: "Winter Peak 2025",
    location: "Semarang, Indonesia",
    description:
      "Took part in a global leadership development program, collaborating on youth and social-impact projects alongside a cross-university cohort.",
    kind: "leadership",
  },
];
