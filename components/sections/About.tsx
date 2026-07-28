import { siteConfig } from "@/lib/site-config";
import { education } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="border-b border-ink-700 py-24 sm:py-28">
      <div className="mx-auto max-w-content px-6">
        <SectionHeading
          eyebrow="About Me"
          title="Where research meets code"
          highlight="code"
          description="I study how systems learn, then build the interfaces that put them to work."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="text-lg leading-relaxed text-paper-300">
            <p>
              I&apos;m an Informatics Engineering student at UDINUS, selected
              for the university&apos;s Excellence Class — a track for students
              focused on research and leadership. My focus: applied machine
              learning and the web interfaces that make it usable, with a
              growing interest in computer vision and HCI.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-ink-800 p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
                Education
              </h3>
              <ol className="mt-5 space-y-6">
                {education.map((item) => (
                  <li
                    key={item.id}
                    className="border-l-2 border-teal-500/30 pl-4"
                  >
                    <p className="font-semibold text-paper-100">
                      {item.institution}
                    </p>
                    <p className="mt-0.5 text-sm text-paper-400">
                      {item.program}
                    </p>
                    <p className="mt-1 text-xs font-medium text-teal-400">
                      {item.period} · {item.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
