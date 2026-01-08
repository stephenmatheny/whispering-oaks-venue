import Container from "./Container";

export default function Header({ venue }) {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/80 backdrop-blur">
      <Container className="flex items-center justify-between gap-4 py-3">
        <a href="#top" className="flex items-center gap-3 text-base font-semibold tracking-tight text-neutral-900">
          <img
            src="/logo.webp"
            alt={`${venue.name} logo`}
            className="h-10 w-10 rounded-full border border-neutral-200 bg-white object-cover shadow-sm"
          />
          <span className="hidden sm:inline">{venue.name}</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-700 md:flex">
          {venue.nav.map((n) => (
            <a key={n.href} href={n.href} className="transition hover:text-neutral-950">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            className="inline-flex items-center rounded-full border border-neutral-300 px-3 py-2 text-xs font-semibold text-neutral-900 transition hover:border-neutral-400 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            href="#contact"
          >
            Schedule a tour
          </a>
          <a
            className="hidden rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:border-neutral-400 md:inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            href="#contact"
          >
            Schedule a tour
          </a>
          <a
            className="inline-flex items-center rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            href={venue.phoneHref}
          >
            Call {venue.phoneDisplay}
          </a>
        </div>
      </Container>
    </header>
  );
}
