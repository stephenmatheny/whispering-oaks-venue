import Container from "./Container";

export default function Section({ id, kicker, title, children, className = "" }) {
  return (
    <section id={id} className={`relative scroll-mt-24 py-16 md:py-24 ${className}`}>
      <Container>
        <div className="max-w-2xl space-y-3">
          {kicker && <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">{kicker}</p>}
          {title && <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{title}</h2>}
        </div>
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}
