import Photo from "./Photo";
import ImageReveal from "./ImageReveal";
import { Reveal, SplitReveal } from "./Reveal";
import { images } from "@/lib/images";

const pillars = [
  { word: "Mind", value: "Discipline", copy: "Consistency starts between the ears. Show up, stay focused, earn every rep." },
  { word: "Body", value: "Strength", copy: "Train with intent. Build a body that is capable, resilient and yours." },
  { word: "Power", value: "Transformation", copy: "Where effort compounds into change that reaches far beyond the gym floor." },
];

export default function About() {
  return (
    <section id="about" className="section-pad relative bg-deep">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Image */}
        <div className="relative lg:col-span-5">
          <ImageReveal className="aspect-[4/5] w-full">
            <Photo slot={images.about} className="h-full w-full" />
          </ImageReveal>
          <span aria-hidden className="absolute -bottom-5 -right-2 hidden font-display text-[9rem] leading-none text-white/[0.04] sm:block">
            SYNC
          </span>
          <div className="absolute -left-3 top-8 hidden h-24 w-px bg-sync lg:block" aria-hidden />
        </div>

        {/* Story */}
        <div className="lg:col-span-7">
          <Reveal as="p" className="eyebrow-green mb-6">
            About SYNC
          </Reveal>
          <SplitReveal
            text="FIND YOUR RHYTHM. DISCOVER YOUR STRENGTH."
            className="h-display text-display-lg"
            accent={["STRENGTH."]}
          />
          <Reveal delay={0.1} className="mt-8 max-w-xl space-y-5">
            <p className="body-copy">
              SYNC Fitness Studio is built on a simple belief: when your mind, your body and your effort move together,
              everything changes. It is a place to train with focus and to grow stronger in a space made for
              people serious about progress.
            </p>
            <p className="body-copy">
              Whatever your starting point, SYNC is where you find your rhythm — and then push beyond it.
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-0 border-t border-white/10 sm:grid-cols-3 sm:border-t-0">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.word} delay={i * 0.1} className="border-b border-white/10 py-6 sm:border-b-0 sm:border-t sm:pr-6">
                <span className="text-[0.7rem] font-semibold tracking-[0.25em] text-sync">0{i + 1}</span>
                <h3 className="mt-3 font-display text-3xl uppercase leading-none text-snow">{p.word}</h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-mist">{p.value}</p>
                <p className="mt-3 text-sm leading-relaxed text-mist/60">{p.copy}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
