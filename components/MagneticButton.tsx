"use client";

import { useRef, type ReactNode, type AnchorHTMLAttributes } from "react";
import gsap from "gsap";
import { scrollToId } from "./SmoothScroll";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  external?: boolean;
  className?: string;
  strength?: number;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

/** Pill button that subtly follows the cursor (fine pointers only) and smooth-scrolls to anchors. */
export default function MagneticButton({
  href,
  children,
  variant = "primary",
  external,
  className = "",
  strength = 0.28,
  onClick,
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const cls = variant === "primary" ? "btn-primary" : variant === "light" ? "btn-light" : "btn-ghost";

  const canMove = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const move = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!canMove() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    gsap.to(ref.current, { x, y, duration: 0.5, ease: "power3.out" });
  };
  const leave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
  };

  const isHash = href.startsWith("#");

  return (
    <a
      ref={ref}
      href={href}
      className={`${cls} ${className}`}
      onMouseMove={move}
      onMouseLeave={leave}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(e) => {
        onClick?.(e);
        if (isHash && !e.defaultPrevented) {
          e.preventDefault();
          scrollToId(href);
          history.replaceState(null, "", href);
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
