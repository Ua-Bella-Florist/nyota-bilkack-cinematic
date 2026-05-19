import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#story", label: "Our Story" },
  { href: "#ceremony", label: "The Day" },
  { href: "#gallery", label: "Gallery" },
  { href: "#film", label: "The Film" },
  { href: "#credits", label: "Credits" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(100, (y / h) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/85 backdrop-blur-xl border-b border-gold/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 md:px-12">
        <a
          href="#hero"
          className={`font-serif text-lg tracking-wide transition-colors ${
            scrolled ? "text-burgundy" : "text-ivory"
          }`}
        >
          N <span className="font-display text-gold text-xl">&amp;</span> B
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`group relative text-[12px] tracking-[0.22em] uppercase transition-colors ${
                  scrolled ? "text-charcoal hover:text-burgundy" : "text-ivory/90 hover:text-gold"
                }`}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className={`md:hidden ${scrolled ? "text-burgundy" : "text-ivory"}`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <div className="absolute bottom-0 left-0 h-px bg-gold/70 transition-[width] duration-150" style={{ width: `${progress}%` }} />

      {open && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-burgundy-deep/98 backdrop-blur-xl">
          <ul className="flex flex-col items-center justify-center gap-8 pt-24">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-serif text-2xl text-ivory hover:text-gold transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
