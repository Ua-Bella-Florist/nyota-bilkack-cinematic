import { Reveal } from "./Reveal";

export function GoldDivider({ light = false }: { light?: boolean }) {
  const color = light ? "bg-white/30" : "bg-gold/60";
  const diamond = light ? "bg-white/70" : "bg-gold";
  return (
    <Reveal className="flex items-center justify-center gap-4 py-2">
      <span className={`h-px w-24 sm:w-32 ${color}`} />
      <span className={`block h-1.5 w-1.5 rotate-45 ${diamond}`} aria-hidden />
      <span className={`h-px w-24 sm:w-32 ${color}`} />
    </Reveal>
  );
}
