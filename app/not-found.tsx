import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs tracking-[0.2em] text-amber-400">
        404 — NOT FOUND
      </p>
      <h1 className="mt-4 font-display text-4xl text-paper-100">
        This page didn't compile.
      </h1>
      <p className="mt-3 max-w-md text-paper-400">
        Whatever you were looking for isn't at this address. It may have
        been renamed, removed, or never existed.
      </p>
      <Link
        href="/"
        className="mt-8 font-mono text-sm text-teal-300 hover:text-teal-200"
      >
        ← Back home
      </Link>
    </div>
  );
}
