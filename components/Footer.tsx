import Logo from "./Logo";
import { site } from "@/lib/site";

const nav = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Programs", "#programs"],
  ["Gallery", "#gallery"],
  ["Membership", "#membership"],
  ["Contact", "#contact"],
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black pt-20">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-center">
          <Logo variant="full" className="!items-start !text-left" />
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-4 sm:grid-cols-3">
              {nav.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-mist/60 transition-colors hover:text-sync"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 py-8 text-xs text-mist/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.25em]">{site.tagline}</p>
        </div>
      </div>

      <span
        aria-hidden
        className="pointer-events-none block select-none text-center font-display text-[34vw] leading-[0.72] text-white/[0.035]"
      >
        SYNC
      </span>
    </footer>
  );
}
