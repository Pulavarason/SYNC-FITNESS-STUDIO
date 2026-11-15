"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";
import Photo from "./Photo";
import { SplitReveal } from "./Reveal";
import { images } from "@/lib/images";
import { enquiryExternal, enquiryHref, site } from "@/lib/site";
import { useIsMobile, useReducedMotion, registerGsap } from "@/lib/motion";
import { useReady } from "@/lib/ready";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const ready = useReady();
  const [inView, setInView] = useState(true);
  const [show3d, setShow3d] = useState(false);

  // Only mount WebGL when supported
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setShow3d(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setShow3d(false);
    }
  }, []);

  // Pause 3D when scrolled away
  useEffect(() => {
    if (!sectionRef.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  // Entrance for non-split elements + subtle parallax on the backdrop
  useLayoutEffect(() => {
    if (reduced) return;
    const { ScrollTrigger } = registerGsap();
    const ctx = gsap.context(() => {
      const items = copyRef.current?.querySelectorAll("[data-hero-fade]");
      if (items) {
        if (!ready) gsap.set(items, { opacity: 0, y: 28 });
        else
          gsap.fromTo(
            items,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.12, delay: 0.5, ease: "power3.out" }
          );
      }
      if (bgRef.current && sectionRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
    });
    return () => ctx.revert();
  }, [ready, reduced]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-black"
    >
      {/* Photographic backdrop — heavily graded so type stays the hero */}
      <div ref={bgRef} className="absolute inset-0 -top-10 -bottom-10 opacity-45">
        <Photo slot={images.heroBackdrop} className="h-full w-full" showLabel={false} priority />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_75%_45%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.65)_70%,#000_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-deep to-transparent" />

      {/* 3D */}
      {show3d && (
        <div className="absolute inset-0">
          <HeroScene reduced={reduced} mobile={mobile} active={inView && ready} />
        </div>
      )}

      {/* Copy */}
      <div className="shell relative z-10 flex flex-1 flex-col justify-end pb-20 pt-32 sm:pb-28 lg:justify-center lg:pb-16">
        <div ref={copyRef} className="max-w-3xl">
          <p data-hero-fade className="eyebrow-green mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-sync" />
            {site.locality} · Chennai
          </p>

          <h1 className="h-display text-display-xl" aria-label="Mind. Body. Power.">
            <SplitReveal as="span" text="MIND." className="block" hold={!ready} />
            <SplitReveal as="span" text="BODY." className="block" hold={!ready} delay={0.12} />
            <SplitReveal as="span" text="POWER." className="block text-sync" hold={!ready} delay={0.24} />
          </h1>

          <p data-hero-fade className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-snow sm:text-base">
            Sync your body. Unlock your potential.
          </p>
          <p data-hero-fade className="body-copy mt-4 max-w-md">
            Discover a better way to train, build strength and transform your lifestyle.
          </p>

          <div data-hero-fade className="mt-10 flex flex-col gap-4 sm:flex-row">
            <MagneticButton href={enquiryHref} external={enquiryExternal}>
              Start your journey <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#about" variant="ghost">
              Explore SYNC
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="shell absolute inset-x-0 bottom-6 z-10 flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-mist/50">
        <span className="hidden sm:inline">{site.tagline}</span>
        <span className="hidden items-center gap-3 sm:flex">
          Scroll <ArrowDown className="h-3.5 w-3.5 animate-bounce text-sync" />
        </span>
      </div>
    </section>
  );
}
