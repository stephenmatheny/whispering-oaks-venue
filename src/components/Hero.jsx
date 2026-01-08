import Container from "./Container";

export default function Hero({ venue }) {
  const h = venue.hero;
  const heroImage = venue.gallery[0];

  return (
    <section id="top" className="bg-gradient-to-b from-white via-white to-neutral-50">
      <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full bg-neutral-900/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">
            {h.kicker}
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
              {h.headline}
            </h1>
            <p className="text-lg leading-8 text-neutral-700">
              {h.subhead}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={h.ctaPrimary.href}
              className="inline-flex items-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              {h.ctaPrimary.label}
            </a>
            <a
              href={venue.phoneHref}
              className="inline-flex items-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              Call {venue.phoneDisplay}
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-neutral-700">
            <span className="rounded-full bg-white px-3 py-1 text-xs uppercase tracking-[0.2em] text-neutral-500 shadow-sm ring-1 ring-neutral-200/80">
              See more
            </span>
            <a
              href={h.ctaSecondary.href}
              className="inline-flex items-center gap-1 transition hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              {h.ctaSecondary.label}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 translate-y-6 rounded-[32px] bg-gradient-to-br from-neutral-200/40 to-neutral-200/0 blur-3xl" aria-hidden />
          <div className="aspect-[4/3] overflow-hidden rounded-[28px] border border-white/60 shadow-2xl shadow-neutral-900/10 ring-1 ring-neutral-200/80">
            <img
              src={heroImage}
              alt="Whispering Oaks Venue outdoor ceremony area"
              className="h-full w-full object-cover"
            />
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              venue.addressLines.join(", ")
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl p-2 transition hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            aria-label="Open location in maps"
          >
            <div className="absolute -left-4 -bottom-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg shadow-neutral-900/10 ring-1 ring-neutral-200/80">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold uppercase text-white">
                W
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Visit us</p>
                <p className="text-sm font-medium text-neutral-900">{venue.addressLines[0]}</p>
                <p className="text-xs text-neutral-600">{venue.addressLines[1]}</p>
              </div>
            </div>
          </a>
        </div>
      </Container>
    </section>
  );
}
