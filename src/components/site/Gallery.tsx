import { useMemo, useState } from "react";
import gettingReady from "@/assets/getting-ready.jpg";
import ceremony from "@/assets/ceremony.jpg";
import reception from "@/assets/reception.jpg";
import party from "@/assets/party.jpg";
import bridal from "@/assets/bridal-party.jpg";
import families from "@/assets/families.jpg";
import gifts from "@/assets/gifts.jpg";
import story from "@/assets/story.jpg";
import { ChapterHeader } from "./ChapterHeader";
import { Reveal } from "./Reveal";

type Tag = "All" | "Getting Ready" | "Ceremony" | "Reception" | "Party" | "Families";
type Layout = "Masonry" | "Grid" | "Strip";

const baseItems: { src: string; tag: Exclude<Tag, "All">; alt: string; aspect: string }[] = [
  { src: gettingReady, tag: "Getting Ready", alt: "Bride's dress", aspect: "aspect-[3/4]" },
  { src: ceremony, tag: "Ceremony", alt: "Church ceremony", aspect: "aspect-[4/3]" },
  { src: story, tag: "Ceremony", alt: "Hands joined", aspect: "aspect-[3/4]" },
  { src: reception, tag: "Reception", alt: "Reception room", aspect: "aspect-[4/3]" },
  { src: gifts, tag: "Reception", alt: "Wedding gifts", aspect: "aspect-square" },
  { src: bridal, tag: "Reception", alt: "Bridal party", aspect: "aspect-[4/3]" },
  { src: party, tag: "Party", alt: "Guests dancing at the reception", aspect: "aspect-[3/4]" },
  { src: families, tag: "Families", alt: "Family portrait", aspect: "aspect-[4/3]" },
];

// Duplicate to simulate a denser archive so the internal scroll is meaningful
const items = [...baseItems, ...baseItems, ...baseItems];

const tags: Tag[] = ["All", "Getting Ready", "Ceremony", "Reception", "Party", "Families"];
const layouts: Layout[] = ["Masonry", "Grid", "Strip"];

export function Gallery() {
  const [active, setActive] = useState<Tag>("All");
  const [layout, setLayout] = useState<Layout>("Masonry");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.tag === active)),
    [active],
  );

  const containerClass =
    layout === "Masonry"
      ? "columns-2 md:columns-3 lg:columns-4 gap-4"
      : layout === "Grid"
        ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        : "flex gap-4 snap-x snap-mandatory overflow-x-auto pb-4";

  return (
    <section id="gallery" className="relative bg-ivory py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <ChapterHeader eyebrow="The Archive" title="Every frame, kept." />

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`rounded-full px-5 py-2 text-[11px] tracking-[0.22em] uppercase transition-all duration-300 ${
                active === t
                  ? "bg-burgundy text-ivory"
                  : "bg-transparent text-charcoal/60 hover:text-burgundy hover:bg-beige"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-charcoal/40 mr-2">
            Display
          </span>
          {layouts.map((l) => (
            <button
              key={l}
              onClick={() => setLayout(l)}
              className={`rounded-full border px-4 py-1.5 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 ${
                layout === l
                  ? "border-gold text-burgundy bg-beige"
                  : "border-charcoal/15 text-charcoal/50 hover:text-burgundy hover:border-gold/60"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <div
          className="mt-10 max-h-[78vh] overflow-y-auto pr-2 gallery-scroll"
          style={{ scrollbarGutter: "stable" }}
        >
          <div className={containerClass}>
            {filtered.map((it, i) => {
              const itemClass =
                layout === "Masonry"
                  ? `mb-4 break-inside-avoid ${it.aspect}`
                  : layout === "Grid"
                    ? "aspect-square"
                    : `snap-start shrink-0 h-[60vh] ${it.aspect.includes("3/4") ? "w-[40vh]" : it.aspect.includes("square") ? "w-[60vh]" : "w-[80vh]"}`;

              return (
                <Reveal
                  key={`${active}-${layout}-${i}`}
                  delay={Math.min(i * 30, 400)}
                  className={itemClass}
                >
                  <button
                    onClick={() => setLightbox(it.src)}
                    aria-label={`Open photo: ${it.alt}`}
                    className="group relative block h-full w-full overflow-hidden"
                  >
                    <img
                      src={it.src}
                      alt={it.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-burgundy-deep/0 group-hover:bg-burgundy-deep/30 transition-colors duration-500" />
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[400] flex items-center justify-center bg-burgundy-deep/95 backdrop-blur-md p-6"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt=""
            className="max-h-[90vh] max-w-[95vw] object-contain shadow-dark"
          />
          <button
            aria-label="Close photo viewer"
            className="absolute top-6 right-6 text-ivory/70 hover:text-gold text-[11px] tracking-[0.3em] uppercase"
            onClick={() => setLightbox(null)}
          >
            Close
          </button>
        </div>
      )}
    </section>
  );
}
