import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site-config";

const TRACKS = [
  {
    label: "Computer Vision",
    detail: "How systems interpret and act on visual input.",
  },
  {
    label: "Human-Computer Interaction",
    detail: "Where a model's output has to make sense to a person.",
  },
  {
    label: "Applied Data Science",
    detail:
      "Turning messy, real datasets into decisions — see the dropout predictor.",
  },
];

export function Research() {
  return (
    <section id="research" className="border-b border-ink-700 py-24 sm:py-28">
      <div className="mx-auto max-w-content px-6">
        <SectionHeading
          eyebrow="Research"
          title="What I'm building toward"
          highlight="building"
          description={siteConfig.resumeNote}
        />

        <Reveal>
          <div className="rounded-lg border border-dashed border-ink-600 bg-ink-800/20 p-8 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-400">
              Status
            </p>
            <p className="mt-3 max-w-2xl text-paper-300 leading-relaxed">
              I'm currently a 4th-semester undergraduate in UDINUS's Informatics
              Excellence Class, a track built around early research exposure.
              I'm active in scientific discussion and academic writing through
              UKM Penalaran, and this section is reserved for the publications
              and formal write-ups that come out of it — nothing is backfilled
              or placeholder-published here.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {TRACKS.map((track) => (
                <div key={track.label} className="border-t border-ink-700 pt-4">
                  <p className="font-display text-base text-paper-100">
                    {track.label}
                  </p>
                  <p className="mt-1.5 text-sm text-paper-500 leading-relaxed">
                    {track.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
