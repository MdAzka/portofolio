import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer noopener"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink-800 text-paper-300 transition-colors hover:border-teal-400/50 hover:text-teal-300"
    >
      {children}
    </a>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="mx-auto max-w-content px-6">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Let's talk"
          highlight="talk"
          description="Open to research collaborations, web development work, and conversations about either."
        />

        <Reveal>
          <div className="flex flex-col gap-8 rounded-2xl border border-white/10 bg-ink-800 p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
                Email
              </p>
              <a
                href={"mailto:" + siteConfig.email}
                className="mt-3 block break-all text-2xl font-bold text-paper-100 hover:text-teal-300 transition-colors sm:text-3xl"
              >
                {siteConfig.email}
              </a>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-paper-400">
                Based in {siteConfig.location}. Usually replies within a couple
                of days.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <IconLink href={siteConfig.social.github} label="GitHub">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.42.36.78 1.07.78 2.15 0 1.56-.01 2.81-.01 3.19 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z"></path>
                </svg>
              </IconLink>
              <IconLink href={siteConfig.social.instagram} label="Instagram">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5"></rect>
                  <circle cx="12" cy="12" r="4"></circle>
                  <circle
                    cx="17.2"
                    cy="6.8"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  ></circle>
                </svg>
              </IconLink>
              <IconLink href={"mailto:" + siteConfig.email} label="Email">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                  <path d="m4 7 8 6 8-6"></path>
                </svg>
              </IconLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
