import { useEffect, useRef, useState } from "react";
import Section from "./Section";

const THUMB_MIN_WIDTH = 120;
const THUMB_GAP = 12; // matches gap-3 spacing

export default function Gallery({ venue }) {
  const images = venue.gallery || [];
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [thumbsPerPage, setThumbsPerPage] = useState(6);
  const [thumbPage, setThumbPage] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const thumbContainerRef = useRef(null);

  const totalPages = Math.max(1, Math.ceil(images.length / thumbsPerPage));
  const start = thumbPage * thumbsPerPage;
  const visibleThumbs = images.slice(start, start + thumbsPerPage);

  const goNextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % images.length);
  };

  const goPrevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (images.length <= 1) return undefined;
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % images.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const handleKey = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev + 1) % images.length);
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, images.length]);

  useEffect(() => {
    if (!thumbContainerRef.current || typeof ResizeObserver === "undefined") return;

    const updateThumbsPerPage = () => {
      const width = thumbContainerRef.current.clientWidth || 0;
      if (!width) return;
      const next = Math.max(1, Math.floor((width + THUMB_GAP) / (THUMB_MIN_WIDTH + THUMB_GAP)));
      setThumbsPerPage((prev) => (prev !== next ? next : prev));
    };

    const observer = new ResizeObserver(updateThumbsPerPage);
    observer.observe(thumbContainerRef.current);
    updateThumbsPerPage();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!thumbsPerPage) return;
    const nextPage = Math.floor(featuredIndex / thumbsPerPage);
    setThumbPage((prev) => (prev !== nextPage ? nextPage : prev));
  }, [featuredIndex, thumbsPerPage]);

  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(images.length / thumbsPerPage) - 1);
    setThumbPage((prev) => Math.min(prev, maxPage));
  }, [images.length, thumbsPerPage]);

  if (!images.length) return null;

  return (
    <Section id="gallery" kicker="Photo Gallery" title="Embrace the possibilities." className="bg-white">
      <div className="space-y-4 rounded-3xl border border-neutral-200/80 bg-neutral-50 p-4 shadow-sm ring-1 ring-neutral-100 sm:p-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white">
          <img
            src={images[featuredIndex]}
            alt={`Featured Whispering Oaks Venue photo ${featuredIndex + 1}`}
            className="aspect-video w-full cursor-zoom-in object-cover transition duration-500"
            loading="lazy"
            decoding="async"
            onClick={() => setLightboxIndex(featuredIndex)}
          />

          <button
            type="button"
            onClick={goPrevFeatured}
            className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-neutral-800 shadow-md transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
            aria-label="Previous photo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M5 12l6 6" />
              <path d="M5 12l6 -6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNextFeatured}
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-neutral-800 shadow-md transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
            aria-label="Next photo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M19 12l-14 0" />
              <path d="M19 12l-6 6" />
              <path d="M19 12l-6 -6" />
            </svg>
          </button>
        </div>

        <div className="hidden items-center justify-between gap-3 sm:flex">
          <p className="text-sm text-neutral-600">Tap a thumbnail to preview the featured image.</p>
          <span className="text-xs font-semibold text-neutral-500">
            {featuredIndex + 1} / {images.length}
          </span>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <button
            type="button"
            onClick={() => setThumbPage((prev) => Math.max(0, prev - 1))}
            disabled={thumbPage === 0}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-sm font-semibold text-neutral-900 shadow-sm transition hover:border-neutral-300 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            aria-label="Previous thumbnails"
          >
            ←
          </button>

          <div className="flex-1 overflow-hidden">
            <div
              ref={thumbContainerRef}
              className="grid gap-3"
              style={{ gridTemplateColumns: `repeat(${thumbsPerPage}, minmax(0, 1fr))` }}
            >
              {visibleThumbs.map((src, idx) => {
                const absoluteIndex = start + idx;
                const isActive = absoluteIndex === featuredIndex;
                return (
                  <button
                    type="button"
                    key={`${absoluteIndex}-${src}`}
                    onClick={() => {
                      setFeaturedIndex(absoluteIndex);
                      setLightboxIndex(absoluteIndex);
                    }}
                    className={`group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm ring-1 ring-neutral-100 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 ${
                      isActive ? "ring-2 ring-neutral-900" : ""
                    }`}
                    aria-label={`Show photo ${absoluteIndex + 1}`}
                    aria-current={isActive}
                  >
                    <img
                      src={src}
                      alt={`Whispering Oaks Venue photo ${absoluteIndex + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setThumbPage((prev) => Math.min(totalPages - 1, prev + 1))}
            disabled={thumbPage >= totalPages - 1}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-sm font-semibold text-neutral-900 shadow-sm transition hover:border-neutral-300 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            aria-label="Next thumbnails"
          >
            →
          </button>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded gallery image"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-neutral-950/70 shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex]}
              alt={`Whispering Oaks Venue photo ${lightboxIndex + 1}`}
              className="max-h-[82vh] w-full object-contain"
            />

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-neutral-900 shadow-lg transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Close"
            >
              ×
            </button>
            <button
              type="button"
              onClick={() => setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-neutral-900 shadow-lg transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Previous photo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setLightboxIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-neutral-900 shadow-lg transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Next photo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19 12l-14 0" />
                <path d="M19 12l-6 6" />
                <path d="M19 12l-6 -6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}
