import { useEffect, useRef } from "react";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY * 0.25;
        el.style.transform = `translate3d(0, ${y}px, 0) scale(1.05)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative h-[100svh] w-full overflow-hidden bg-burgundy-deep text-ivory"
    >
      <div ref={ref} className="absolute inset-0 will-change-transform">
        <img
          src={heroImg}
          alt="Nyota and Bilkack — wedding portrait"
          width={1920}
          height={1280}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-burgundy-deep/55" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-burgundy-deep/90 to-transparent" />
      <div className="vignette absolute inset-0" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p
          className="label-gold animate-[fade-up_1.2s_ease-out_0.3s_both]"
          style={{ color: "var(--gold)" }}
        >
          16 · 05 · 2026
        </p>

        <h1 className="mt-8 font-display text-ivory leading-none animate-[fade-up_1.4s_ease-out_0.6s_both]">
          <span className="block text-[clamp(3.5rem,11vw,9rem)]">Nyota</span>
          <span className="my-2 block text-[clamp(2rem,5vw,3.5rem)] font-serif italic text-gold animate-float-soft">
            &amp;
          </span>
          <span className="block text-[clamp(3.5rem,11vw,9rem)]">Bilkack</span>
        </h1>

        <p className="mt-10 max-w-md font-serif italic text-base sm:text-lg text-ivory/85 animate-[fade-up_1.4s_ease-out_1.1s_both]">
          “Every love story is beautiful, but ours is my favourite.”
        </p>

        <a
          href="#story"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-ivory/70 hover:text-gold transition-colors"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <span className="block h-10 w-px bg-current animate-bounce-soft" aria-hidden />
        </a>
      </div>
    </section>
  );
}
