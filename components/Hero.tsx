"use client";

import { useLayoutEffect, useRef } from "react";
import { Activity, ArrowDown, ArrowUpRight, HeartPulse, Target } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";
import { SplitReveal } from "./Reveal";
import { enquiryExternal, enquiryHref, site } from "@/lib/site";
import { useReducedMotion, registerGsap } from "@/lib/motion";
import { useReady } from "@/lib/ready";

export default function Hero() {
  const copyRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const ready = useReady();

  useLayoutEffect(() => {
    if (reduced) return;
    registerGsap();
    const ctx = gsap.context(() => {
      const items = copyRef.current?.querySelectorAll("[data-hero-fade]");
      if (items) {
        if (!ready) gsap.set(items, { opacity: 0, y: 28 });
        else
          gsap.fromTo(
            items,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.12, delay: 0.35, ease: "power3.out" }
          );
      }
    });
    return () => ctx.revert();
  }, [ready, reduced]);

  return (
    <section
      id="home"
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-black"
    >
      {/* Runner image with overlays that keep the copy legible. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-0 overflow-hidden"
        initial={reduced ? false : { opacity: 0, scale: 1.035 }}
        animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.035 }}
        transition={{ duration: reduced ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/hero-runner.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover object-[68%_center] sm:object-[center_10%]"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.94)_24%,rgba(0,0,0,0.68)_43%,rgba(0,0,0,0.12)_72%,rgba(0,0,0,0.18)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0.72)_12%,transparent_48%,rgba(0,0,0,0.26)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_76%_46%,rgba(101,204,0,0.13),transparent_44%)]" />

      {/* Copy and training features sit below the image focal point. */}
      <div className="shell relative z-10 flex flex-1 flex-col justify-end pb-14 pt-12 sm:pb-28 sm:pt-10 lg:justify-center lg:pb-20">
        <div ref={copyRef} className="max-w-3xl">
          <p data-hero-fade className="eyebrow-green mb-6 flex items-center gap-3 lg:mb-4">
            <span className="h-px w-10 bg-sync" />
            {site.locality} · Chennai
          </p>

          <h1 className="h-display text-display-xl lg:text-[clamp(4rem,12vh,8rem)] lg:leading-[0.88]" aria-label="Mind. Body. Power.">
            <SplitReveal as="span" text="MIND." className="block" hold={!ready} />
            <SplitReveal as="span" text="BODY." className="block" hold={!ready} delay={0.12} />
            <SplitReveal as="span" text="POWER." className="block text-sync" hold={!ready} delay={0.24} />
          </h1>

          <p data-hero-fade className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-snow sm:text-base lg:mt-5">
            Sync your body. Unlock your potential.
          </p>
          <p data-hero-fade className="body-copy mt-4 max-w-md lg:mt-3">
            Discover a better way to train, build strength and transform your lifestyle.
          </p>

          <div data-hero-fade className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-snow/65 sm:text-[0.65rem] lg:mt-4">
            <span className="inline-flex items-center gap-2">
              <Target className="h-3.5 w-3.5 text-sync" /> Strength training
            </span>
            <span className="inline-flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-sync" /> Cardio conditioning
            </span>
            <span className="inline-flex items-center gap-2">
              <HeartPulse className="h-3.5 w-3.5 text-sync" /> Everyday fitness
            </span>
          </div>

          <div data-hero-fade className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-5">
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
      <div className="shell absolute inset-x-0 bottom-5 z-10 flex items-center justify-between text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-mist/50 sm:bottom-6 sm:text-[0.65rem] sm:tracking-[0.3em]">
        <span className="hidden sm:inline">{site.tagline}</span>
        <span className="hidden items-center gap-3 sm:flex">
          Scroll <ArrowDown className="h-3.5 w-3.5 animate-bounce text-sync" />
        </span>
      </div>
    </section>
  );
}
