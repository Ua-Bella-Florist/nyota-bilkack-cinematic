import { Reveal } from "./Reveal";

interface ChapterHeaderProps {
  eyebrow: string;
  title: string;
  light?: boolean;
  align?: "left" | "center";
}

export function ChapterHeader({ eyebrow, title, light, align = "center" }: ChapterHeaderProps) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      <Reveal>
        <p className={light ? "label-gold" : "label-eyebrow"}>{eyebrow}</p>
      </Reveal>
      <Reveal delay={120}>
        <h2
          className={`mt-5 font-serif font-normal tracking-tight ${
            light ? "text-ivory" : "text-burgundy"
          } text-[clamp(2rem,5vw,4rem)] leading-[1.1]`}
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
