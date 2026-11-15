import { ArrowUpRight } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { Reveal, SplitReveal } from "./Reveal";
import { membershipPlans, planEnquiryHref, site } from "@/lib/site";

export default function Membership() {
  const anyUnpriced = membershipPlans.some((p) => !p.price);
  const external = Boolean(site.contact.whatsapp);

  return (
    <section id="membership" className="section-pad bg-deep">
      <div className="shell">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Reveal as="p" className="eyebrow-green mb-6">
            Membership
          </Reveal>
          <SplitReveal text="COMMIT TO YOUR SYNC." className="h-display text-display-lg" accent={["SYNC."]} />
          <Reveal delay={0.1}>
            <p className="body-copy mx-auto mt-6 max-w-lg">
              Four ways to join. Pick the rhythm that fits your goals and start moving.
            </p>
          </Reveal>
        </div>

        <ul className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {membershipPlans.map((plan, i) => (
            <Reveal as="li" key={plan.id} delay={i * 0.08} y={30} className="bg-deep">
              <div className="group flex h-full min-h-[26rem] flex-col justify-between p-7 transition-colors duration-700 ease-luxe hover:bg-snow sm:p-9">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-sync transition-colors duration-700 group-hover:text-black/60">
                      {plan.term}
                    </span>
                    <span className="text-[0.7rem] font-semibold tracking-[0.25em] text-mist/40 transition-colors duration-700 group-hover:text-black/40">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-10 font-display text-5xl uppercase leading-none text-snow transition-colors duration-700 group-hover:text-black">
                    {plan.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-mist/60 transition-colors duration-700 group-hover:text-black/60">
                    {plan.note}
                  </p>
                </div>

                <div>
                  <div className="mb-6 border-t border-white/10 pt-6 transition-colors duration-700 group-hover:border-black/15">
                    {plan.price ? (
                      <p className="font-display text-4xl text-snow transition-colors duration-700 group-hover:text-black">{plan.price}</p>
                    ) : (
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mist/70 transition-colors duration-700 group-hover:text-black/70">
                        Enquire for pricing
                      </p>
                    )}
                  </div>
                  <MagneticButton
                    href={planEnquiryHref(plan.name)}
                    external={external}
                    variant="ghost"
                    className="w-full group-hover:!border-black group-hover:!bg-black group-hover:!text-snow"
                    strength={0.1}
                    aria-label={`Enquire about the ${plan.name} membership`}
                  >
                    Enquire <ArrowUpRight className="h-4 w-4" />
                  </MagneticButton>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        {anyUnpriced && (
          <Reveal as="p" className="mx-auto mt-8 max-w-md text-center text-xs uppercase tracking-[0.2em] text-mist/40">
            Pricing is shared directly by the studio on enquiry.
          </Reveal>
        )}
      </div>
    </section>
  );
}
