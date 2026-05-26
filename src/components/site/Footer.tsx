export function Footer() {
  return (
    <footer className="relative bg-burgundy-deep py-20 text-center text-ivory">
      <div className="mx-auto max-w-2xl px-6">
        <p className="font-display text-5xl text-gold">Nyota &amp; Bilkack</p>
        <p className="mt-4 label-gold">16 · 05 · 2026</p>
        <p className="mt-10 font-serif italic text-ivory/70">
          “Every love story is beautiful, but ours is my favourite.”
        </p>
        <p className="mt-12 text-[11px] tracking-[0.3em] uppercase text-ivory/40">
          A keepsake — with gratitude
        </p>
        <p className="mt-4 text-[11px] tracking-[0.2em] uppercase text-ivory/30">
          Site developed by <a href="https://jumalaw98.netlify.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-ivory transition-colors">Lawrence</a>
        </p>
      </div>
    </footer>
  );
}
