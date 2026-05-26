import { ChapterHeader } from "./ChapterHeader";
import { GoldDivider } from "./GoldDivider";
import { Reveal } from "./Reveal";

const members = [
  { name: "Sharon", role: "Maid of Honour" },
  { name: "Jack", role: "Best Man" },
  { name: "Levin", role: "Bridesmaid" },
  { name: "Dornah", role: "Bridesmaid" },
  { name: "Imeldah", role: "Bridesmaid" },
  { name: "Faith", role: "Bridesmaid" },
  { name: "Enock", role: "Groomsman" },
  { name: "Sam", role: "Groomsman" },
  { name: "Kelly", role: "Groomsman" },
  { name: "Vincent", role: "Groomsman" },
  { name: "Kevin", role: "Groomsman" },
  { name: "Victor", role: "Groomsman" },
];

export function BridalParty() {
  return (
    <section id="bridal-party" className="relative bg-ivory py-28 md:py-36">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <ChapterHeader eyebrow="The Bridal Party" title="The ones who showed up." />

        <Reveal className="mt-16 relative aspect-[16/10] overflow-hidden">
          <img
            src="https://ik.imagekit.io/nyotabilkack/wedding/WhatsApp%20Image%202026-05-18%20at%2010.30.48.jpeg?updatedAt=1779303243019"
            alt="The bridal party"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </Reveal>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-14">
          {members.map((m, i) => (
            <Reveal
              key={m.name}
              delay={i * 80}
              className="text-center border-t border-gold/30 pt-6"
            >
              <p className="label-gold">{m.role}</p>
              <p className="mt-3 font-serif text-burgundy text-2xl md:text-3xl">{m.name}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-24">
          <GoldDivider />
        </div>
      </div>
    </section>
  );
}
