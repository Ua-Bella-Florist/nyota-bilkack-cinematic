import storyImg from "@/assets/story.jpg";
import { Reveal } from "./Reveal";
import { GoldDivider } from "./GoldDivider";

export function Story() {
  return (
    <section id="story" className="relative bg-ivory py-28 md:py-40">
      <div className="mx-auto grid max-w-[1280px] gap-16 px-6 md:grid-cols-12 md:px-12 md:gap-20">
        <div className="md:col-span-5">
          <Reveal className="relative aspect-[4/5] overflow-hidden">
            <img
              src={storyImg}
              alt="Nyota and Bilkack — quiet portrait"
              width={1280}
              height={1600}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-gold/30" />
          </Reveal>
        </div>

        <div className="md:col-span-7 md:pt-12">
          <Reveal>
            <p className="label-gold">Our Story</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-5 font-serif text-burgundy text-[clamp(2.25rem,5vw,4rem)] leading-[1.05]">
              A slow, certain,
              <br />
              <em className="font-display text-gold text-[1.4em] font-normal not-italic">
                beautiful knowing.
              </em>
            </h2>
          </Reveal>

          <div className="mt-10 max-w-[560px] space-y-6 font-serif text-[17px] leading-[1.85] text-charcoal/90">
            <Reveal as="p">
              Some love stories start with a glance. Ours started with something quieter — a moment
              neither of us planned, in a place we both happened to be. What followed was not a
              rush, but a knowing.
            </Reveal>
            <Reveal as="p" delay={120}>
              Through seasons of life — its ordinary days and extraordinary ones — they chose each
              other, again and again. A friendship that grew into something neither could contain.
            </Reveal>
            <Reveal as="p" delay={240}>
              On the 16th of May 2026, before family, friends, church, and God, they made it
              official. This is that day.
            </Reveal>
          </div>

          <div className="mt-14">
            <GoldDivider />
          </div>
        </div>
      </div>
    </section>
  );
}
