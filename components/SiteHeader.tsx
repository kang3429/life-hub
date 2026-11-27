import Link from "next/link";
import { navLinks, site } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name} 홈`}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-base font-bold text-white shadow-sm transition group-hover:bg-brand-700">
            {site.name.slice(0, 1)}
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight text-ink-900">{site.name}</span>
            <span className="hidden text-[10.5px] font-semibold tracking-wide text-brand-600 sm:block">
              {site.domain}
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-semibold text-ink-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 transition hover:bg-brand-50 hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
