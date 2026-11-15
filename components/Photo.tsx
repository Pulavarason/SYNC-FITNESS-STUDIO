"use client";

import { useEffect, useRef, useState } from "react";
import type { Slot } from "@/lib/images";

type PhotoProps = {
  slot: Slot;
  className?: string;
  /** Tailwind classes for the <img> (e.g. hover zoom). */
  imgClassName?: string;
  priority?: boolean;
  showLabel?: boolean;
};

/**
 * Image slot with an art-directed fallback.
 * Drop a real photo into /public/images/<filename> and it appears automatically;
 * until then a refined dark placeholder keeps the composition intact.
 */
export default function Photo({ slot, className = "", imgClassName = "", priority = false, showLabel = true }: PhotoProps) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div className={`photo-frame ${className}`}>
      {/* Placeholder layer (always beneath) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 20% 10%, #232323 0%, #121212 45%, #050505 100%), linear-gradient(135deg, #1c1c1c, #080808)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 22px)",
          }}
        />
        <div className="absolute -right-1/4 bottom-0 h-2/3 w-2/3 rounded-full bg-sync/10 blur-3xl" />
        {showLabel && (
          <span className="absolute bottom-4 left-4 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-mist/30">
            {slot.label} · add photo
          </span>
        )}
      </div>

      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={slot.src}
          alt={slot.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}
