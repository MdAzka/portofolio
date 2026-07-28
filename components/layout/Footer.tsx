import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-700 bg-ink-950">
      <div className="mx-auto max-w-content px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-paper-500">
          © {year} {siteConfig.name}. Built from scratch, section by
          section.
        </p>
        <div className="flex items-center gap-6 font-mono text-xs text-paper-500">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-teal-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-amber-300 transition-colors"
          >
            Email
          </a>
          <a href="#top" className="hover:text-paper-200 transition-colors">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
