import { useState } from "react";
import { Play } from "lucide-react";
import { Reveal } from "./Reveal";

const VIDEO_ID = "w-S96-jwM-g";

export function Film() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="film" className="relative bg-burgundy-deep py-28 md:py-36 text-ivory">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 text-center">
        <Reveal>
          <p className="label-gold">The Film</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mt-5 font-serif text-ivory text-[clamp(2.25rem,5vw,4rem)] leading-[1.05]">
            The day, in motion.
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className="mx-auto mt-6 max-w-xl font-serif italic text-ivory/70 text-[16px]">
            A few minutes that hold the whole day.
          </p>
        </Reveal>

        <Reveal
          delay={300}
          className="mt-16 relative aspect-video w-full overflow-hidden ring-1 ring-gold/30"
        >
          {loaded ? (
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="Wedding Film"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              onClick={() => setLoaded(true)}
              className="group absolute inset-0 flex items-center justify-center bg-burgundy/40"
              aria-label="Play wedding film"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{
                  backgroundImage: `url(https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg)`,
                }}
              />
              <div className="absolute inset-0 bg-burgundy-deep/50" />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-gold/60 bg-burgundy-deep/40 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-gold">
                <Play size={28} className="ml-1 text-gold" fill="currentColor" />
              </span>
            </button>
          )}
        </Reveal>
      </div>
    </section>
  );
}
