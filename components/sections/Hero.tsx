import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { DotFieldDecoration } from "@/components/ui/DotFieldDecoration";
import { ParticleText } from "@/components/ui/ParticleText";
import { HighlightCard } from "@/components/ui/HighlightCard";

function IconAction({
  href,
  label,
  external = false,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      aria-label={label}
      title={label}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-600 text-paper-200 transition-colors hover:border-teal-400/60 hover:text-teal-300"
    >
      {children}
    </Link>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative z-0 flex min-h-screen items-stretch overflow-hidden bg-ink-900 pt-20"
    >
      {/* Ambient glow "siluet" */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 30% 0%, rgba(212,197,169,0.16), transparent 70%)",
        }}
      />

      {/* Big ambient particle mark, behind everything, assembles immediately */}
      <div className="absolute inset-x-0 top-0 z-0 h-screen">
        <ParticleText
          texts={["AZ", "KA"]}
          focalX={0.38}
          color="212, 197, 169"
          dotOpacity={0.3}
          dotSize={2.2}
          maxParticles={900}
          holdDuration={3200}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-content grid-cols-1 items-stretch gap-0 px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8 lg:px-10">
        <div className="flex flex-col justify-center py-12 lg:py-0">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-ink-600 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-teal-400" />
            <span className="text-sm text-paper-300">
              Currently focused on AI research &amp; web development
            </span>
          </div>

          <h1 className="text-5xl font-bold leading-[1.05] text-paper-100 sm:text-6xl lg:text-7xl">
            Hi, I&apos;m Muhammad Azka Zahrani
          </h1>

          <p className="mt-4 text-lg font-medium text-teal-300">
            Informatics Engineering Student
          </p>

          <p className="mt-4 max-w-lg leading-relaxed text-paper-400">
            I build practical tools with data and websites people actually enjoy
            using. Currently studying Informatics Engineering at Universitas
            Dian Nuswantoro, with a growing focus on AI research and full-stack
            web development.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={siteConfig.resumeUrl}
              download
              className="flex items-center gap-2 rounded-full bg-teal-400 px-6 py-3 font-medium text-ink-950 transition-transform hover:scale-[1.03]"
            >
              Download CV
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <IconAction href={siteConfig.social.github} label="GitHub" external>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.42.36.78 1.07.78 2.15 0 1.56-.01 2.81-.01 3.19 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
              </svg>
            </IconAction>

            <IconAction
              href={siteConfig.social.linkedin}
              label="LinkedIn"
              external
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
              </svg>
            </IconAction>

            <IconAction
              href={siteConfig.social.instagram}
              label="Instagram"
              external
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.2"
                  cy="6.8"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </IconAction>
          </div>
        </div>

        <div className="relative flex items-center justify-center py-8 lg:py-0">
          <div className="relative w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[420px]">
            {/* Dot field — di paling belakang, di bawah glow */}
            <DotFieldDecoration className="-z-20 scale-150" />

            {/* Glow belakang */}
            <div
              aria-hidden
              className="absolute inset-4 -z-10 rounded-[2rem] bg-teal-400/25 blur-[70px]"
            />
            <div
              aria-hidden
              className="absolute -top-12 -right-10 -z-10 h-72 w-72 rounded-full bg-teal-500/25 blur-3xl"
            />

            {/* Highlight card — replaces the static photo */}
            <HighlightCard />
          </div>
        </div>
      </div>
    </section>
  );
}
