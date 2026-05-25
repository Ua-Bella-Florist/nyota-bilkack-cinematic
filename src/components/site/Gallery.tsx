import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FALLBACK_GALLERY_IMAGES, GalleryItem } from "@/lib/fallback-images";
import { ChapterHeader } from "./ChapterHeader";
import { Reveal } from "./Reveal";

type Tag = "All" | "Getting Ready" | "Ceremony" | "Reception" | "Party" | "Families";
type Layout = "Masonry" | "Grid" | "Strip";

const PAGE_SIZE = 12;
const tags: Tag[] = ["All", "Getting Ready", "Ceremony", "Reception", "Party", "Families"];
const layouts: Layout[] = ["Masonry", "Grid", "Strip"];

interface ImageKitFile {
  fileId: string;
  name: string;
  filePath: string;
  url: string;
  thumbnailUrl: string;
  height: number;
  width: number;
  size: number;
  tags?: string[];
}

function GallerySkeleton({ layout }: Readonly<{ layout: Layout }>) {
  const skeletons = Array.from({ length: 8 });
  let containerClass = "columns-2 md:columns-3 lg:columns-4 gap-4";
  if (layout === "Grid") {
    containerClass = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";
  } else if (layout === "Strip") {
    containerClass = "flex gap-4 overflow-x-auto pb-4";
  }

  return (
    <div className={containerClass}>
      {skeletons.map((_, i) => {
        let itemClass = "w-full bg-charcoal/5 rounded animate-pulse";
        let skeletonSuffix: string = layout;
        if (layout === "Masonry") {
          const heights = ["h-[250px]", "h-[380px]", "h-[300px]", "h-[450px]"];
          const h = heights[i % 4];
          itemClass += ` mb-4 ${h}`;
          skeletonSuffix = `${layout}-${h}`;
        } else if (layout === "Grid") {
          itemClass += " aspect-square";
        } else {
          itemClass += " shrink-0 h-[60vh] w-[40vh]";
        }

        return <div key={`skeleton-${skeletonSuffix}-${i}`} className={itemClass} />;
      })}
    </div>
  );
}

