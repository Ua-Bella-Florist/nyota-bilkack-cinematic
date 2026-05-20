import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Story } from "@/components/site/Story";
import { Chapter } from "@/components/site/Chapter";
import { BridalParty } from "@/components/site/BridalParty";
import { Gallery } from "@/components/site/Gallery";
import { Film } from "@/components/site/Film";
import { Credits } from "@/components/site/Credits";
import { Footer } from "@/components/site/Footer";

import gettingReady from "@/assets/getting-ready.jpg";
import ceremony from "@/assets/ceremony.jpg";
import reception from "@/assets/reception.jpg";
import gifts from "@/assets/gifts.jpg";
import party from "@/assets/party.jpg";
import families from "@/assets/families.jpg";

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
        content:
          "A cinematic memorial of Nyota and Bilkack's wedding day at Vosh.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://nyota-bilkack-cinematic.lovable.app/" },
    ],
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
          url: "https://nyota-bilkack-cinematic.lovable.app/",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
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
        image={gettingReady}
        imageAlt="The bride's dress by the window"
        imageW={1600}
        imageH={1067}
        variant="beige"
      />

      <Chapter
        id="ceremony"
        number="II."
        eyebrow="The Church"
        title="“I do.”"
        body="At Vosh and the Ministry of Repentance and Holiness, before God and the people who raised them, they spoke the words. Light through coloured glass. A held breath. A whole life, said out loud."
        meta="Vosh · Ministry of Repentance and Holiness"
        image={ceremony}
        imageAlt="The couple at the altar"
        imageW={1920}
        imageH={1280}
        variant="fullbleed"
      />

      <Chapter
        id="chapter-reception"
        number="III."
        eyebrow="Reception"
        title="The celebration begins."
        body="Candlelight. Roses on long tables. The first walk through the room as husband and wife — and the warm sound of every person they love clapping at once."
        image={reception}
        imageAlt="The reception hall in candlelight"
        imageW={1920}
        imageH={1080}
        variant="ivory"
        reverse
      />

      <Chapter
        id="chapter-gifts"
        number="IV."
        eyebrow="Given With Love"
        title="Gifts & traditions."
        body="Wrapped in gold ribbon. Carried in by hand. Every offering, a small piece of someone's affection — a thank you not yet adequate to the love it represents."
        image={gifts}
        imageAlt="Gifts on the table"
        imageW={1600}
        imageH={1067}
        variant="beige"
      />

      <Chapter
        id="chapter-party"
        number="V."
        eyebrow="The Party"
        title="Until the morning."
        body="The lights came down. The music came up. Shoes came off. There is no photograph of this part that does it justice — only the feeling, and a thousand smiling faces that remember."
        image={party}
        imageAlt="Dancing on the floor"
        imageW={1920}
        imageH={1280}
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
        image={families}
        imageAlt="Family portrait"
        imageW={1920}
        imageH={1080}
        variant="beige"
      />

      <Gallery />
      <Film />
      <Credits />
      <Footer />
    </main>
  );
}
