"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Photo from "./Photo";
import { Reveal, SplitReveal } from "./Reveal";
import { images } from "@/lib/images";

type LenisLike = { stop: () => void; start: () => void };
const getLenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

// Asymmetric layout: [mobile span] + [desktop span]
const layout = [
  "col-span-2 row-span-2 md:col-span-7 md:row-span-4",
  "col-span-1 row-span-2 md:col-span-5 md:row-span-2",
  "col-span-1 row-span-1 md:col-span-5 md:row-span-2",
  "col-span-1 row-span-2 md:col-span-4 md:row-span-4",
  "col-span-2 row-span-1 md:col-span-8 md:row-span-2",
  "col-span-1 row-span-1 md:col-span-4 md:row-span-2",
  "col-span-1 row-span-1 md:col-span-4 md:row-span-2",
];

export default function Gallery() {
  const items = images.gallery;
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = (i: number) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setIndex(i);
  };
  const close = useCallback(() => {
    setIndex(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (index === null) return;
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      getLenis()?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  return (
    <section id="gallery" className="section-pad bg-black">
      <div className="shell">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal as="p" className="eyebrow-green mb-6">
              Gallery
            </Reveal>
            <SplitReveal text="INSIDE THE STUDIO." className="h-display text-display-lg" accent={["STUDIO."]} />
          </div>
          <Reveal delay={0.1}>
            <p className="body-copy max-w-xs">Moments of focus, effort and progress. Tap any image to view it full screen.</p>
          </Reveal>
        </div>

        <ul className="grid auto-rows-[clamp(7rem,32vw,10rem)] grid-cols-2 gap-3 md:auto-rows-[clamp(4.5rem,8.2vw,8rem)] md:grid-cols-12 md:gap-4">
          {items.map((slot, i) => (
            <Reveal as="li" key={slot.src} delay={(i % 3) * 0.08} y={30} className={layout[i] ?? "col-span-1"}>
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`View image: ${slot.label}`}
                className="group relative block h-full w-full overflow-hidden text-left"
              >
                <Photo
                  slot={slot}
                  className="absolute inset-0 h-full w-full"
                  imgClassName="transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.07]"
                  showLabel={false}
                />
                <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 sm:p-4">
                  <span className="translate-y-2 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-snow opacity-90 transition-all duration-500 ease-luxe group-hover:translate-y-0 group-hover:opacity-100">
                    {slot.label}
                  </span>
                  <span className="flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-snow text-black opacity-0 transition-all duration-500 ease-luxe group-hover:scale-100 group-hover:opacity-100">
                    <Maximize2 className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-snow transition-colors hover:border-sync hover:text-sync sm:right-8 sm:top-8"
            >
              <X className="h-5 w-5" />
            </button>

            {[
              { d: -1, Icon: ChevronLeft, label: "Previous image", pos: "left-3 sm:left-8" },
              { d: 1, Icon: ChevronRight, label: "Next image", pos: "right-3 sm:right-8" },
            ].map(({ d, Icon, label, pos }) => (
              <button
                key={d}
                type="button"
                aria-label={label}
                onClick={(e) => {
                  e.stopPropagation();
                  step(d);
                }}
                className={`absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-snow transition-colors hover:border-sync hover:text-sync ${pos}`}
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}

            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                className="relative mx-16 h-[74vh] w-[min(92vw,70rem)] sm:mx-0"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <Photo slot={items[index]} className="h-full w-full" showLabel={false} />
                <figcaption className="absolute -bottom-9 left-0 flex w-full items-center justify-between text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-mist/70">
                  <span>{items[index].label}</span>
                  <span className="tabular-nums">
                    {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
