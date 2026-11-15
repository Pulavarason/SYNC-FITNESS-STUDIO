"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import MagneticButton from "./MagneticButton";
import { scrollToId } from "./SmoothScroll";
import { enquiryExternal, enquiryHref, links, site } from "@/lib/site";

const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "programs", label: "Programs" },
  { id: "gallery", label: "Gallery" },
  { id: "membership", label: "Membership" },
  { id: "contact", label: "Contact" },
];

type LenisLike = { stop: () => void; start: () => void };
const getLenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  // Solid bar after leaving the top of the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lock scroll + Escape to close while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      getLenis()?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // wait a tick so scroll lock is released before scrolling
    setTimeout(() => scrollToId(`#${id}`), 60);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-luxe ${
          scrolled || open
            ? "border-b border-white/10 bg-black/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="shell flex h-[72px] items-center justify-between" aria-label="Primary">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("home");
            }}
            aria-label="SYNC Fitness Studio — back to top"
            className="relative z-[60]"
          >
            <Logo />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(n.id);
                  }}
                  aria-current={active === n.id ? "true" : undefined}
                  className={`group relative py-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                    active === n.id ? "text-snow" : "text-mist/60 hover:text-snow"
                  }`}
                >
                  {n.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-sync transition-all duration-500 ease-luxe ${
                      active === n.id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <MagneticButton
              href={enquiryHref}
              external={enquiryExternal}
              className="!hidden !px-6 !py-3 sm:!inline-flex"
              strength={0.2}
            >
              Join Now
            </MagneticButton>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-snow transition-colors hover:border-sync lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-black px-gutter pb-10 pt-28 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {nav.map((n, i) => (
                <li key={n.id} className="overflow-hidden border-b border-white/10">
                  <motion.a
                    href={`#${n.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(n.id);
                    }}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-baseline justify-between py-4 font-display text-[clamp(2.4rem,11vw,3.6rem)] uppercase leading-none text-snow"
                  >
                    <span className={active === n.id ? "text-sync" : ""}>{n.label}</span>
                    <span className="text-xs font-sans font-semibold tracking-[0.2em] text-mist/40">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col gap-5"
            >
              <MagneticButton
                href={enquiryHref}
                external={enquiryExternal}
                onClick={() => setOpen(false)}
                className="w-full"
                strength={0}
              >
                Join Now <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
              <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-mist/50">
                {site.tagline}
              </p>
              {links.directions && (
                <p className="text-center text-xs text-mist/40">{site.address}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
