import { useScrollReveal } from "@/hooks/useScrollReveal";

export function GoldDivider({ light = false }: { light?: boolean }) {
  const color = light ? "bg-white/30" : "bg-gold/60";
  const diamond = light ? "bg-white/70" : "bg-gold";
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="flex items-center justify-center gap-4 py-2 divider-draw">
      <span className={`h-px w-24 sm:w-32 origin-right ${color} divider-line`} />
      <span className={`block h-1.5 w-1.5 rotate-45 ${diamond} divider-diamond`} aria-hidden />
      <span className={`h-px w-24 sm:w-32 origin-left ${color} divider-line`} />
    </div>
  );
}
