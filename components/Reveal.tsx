"use client";

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { registerGsap } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
};

/** Fade + rise on scroll. Content stays fully visible if JS or motion is unavailable. */
export function Reveal({ children, as: Tag = "div", className = "", delay = 0, y = 40 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y,
        opacity: 0,
        duration: 1.1,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    });
    return () => ctx.revert();
  }, [delay, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

type SplitProps = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Trigger immediately (e.g. in the hero after the loader) instead of on scroll. */
  immediate?: boolean;
  /** Words to colour with the brand green. */
  accent?: string[];
  /** Keep words hidden until this becomes false (e.g. while the intro loader is showing). */
  hold?: boolean;
};

/** Word-by-word masked text reveal. Words are real DOM text for SEO and screen readers. */
export function SplitReveal({ text, as: Tag = "h2", className = "", delay = 0, immediate = false, accent = [], hold = false }: SplitProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useLayoutEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      const inner = ref.current!.querySelectorAll("[data-word]");
      if (hold) {
        gsap.set(inner, { yPercent: 110 });
        return;
      }
      gsap.fromTo(
        inner,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          delay,
          stagger: 0.06,
          ease: "power4.out",
          ...(immediate ? {} : { scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } }),
        }
      );
    });
    return () => ctx.revert();
  }, [delay, immediate, hold]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => {
        const clean = w.replace(/[^A-Za-z0-9/]/g, "");
        const isAccent = accent.includes(clean);
        return (
          <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.08em]">
            <span data-word className={`inline-block ${isAccent ? "text-sync" : ""}`}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
