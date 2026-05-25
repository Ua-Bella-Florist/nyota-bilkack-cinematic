import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { FALLBACK_CHAPTER_IMAGES } from "@/lib/fallback-images";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Story } from "@/components/site/Story";
import { Chapter } from "@/components/site/Chapter";
import { BridalParty } from "@/components/site/BridalParty";
import { Gallery } from "@/components/site/Gallery";
import { Film } from "@/components/site/Film";
import { Credits } from "@/components/site/Credits";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Wedding of Nyota & Bilkack — 16 May 2026" },
      {
        name: "description",
        content:
          "A cinematic memorial of Nyota and Bilkack's wedding day at Vosh — every love story is beautiful, but ours is my favourite.",
      },
      { property: "og:title", content: "The Wedding of Nyota & Bilkack — 16 May 2026" },
      {
        property: "og:description",
        content:
          "A cinematic memorial of Nyota and Bilkack's wedding day at Vosh — every love story is beautiful, but ours is my favourite.",
      },
      { name: "twitter:title", content: "The Wedding of Nyota & Bilkack — 16 May 2026" },
      {
        name: "twitter:description",
        content: "A cinematic memorial of Nyota and Bilkack's wedding day at Vosh.",
      },
    ],
    links: [{ rel: "canonical", href: "https://nyotawedsbilkack.vercel.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WeddingEvent",
          name: "Nyota & Bilkack's Wedding",
          startDate: "2026-05-16",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: "Vosh · Ministry of Repentance and Holiness",
          },
          url: "https://nyotawedsbilkack.vercel.app/",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { data } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await fetch("/api/images");
      if (!res.ok) throw new Error("Failed to fetch images");
      return res.json() as Promise<{ files: any[] }>;
    },
  });

  const resolvedImages = useMemo(() => {
    const files = data?.files ?? [];

    const findImage = (keywords: string[], excludeKeywords: string[] = []) => {
      const found = files.find((f) => {
        const pathLower = f.filePath.toLowerCase();
        const nameLower = f.name.toLowerCase();
        const tagsLower = (f.tags ?? []).map((t: string) => t.toLowerCase());

        const matchesKeyword = keywords.some(
          (k) => pathLower.includes(k) || nameLower.includes(k) || tagsLower.includes(k),
        );

        const matchesExclude = excludeKeywords.some(
          (k) => pathLower.includes(k) || nameLower.includes(k) || tagsLower.includes(k),
        );

        return matchesKeyword && !matchesExclude;
      });

      return found ? { url: found.url, w: found.width ?? 1920, h: found.height ?? 1280 } : null;
    };

    return {
      gettingReady: findImage(["getting ready", "getting-ready", "morning"]) || {
        url: FALLBACK_CHAPTER_IMAGES.gettingReady,
        w: 1600,
        h: 1067,
      },
      ceremony: findImage(["ceremony"]) || {
        url: FALLBACK_CHAPTER_IMAGES.ceremony,
        w: 1920,
        h: 1280,
      },
      reception: findImage(["reception"], ["gifts", "bridal"]) || {
        url: FALLBACK_CHAPTER_IMAGES.reception,
        w: 1920,
        h: 1080,
      },
      gifts: findImage(["gifts"]) || {
        url: FALLBACK_CHAPTER_IMAGES.gifts,
        w: 1600,
        h: 1067,
      },
      party: findImage(["party", "dance"]) || {
        url: FALLBACK_CHAPTER_IMAGES.party,
        w: 1920,
        h: 1280,
      },
      families: findImage(["families", "family"]) || {
        url: FALLBACK_CHAPTER_IMAGES.families,
        w: 1920,
        h: 1080,
      },
    };
  }, [data]);

  return (
    <main className="bg-ivory text-charcoal">
      <Nav />
      <Hero />
      <Story />

      <Chapter
        id="chapter-getting-ready"
        number="I."
        eyebrow="Getting Ready"
        title="The morning of."
        body="Quiet hands and quiet rooms. Lace laid out. Cufflinks set. The slow rituals before everything begins — a kind of stillness that only exists once."
        image={resolvedImages.gettingReady.url}
        imageAlt="The bride's dress by the window"
        imageW={resolvedImages.gettingReady.w}
        imageH={resolvedImages.gettingReady.h}
        variant="beige"
      />

      <Chapter
        id="ceremony"
        number="II."
        eyebrow="The Church"
        title="“I do.”"
        body="At Vosh and the Ministry of Repentance and Holiness, before God and the people who raised them, they spoke the words. Light through coloured glass. A held breath. A whole life, said out loud."
        meta="Vosh · Ministry of Repentance and Holiness"
        image={resolvedImages.ceremony.url}
        imageAlt="The couple at the altar"
        imageW={resolvedImages.ceremony.w}
        imageH={resolvedImages.ceremony.h}
        variant="fullbleed"
      />

      <Chapter
        id="chapter-reception"
        number="III."
        eyebrow="Reception"
        title="The celebration begins."
        body="Candlelight. Roses on long tables. The first walk through the room as husband and wife — and the warm sound of every person they love clapping at once."
        image={resolvedImages.reception.url}
        imageAlt="The reception hall in candlelight"
        imageW={resolvedImages.reception.w}
        imageH={resolvedImages.reception.h}
        variant="ivory"
        reverse
      />

      <Chapter
        id="chapter-gifts"
        number="IV."
        eyebrow="Given With Love"
        title="Gifts & traditions."
        body="Wrapped in gold ribbon. Carried in by hand. Every offering, a small piece of someone's affection — a thank you not yet adequate to the love it represents."
        image={resolvedImages.gifts.url}
        imageAlt="Gifts on the table"
        imageW={resolvedImages.gifts.w}
        imageH={resolvedImages.gifts.h}
        variant="beige"
      />

      <Chapter
        id="chapter-party"
        number="V."
        eyebrow="The Party"
        title="Until the morning."
        body="The lights came down. The music came up. Shoes came off. There is no photograph of this part that does it justice — only the feeling, and a thousand smiling faces that remember."
        image={resolvedImages.party.url}
        imageAlt="Dancing on the floor"
        imageW={resolvedImages.party.w}
        imageH={resolvedImages.party.h}
        variant="dark"
        reverse
      />

      <BridalParty />

      <Chapter
        id="families"
        number="VI."
        eyebrow="Both Families"
        title="Where it all began."
        body="Two families, one new circle. The hands that held them when they were small now stand behind them — proud, full, witnessing."
        image={resolvedImages.families.url}
        imageAlt="Family portrait"
        imageW={resolvedImages.families.w}
        imageH={resolvedImages.families.h}
        variant="beige"
      />

      <Gallery />
      <Film />
      <Credits />
      <Footer />
    </main>
  );
}
