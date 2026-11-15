"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerGsap } from "@/lib/motion";

/**
 * Lenis smooth scrolling wired into GSAP's ticker so ScrollTrigger
 * stays perfectly in sync. Disabled for reduced-motion visitors.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { gsap, ScrollTrigger } = registerGsap();
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}

/** Smooth-scroll to an in-page anchor (falls back to native). */
export function scrollToId(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}
