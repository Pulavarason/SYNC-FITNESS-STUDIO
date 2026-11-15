import { Dumbbell, HeartPulse, Scale, Target, Users, Zap } from "lucide-react";
import { Reveal, SplitReveal } from "./Reveal";

const features = [
  { icon: Target, title: "Fitness for Every Goal", copy: "Whatever you are training for, SYNC meets you at your goal and builds from there." },
  { icon: Dumbbell, title: "Strength Training", copy: "Build real, lasting strength with disciplined, progressive work." },
  { icon: HeartPulse, title: "Cardio & Endurance", copy: "Raise your capacity and keep going when it gets hard." },
  { icon: Scale, title: "Weight Management", copy: "Sustainable habits and training that move you toward a healthier weight." },
  { icon: Zap, title: "Muscle Development", copy: "Shape, size and definition through focused muscle-building." },
  { icon: Users, title: "Fitness Community", copy: "Train alongside people who share your drive and push you further." },
];

export default function WhySync() {
  return (
    <section id="why" className="section-pad relative bg-black">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Sticky intro */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal as="p" className="eyebrow-green mb-6">
              Why SYNC
            </Reveal>
            <SplitReveal text="TRAIN WITH PURPOSE." className="h-display text-display-md" accent={["PURPOSE."]} />
            <Reveal delay={0.1}>
              <p className="body-copy mt-6 max-w-md">
                Everything at SYNC is designed around one idea: bringing mind, body and effort into alignment.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Editorial list (deliberately not a card grid) */}
        <ul className="lg:col-span-7">
          {features.map(({ icon: Icon, title, copy }, i) => (
            <Reveal as="li" key={title} delay={0.04 * i}>
              <div className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 border-t border-white/10 py-7 transition-colors duration-500 ease-luxe last:border-b hover:border-sync/60 sm:gap-8 sm:py-9">
                <span className="w-8 text-xs font-semibold tracking-[0.2em] text-mist/40 transition-colors duration-500 group-hover:text-sync sm:w-12">
                  0{i + 1}
                </span>
                <div className="transition-transform duration-500 ease-luxe group-hover:translate-x-2">
                  <h3 className="font-display text-[1.65rem] uppercase leading-tight text-snow sm:text-4xl">{title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-mist/60 sm:text-base">{copy}</p>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-mist/70 transition-all duration-500 ease-luxe group-hover:border-sync group-hover:bg-sync group-hover:text-black sm:h-14 sm:w-14">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
