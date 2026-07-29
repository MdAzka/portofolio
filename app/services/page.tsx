import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { services } from "@/data/services";

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-content px-6 pb-24 pt-32 lg:px-10">
      <p className="mb-3 text-sm font-medium text-teal-400">Services</p>
      <h1 className="mb-14 text-4xl font-bold text-paper-100 sm:text-5xl">
        What I can help with
      </h1>

      <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.categorySlug}
            href={`/work?category=${service.categorySlug}`}
            className="group block border-b border-white/10 pb-8"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-3xl text-paper-500">
                {service.number}
              </span>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-paper-100 transition-colors group-hover:border-teal-400 group-hover:bg-teal-400 group-hover:text-ink-950">
                <ArrowDownRight className="h-5 w-5" />
              </span>
            </div>

            <h2 className="mt-6 text-2xl font-bold text-paper-100 sm:text-3xl">
              {service.title}
            </h2>
            <p className="mt-3 max-w-md text-paper-400">
              {service.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
