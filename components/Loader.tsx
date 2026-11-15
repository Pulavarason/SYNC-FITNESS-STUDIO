"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { setReady } from "@/lib/ready";

const KEY = "sync-intro-seen";

/** Brand loader: wordmark + counter, then a curtain lift. Shown once per session; skipped for reduced motion. */
export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}

    if (reduce || seen) {
      setVisible(false);
      setReady();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    const total = 1900;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setCount(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setVisible(false);
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = "";
        setReady();
      }}
    >
      {visible && (
        <motion.div
          key="loader"
          role="status"
          aria-label="Loading SYNC Fitness Studio"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center">
            <span className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.4em] text-snow/60">
              Mind <span className="text-sync">•</span> Body <span className="text-sync">•</span> Power
            </span>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="block font-sans text-[22vw] font-black uppercase leading-[0.85] tracking-tighter text-snow sm:text-[9rem]"
              >
                SY<span className="text-sync">N</span>C
              </motion.span>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-gutter pb-8">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-mist/50">Fitness Studio</span>
            <span className="font-display text-5xl tabular-nums text-snow">{String(count).padStart(2, "0")}</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/10">
            <div className="h-full origin-left bg-sync" style={{ width: `${count}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