export function Gallery() {
  const [active, setActive] = useState<Tag>("All");
  const [layout, setLayout] = useState<Layout>("Masonry");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Securely query files from our server endpoint
  const { data, isLoading } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await fetch("/api/images");
      if (!res.ok) throw new Error("Failed to fetch images");
      return res.json() as Promise<{ files: ImageKitFile[]; error?: string }>;
    },
  });

  // Dynamically map and categorize the images
  const items = useMemo(() => {
    if (!data?.files || data.files.length === 0) {
      return FALLBACK_GALLERY_IMAGES;
    }

    const mapped = data.files
      .map((file) => {
        const pathLower = file.filePath.toLowerCase();
        const tagsLower = new Set((file.tags ?? []).map((t) => t.toLowerCase()));

        let tag: Tag | null = null;

        // 1. Folders within 'nyota-bilkack' or fallback tags
        if (
          pathLower.includes("/getting ready") ||
          pathLower.includes("/getting-ready") ||
          pathLower.includes("/morning") ||
          tagsLower.has("getting ready") ||
          tagsLower.has("getting-ready") ||
          tagsLower.has("gettingready")
        ) {
          tag = "Getting Ready";
        } else if (pathLower.includes("/ceremony") || tagsLower.has("ceremony")) {
          tag = "Ceremony";
        } else if (
          pathLower.includes("/reception") ||
          pathLower.includes("/gifts") ||
          tagsLower.has("reception")
        ) {
          tag = "Reception";
        } else if (
          pathLower.includes("/party") ||
          pathLower.includes("/dance") ||
          tagsLower.has("party")
        ) {
          tag = "Party";
        } else if (
          pathLower.includes("/families") ||
          pathLower.includes("/family") ||
          tagsLower.has("families") ||
          tagsLower.has("family")
        ) {
          tag = "Families";
        }

        if (!tag) return null;

        // Calculate aspect ratios based on real image dimensions
        let aspect = "aspect-[4/3]";
        if (file.width && file.height) {
          const ratio = file.width / file.height;
          if (ratio < 0.8) {
            aspect = "aspect-[3/4]";
          } else if (ratio <= 1.2) {
            aspect = "aspect-square";
          }
          // ratio > 1.2 keeps the default "aspect-[4/3]"
        }

        // Beautiful clean alt text from filename
        const cleanName = file.name
          .replace(/[-_]/g, " ")
          .replace(/\.[^/.]+$/, "")
          .replace(/^\d+\s*/, "");

        return {
          src: file.url,
          thumbnail: file.thumbnailUrl,
          tag,
          alt: cleanName,
          aspect,
        };
      })
      .filter(Boolean) as GalleryItem[];

    return mapped.length > 0 ? mapped : FALLBACK_GALLERY_IMAGES;
  }, [data]);

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.tag === active)),
    [active, items],
  );

  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);

  // Reset pagination when filter/layout changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    scrollRef.current?.scrollTo({ top: 0 });
  }, [active, layout]);

  // Infinite scroll: observe sentinel inside the scroll container
  useEffect(() => {
    const root = scrollRef.current;
    const target = sentinelRef.current;
    if (!root || !target) return;
    if (visibleCount >= filtered.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length));
        }
      },
      { root, rootMargin: "400px 0px" },
    );
    io.observe(target);
    return () => io.disconnect();
  }, [visibleCount, filtered.length]);

  let containerClass = "flex gap-4 snap-x snap-mandatory overflow-x-auto pb-4";
  if (layout === "Masonry") {
    containerClass = "columns-2 md:columns-3 lg:columns-4 gap-4";
  } else if (layout === "Grid") {
    containerClass = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";
  }

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
          ref={scrollRef}
          className="mt-10 max-h-[78vh] overflow-y-auto pr-2 gallery-scroll"
          style={{ scrollbarGutter: "stable" }}
        >
          {isLoading ? (
            <GallerySkeleton layout={layout} />
          ) : (
            <div className={containerClass}>
              {visible.map((it, i) => {
                let itemClass = "";
                if (layout === "Masonry") {
                  itemClass = `mb-4 break-inside-avoid ${it.aspect}`;
                } else if (layout === "Grid") {
                  itemClass = "aspect-square";
                } else {
                  let widthClass = "w-[80vh]";
                  if (it.aspect.includes("3/4")) widthClass = "w-[40vh]";
                  else if (it.aspect.includes("square")) widthClass = "w-[60vh]";
                  itemClass = `snap-start shrink-0 h-[60vh] ${widthClass}`;
                }

                return (
                  <Reveal
                    key={`${active}-${layout}-${i}`}
                    delay={Math.min((i % PAGE_SIZE) * 30, 400)}
                    className={itemClass}
                  >
                    <button
                      onClick={() => setLightbox(it.src)}
                      aria-label={`Open photo: ${it.alt}`}
                      className="group relative block h-full w-full overflow-hidden"
                    >
                      <img
                        src={it.thumbnail ?? it.src}
                        alt={it.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-burgundy-deep/0 group-hover:bg-burgundy-deep/30 transition-colors duration-500" />
                    </button>
                  </Reveal>
                );
              })}
            </div>
          )}

          {visibleCount < filtered.length && (
            <div
              ref={sentinelRef}
              className="flex items-center justify-center py-10 text-[10px] tracking-[0.3em] uppercase text-charcoal/40"
            >
              Loading more memories…
            </div>
          )}
          {visibleCount >= filtered.length && filtered.length > PAGE_SIZE && (
            <div className="py-10 text-center text-[10px] tracking-[0.3em] uppercase text-charcoal/30">
              End of archive · {filtered.length} frames
            </div>
          )}
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-6">
          <button
            type="button"
            className="absolute inset-0 h-full w-full cursor-default bg-burgundy-deep/95 backdrop-blur-md"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox backdrop"
          />
          <img
            src={lightbox}
            alt=""
            className="relative z-10 max-h-[90vh] max-w-[95vw] object-contain shadow-dark"
          />
          <button
            aria-label="Close photo viewer"
            className="absolute top-6 right-6 z-20 text-ivory/70 hover:text-gold text-[11px] tracking-[0.3em] uppercase"
            onClick={() => setLightbox(null)}
          >
            Close
          </button>
        </div>
      )}
    </section>
  );
}
