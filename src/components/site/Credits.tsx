import { Reveal } from "./Reveal";
import { ChapterHeader } from "./ChapterHeader";

const credits = [
  { role: "Photography", name: "TBC Studio" },
  { role: "Reception Decor", name: "Maison Atelier" },
  { role: "Event Setup", name: "Petal & Vine" },
  { role: "Cake", name: "House of Sugar" },
  { role: "Church", name: "Vosh" },
  { role: "Church", name: "Ministry of Repentance and Holiness" },
];

export function Credits() {
  return (
    <section id="credits" className="relative bg-burgundy py-28 md:py-36 text-ivory">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <ChapterHeader light eyebrow="It Takes A Village" title="The team that made it happen." />

        <div className="mt-20 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {credits.map((c, i) => (
            <Reveal key={`${c.role}-${i}`} delay={i * 90} className="border-t border-gold/30 pt-6">
              <p className="label-gold">{c.role}</p>
              <p className="mt-3 font-serif text-ivory text-2xl">{c.name}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
