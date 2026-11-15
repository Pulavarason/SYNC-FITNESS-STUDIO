"use client";

import { useLayoutEffect, useRef } from "react";
import { registerGsap } from "@/lib/motion";
import { SplitReveal, Reveal } from "./Reveal";

/** Minimal clock: scroll turns the hands, a slim green second hand idles. Static when motion is reduced. */
function Clock() {
  const ticks = Array.from({ length: 12 });
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label="Clock">
      <circle cx="100" cy="100" r="96" fill="#000" stroke="#F5F5F5" strokeWidth="3" />
      {ticks.map((_, i) => (
        <line
          key={i}
          x1="100"
          y1={i % 3 === 0 ? 14 : 18}
          x2="100"
          y2={i % 3 === 0 ? 28 : 24}
          stroke="#F5F5F5"
          strokeOpacity={i % 3 === 0 ? 0.9 : 0.35}
          strokeWidth={i % 3 === 0 ? 3 : 1.5}
          strokeLinecap="round"
          transform={`rotate(${i * 30} 100 100)`}
        />
      ))}
      <line data-hand="hour" x1="100" y1="100" x2="100" y2="58" stroke="#F5F5F5" strokeWidth="5" strokeLinecap="round" />
      <line data-hand="minute" x1="100" y1="100" x2="100" y2="36" stroke="#F5F5F5" strokeWidth="3" strokeLinecap="round" />
      <line data-hand="second" x1="100" y1="112" x2="100" y2="26" stroke="#65CC00" strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="100" r="5" fill="#65CC00" />
    </svg>
  );
}

export default function Experience247() {
  const section = useRef<HTMLElement>(null);
  const clock = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLSpanElement>(null);
  const right = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!section.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      const root = clock.current!;
      const origin = { svgOrigin: "100 100" };
      gsap.set(root.querySelectorAll("[data-hand]"), origin);
      gsap.set('[data-hand="hour"]', { rotation: 0 });

      const st = { trigger: section.current, start: "top bottom", end: "bottom top", scrub: 0.6 };
      gsap.to('[data-hand="minute"]', { rotation: 720, ease: "none", scrollTrigger: st, ...origin });
      gsap.to('[data-hand="hour"]', { rotation: 60, ease: "none", scrollTrigger: st, ...origin });
      gsap.to('[data-hand="second"]', { rotation: 360, duration: 12, repeat: -1, ease: "none", ...origin });

      gsap.fromTo(left.current, { xPercent: -14 }, { xPercent: 6, ease: "none", scrollTrigger: st });
      gsap.fromTo(right.current, { xPercent: 14 }, { xPercent: -6, ease: "none", scrollTrigger: st });
      gsap.fromTo(
        root,
        { scale: 0.8, opacity: 0.4 },
        { scale: 1, opacity: 1, ease: "none", scrollTrigger: { ...st, end: "center center" } }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={section}
      aria-labelledby="exp-title"
      className="section-pad relative overflow-hidden bg-black"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sync/[0.06] blur-[120px]" aria-hidden />

      <div className="shell relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal as="p" className="eyebrow-green mb-6">
            The SYNC Rhythm
          </Reveal>
          <SplitReveal
            as="h2"
            text="YOUR FITNESS. YOUR TIME. YOUR SYNC."
            className="h-display text-display-md"
            accent={["SYNC."]}
          />
        </div>

        {/* 24 [clock] 7 */}
        <div className="mt-14 flex items-center justify-center gap-3 sm:mt-20 sm:gap-8" aria-label="24/7">
          <span ref={left} aria-hidden className="block font-display text-[34vw] leading-[0.85] text-snow sm:text-[22vw] lg:text-[17rem]">
            24
          </span>
          <div ref={clock} className="h-[18vw] w-[18vw] max-h-40 max-w-40 shrink-0 sm:max-h-56 sm:max-w-56 lg:max-h-64 lg:max-w-64">
            <Clock />
          </div>
          <span ref={right} aria-hidden className="block font-display text-[34vw] leading-[0.85] text-sync sm:text-[22vw] lg:text-[17rem]">
            7
          </span>
        </div>

        <Reveal className="mx-auto mt-12 max-w-md text-center">
          <p className="body-copy">24/7 is part of who we are — a studio identity built around your time.</p>
        </Reveal>
      </div>
    </section>
  );
}
