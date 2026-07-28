import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import type { ExperienceItem } from "@/lib/types";

const KIND_LABEL: Record<ExperienceItem["kind"], string> = {
  research: "Research",
  leadership: "Leadership",
  athletics: "Athletics",
  creative: "Creative",
  exchange: "Exchange",
};

export function Experience() {
  return (
    <section
      id="experience"
      className="border-b border-ink-700 bg-ink-950/40 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-content px-6">
        <SectionHeading
          eyebrow="What I've Done"
          title="My Experience"
          highlight="Experience"
          description="Research groups, student delegations, and a decade of learning by doing."
        />

        <ol className="relative ml-3 space-y-10 border-l border-ink-700 pl-8 sm:ml-6">
          {experience.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.05} className="relative">
              <span
                className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-amber-400 ring-4 ring-ink-950"
                aria-hidden
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-xl text-paper-100">
                  {item.org}
                </h3>
                <span className="font-mono text-xs text-paper-500">
                  {item.period}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-teal-300">
                {item.role}
                {item.location ? (
                  <span className="text-paper-500"> · {item.location}</span>
                ) : null}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper-400">
                {item.description}
              </p>
              <Tag className="mt-3">{KIND_LABEL[item.kind]}</Tag>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
