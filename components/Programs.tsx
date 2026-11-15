import { ArrowUpRight } from "lucide-react";
import Photo from "./Photo";
import { Reveal, SplitReveal } from "./Reveal";
import { images, type Slot } from "@/lib/images";

type Program = { title: string; line: string; slot: Slot; span: string };

const programs: Program[] = [
  { title: "Weight Training", line: "Controlled reps. Progressive load.", slot: images.programs.weightTraining, span: "md:col-span-7" },
  { title: "Strength Training", line: "Build raw, functional power.", slot: images.programs.strengthTraining, span: "md:col-span-5" },
  { title: "Cardio Training", line: "Endurance that keeps going.", slot: images.programs.cardioTraining, span: "md:col-span-5" },
  { title: "Muscle Building", line: "Shape, size and definition.", slot: images.programs.muscleBuilding, span: "md:col-span-7" },
  { title: "Weight Loss", line: "Sustainable change, session by session.", slot: images.programs.weightLoss, span: "md:col-span-6" },
  { title: "General Fitness", line: "Move better. Feel stronger.", slot: images.programs.generalFitness, span: "md:col-span-6" },
];

export default function Programs() {
  return (
    <section id="programs" className="section-pad bg-deep">
      <div className="shell">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal as="p" className="eyebrow-green mb-6">
              Training Programs
            </Reveal>
            <SplitReveal text="CHOOSE YOUR DISCIPLINE." className="h-display text-display-lg" accent={["DISCIPLINE."]} />
          </div>
          <Reveal delay={0.1}>
            <p className="body-copy max-w-sm">Six focused ways to train. One shared goal: becoming the strongest version of yourself.</p>
          </Reveal>
        </div>
      </div>

      {/* Mobile: snap rail. Desktop: asymmetric editorial grid. */}
      <div className="shell">
        <ul className="no-scrollbar -mx-gutter flex snap-x snap-mandatory gap-4 overflow-x-auto px-gutter pb-4 md:mx-0 md:grid md:grid-cols-12 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {programs.map((p, i) => (
            <li
              key={p.title}
              className={`group relative w-[80vw] max-w-sm shrink-0 snap-center md:w-auto md:max-w-none ${p.span}`}
            >
              <article className="relative aspect-[4/5] overflow-hidden md:aspect-auto md:h-[30rem] lg:h-[34rem]">
                <Photo
                  slot={p.slot}
                  className="absolute inset-0 h-full w-full"
                  imgClassName="transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.06]"
                  showLabel={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-7">
                  <span className="text-[0.7rem] font-semibold tracking-[0.25em] text-snow/70">0{i + 1}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-snow transition-all duration-500 ease-luxe group-hover:rotate-45 group-hover:border-sync group-hover:bg-sync group-hover:text-black">
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <span className="mb-4 block h-px w-10 bg-sync transition-all duration-700 ease-luxe group-hover:w-24" />
                  <h3 className="font-display text-4xl uppercase leading-none text-snow sm:text-5xl">{p.title}</h3>
                  <p className="mt-3 text-sm text-mist/75 sm:text-base">{p.line}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
