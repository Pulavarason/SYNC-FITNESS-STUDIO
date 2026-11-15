/**
 * SYNC FITNESS STUDIO — editable site configuration
 * ------------------------------------------------------------------
 * Everything the business still needs to confirm lives here.
 * Leave a value as an empty string ("") and the site will gracefully
 * hide or soften that detail. Fill it in and the matching links
 * (call, WhatsApp, directions, social) switch on automatically.
 */

export const site = {
  name: "SYNC FITNESS STUDIO",
  shortName: "SYNC",
  tagline: "MIND • BODY • POWER",
  locality: "Valasaravakkam",
  address: "Valasaravakkam, Chennai, Tamil Nadu, India",

  /** Public site URL (used for metadata). Update after deploying. */
  url: "https://sync-fitness-studio.vercel.app",

  contact: {
    /** Digits with country code, spaces allowed. Example format: "+91 00000 00000" */
    phone: "",
    /** WhatsApp number with country code. Example format: "+91 00000 00000" */
    whatsapp: "",
    /** Pre-filled WhatsApp message for enquiries. */
    whatsappMessage: "Hello SYNC Fitness Studio, I'd like to know more about membership.",
    email: "",
    /** Free-text business hours as the studio wants them displayed. */
    hours: "",
    /** Full Google Maps share URL for the studio. Leave empty to fall back to a name-based search. */
    mapsUrl: "",
  },

  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
} as const;

/** Membership plans. Add real prices in `price` (e.g. "₹0,000") — empty shows an enquiry prompt. */
export const membershipPlans = [
  { id: "monthly", name: "Monthly", term: "1 Month", price: "", note: "A flexible way to start." },
  { id: "quarterly", name: "Quarterly", term: "3 Months", price: "", note: "Build momentum over a season." },
  { id: "half-yearly", name: "Half-Yearly", term: "6 Months", price: "", note: "Commit to lasting change." },
  { id: "annual", name: "Annual", term: "12 Months", price: "", note: "A full year of consistency." },
] as const;

/* ---------- Helpers: derive working links from the config ---------- */

const digits = (v: string) => v.replace(/[^\d]/g, "");

export const links = {
  tel: site.contact.phone ? `tel:+${digits(site.contact.phone)}` : "",
  whatsapp: site.contact.whatsapp
    ? `https://wa.me/${digits(site.contact.whatsapp)}?text=${encodeURIComponent(site.contact.whatsappMessage)}`
    : "",
  email: site.contact.email ? `mailto:${site.contact.email}` : "",
  directions: site.contact.mapsUrl
    ? site.contact.mapsUrl
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${site.name} ${site.address}`
      )}`,
};

/** Best available enquiry destination: WhatsApp → phone → contact section. */
export const enquiryHref = links.whatsapp || links.tel || "#contact";
export const enquiryExternal = Boolean(links.whatsapp);

/** Enquiry link for one membership plan (pre-fills the plan name on WhatsApp). */
export function planEnquiryHref(planName: string) {
  if (site.contact.whatsapp) {
    const msg = `Hello SYNC Fitness Studio, I'd like to enquire about the ${planName} membership.`;
    return `https://wa.me/${digits(site.contact.whatsapp)}?text=${encodeURIComponent(msg)}`;
  }
  return links.tel || "#contact";
}
