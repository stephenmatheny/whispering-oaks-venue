import Container from "./Container";

export default function Footer({ venue }) {
  return (
    <footer className="border-t border-neutral-200 bg-white py-10">
      <Container className="flex flex-col gap-2 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
        <p className="font-medium text-neutral-700">
          © {new Date().getFullYear()} {venue.name}. All rights reserved.
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Designed for your best day.</p>
      </Container>
    </footer>
  );
}
