/** Light editorial band — one of the few white/light-grey surfaces (the 15%). */
export default function Marquee() {
  const items = ["Mind", "Body", "Power", "SYNC", "Valasaravakkam", "24/7"];
  const row = (
    <ul className="flex shrink-0 items-center" aria-hidden>
      {[...items, ...items].map((t, i) => (
        <li key={i} className="flex items-center">
          <span className="px-6 font-display text-3xl uppercase tracking-wide text-black sm:text-5xl">{t}</span>
          <span className="h-2 w-2 rounded-full bg-sync" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden bg-snow py-4 sm:py-5" role="presentation">
      <div className="marquee-track flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}
