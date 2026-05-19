import { type ReactNode, type ElementType } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}

export function Reveal({ children, as: As = "div", className, delay }: RevealProps) {
  const ref = useScrollReveal<HTMLElement>({ delay });
  return (
    <As ref={ref as never} className={className}>
      {children}
    </As>
  );
}
