import { Clock3 } from "lucide-react";

type LogoProps = {
  /** "mark" = compact navbar lockup, "full" = complete brand lockup incl. 24/7 pill */
  variant?: "mark" | "full";
  className?: string;
};

/**
 * Live-text recreation of the official SYNC lockup, adapted for dark surfaces.
 * Proportions follow the supplied artwork: wide-set SYNC with a green N,
 * MIND • BODY • POWER above, FITNESS STUDIO and the green VALASARAVAKKAM rule below,
 * and the split green/black 24/7 pill.
 * The untouched original artwork is kept at /public/brand/sync-logo-original.png.
 */
export default function Logo({ variant = "mark", className = "" }: LogoProps) {
  if (variant === "mark") {
    return (
      <span className={`inline-flex flex-col items-start leading-none ${className}`} aria-label="SYNC Fitness Studio">
        <span className="font-sans text-[0.5rem] font-bold uppercase tracking-[0.32em] text-snow/80">
          Mind <span className="text-sync">•</span> Body <span className="text-sync">•</span> Power
        </span>
        <span className="mt-1 font-sans text-[2rem] font-black uppercase leading-[0.85] tracking-tight text-snow">
          SY<span className="text-sync">N</span>C
        </span>
        <span className="mt-1 font-sans text-[0.5rem] font-semibold uppercase tracking-[0.42em] text-snow/80">
          Fitness Studio
        </span>
      </span>
    );
  }

  return (
    <div className={`flex flex-col items-center text-center ${className}`} aria-label="SYNC Fitness Studio, Valasaravakkam, 24/7">
      <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-snow sm:text-sm">
        Mind <span className="text-sync">•</span> Body <span className="text-sync">•</span> Power
      </span>
      <span className="mt-2 font-sans text-[5.5rem] font-black uppercase leading-[0.82] tracking-tighter text-snow sm:text-[8rem]">
        SY<span className="text-sync">N</span>C
      </span>
      <span className="mt-3 font-sans text-sm font-semibold uppercase tracking-[0.5em] text-snow sm:text-lg">
        Fitness Studio
      </span>
      <span className="mt-3 flex items-center gap-4">
        <span className="h-px w-8 bg-sync sm:w-14" />
        <span className="font-sans text-sm font-extrabold uppercase tracking-[0.12em] text-sync sm:text-lg">
          {"Valasaravakkam"}
        </span>
        <span className="h-px w-8 bg-sync sm:w-14" />
      </span>
      <span className="mt-4 inline-flex h-12 w-40 overflow-hidden rounded-full border border-white/10 text-2xl font-extrabold italic">
        <span className="flex flex-1 items-center justify-center bg-sync pr-3 text-snow">24</span>
        <span className="relative z-10 -mx-4 flex h-12 w-12 shrink-0 items-center justify-center self-center rounded-full border-2 border-snow bg-black text-snow">
          <Clock3 className="h-6 w-6" strokeWidth={2.2} aria-hidden />
        </span>
        <span className="flex flex-1 items-center justify-center bg-black pl-3 text-sync">7</span>
      </span>
    </div>
  );
}
