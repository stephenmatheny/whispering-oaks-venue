import { useState } from "react";
import Section from "./Section";

export default function Contact({ venue }) {
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    venue.addressLines.join(", "),
  )}`;
  const contactEmail = venue.contact.email;
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactEmail) return;

    const subject = `${name || "Whispering Oaks Guest"} - Whispering Oaks Venue`;
    const body = `${message || ""}\n\nSent from whisperingoaksvenue.com`;
    const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  };

  return (
    <Section id="contact" kicker="Contact Us" title={venue.contact.heading} className="bg-neutral-50">
      <div className="grid gap-10 lg:grid-cols-[1.1fr,1fr]">
        <div className="space-y-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-neutral-200/80">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">Call or message</p>
              <a
                className="mt-2 block text-2xl font-semibold text-neutral-900 hover:text-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
                href={venue.phoneHref}
              >
                {venue.phoneDisplay}
              </a>
            </div>
            <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Tours daily
            </span>
          </div>
          <p className="text-sm text-neutral-700">
            Share your date, guest count, and what you&apos;re dreaming up. We respond quickly to help you plan.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block space-y-2 text-sm font-medium text-neutral-800">
              Name
              <input
                name="name"
                required
                placeholder="Your name"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="block space-y-2 text-sm font-medium text-neutral-800">
              Message
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Date, guest count, and what you're dreaming up…"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              Send message
            </button>
          </form>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-neutral-200/80">
          <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Visit us</p>
              <p className="text-sm font-medium text-neutral-900">{venue.addressLines[0]}</p>
              <p className="text-sm text-neutral-700">{venue.addressLines[1]}</p>
            </div>
            <a
              href={mapLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-3 py-2 text-xs font-semibold text-neutral-900 transition hover:border-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              Get directions
              <span aria-hidden>↗</span>
            </a>
          </div>
          <iframe title="Map" src={venue.contact.mapEmbed} className="h-[420px] w-full" loading="lazy" />
        </div>
      </div>
    </Section>
  );
}
