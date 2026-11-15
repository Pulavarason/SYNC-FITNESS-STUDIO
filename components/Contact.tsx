import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { Reveal, SplitReveal } from "./Reveal";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./SocialIcons";
import { links, site } from "@/lib/site";

function Row({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const body = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-sync transition-colors duration-500 group-hover:border-sync">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-mist/45">{label}</span>
        <span className={`mt-1 block truncate text-base ${value ? "text-snow" : "text-mist/35"}`}>
          {value || "To be announced"}
        </span>
      </span>
    </>
  );
  const cls = "group flex items-center gap-4 border-b border-white/10 py-5";
  return value && href ? (
    <a href={href} className={`${cls} transition-colors hover:border-sync/60`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export default function Contact() {
  const { contact, social } = site;
  const socials = [
    { href: social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: social.youtube, label: "YouTube", Icon: YoutubeIcon },
  ].filter((s) => s.href);

  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-black">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <Reveal as="p" className="eyebrow-green mb-6">
            Contact
          </Reveal>
          <SplitReveal text="LET'S SYNC." className="h-display text-display-lg" accent={["SYNC."]} />
          <Reveal delay={0.1}>
            <p className="body-copy mt-6 max-w-md">
              Ready to begin? Reach out, ask about membership, or come and see the studio for yourself.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <MagneticButton href={links.directions} external>
              Get directions <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            {links.whatsapp && (
              <MagneticButton href={links.whatsapp} external variant="ghost">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </MagneticButton>
            )}
            {links.tel && (
              <MagneticButton href={links.tel} variant="ghost">
                <Phone className="h-4 w-4" /> Call now
              </MagneticButton>
            )}
          </Reveal>

          {socials.length > 0 && (
            <Reveal delay={0.2} className="mt-10 flex items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`SYNC Fitness Studio on ${label}`}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-snow transition-colors duration-500 hover:border-sync hover:bg-sync hover:text-black"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </Reveal>
          )}
        </div>

        <div className="lg:col-span-6">
          <Reveal>
            <div className="border-t border-white/10">
              <div className="group flex items-center gap-4 border-b border-white/10 py-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-sync">
                  <MapPin className="h-4 w-4" aria-hidden />
                </span>
                <span>
                  <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-mist/45">Studio</span>
                  <span className="mt-1 block text-base text-snow">{site.name}</span>
                  <span className="block text-sm text-mist/60">{site.address}</span>
                </span>
              </div>
              <Row icon={Phone} label="Phone" value={contact.phone} href={links.tel} />
              <Row icon={MessageCircle} label="WhatsApp" value={contact.whatsapp} href={links.whatsapp} external />
              {contact.email && <Row icon={Mail} label="Email" value={contact.email} href={links.email} />}
              <Row icon={Clock} label="Business hours" value={contact.hours} />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <a
              href={links.directions}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open SYNC Fitness Studio location in Google Maps"
              className="group relative block aspect-[16/9] overflow-hidden border border-white/10 bg-charcoal"
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(101,204,0,0.10),transparent)]" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sync text-black transition-transform duration-500 ease-luxe group-hover:-translate-y-1">
                  <MapPin className="h-6 w-6" aria-hidden />
                </span>
                <span className="mt-4 block text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-snow">{site.locality}</span>
                <span className="mt-1 block text-xs text-mist/50">Chennai · Tamil Nadu</span>
              </div>
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-mist/60 transition-colors group-hover:text-sync">
                Open in Maps <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
