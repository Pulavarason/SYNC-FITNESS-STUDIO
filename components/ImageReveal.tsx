"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { registerGsap } from "@/lib/motion";

/** Curtain-style image reveal with a gentle inner parallax. Visible by default if motion is off. */
export default function ImageReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrap.current || !inner.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: { trigger: wrap.current, start: "top 85%", once: true },
        }
      );
      gsap.fromTo(
        inner.current,
        { scale: 1.3, yPercent: -6 },
        {
          scale: 1.05,
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className={`overflow-hidden ${className}`}>
      <div ref={inner} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
