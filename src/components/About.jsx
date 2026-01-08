import Section from "./Section";

export default function About({ venue }) {
  return (
    <Section
      id="about"
      kicker="About Us"
      title={venue.about.title}
      className="bg-neutral-50"
    >
      <div className="grid items-start gap-10 lg:grid-cols-[1.6fr,1fr]">
        <p className="text-lg leading-8 text-neutral-700">
          {venue.about.body}
        </p>

        <div className="self-start rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
          <p className="text-sm font-semibold text-neutral-900">
            What makes us special
          </p>

          <ul className="mt-4 space-y-3 text-sm text-neutral-700">
            {venue.about.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span
                  className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500"
                  aria-hidden
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
