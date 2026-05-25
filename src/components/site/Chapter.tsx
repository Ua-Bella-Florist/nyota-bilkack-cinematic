import { Reveal } from "./Reveal";
import { Image as IKImage } from "@imagekit/react";

interface ChapterProps {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  meta?: string;
  image: string;
  imageAlt: string;
  imageW: number;
  imageH: number;
  variant?: "ivory" | "beige" | "dark" | "fullbleed";
  reverse?: boolean;
}

export function Chapter({
  id,
  number,
  eyebrow,
  title,
  body,
  meta,
  image,
  imageAlt,
  imageW,
  imageH,
  variant = "ivory",
  reverse = false,
}: Readonly<ChapterProps>) {
  const isImageKitUrl = image.includes("ik.imagekit.io");

  if (variant === "fullbleed") {
    return (
      <section id={id} className="relative h-[100svh] w-full overflow-hidden bg-burgundy-deep">
        {isImageKitUrl ? (
          <IKImage
            src={image}
            alt={imageAlt}
            width={imageW}
            height={imageH}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <img
            src={image}
            alt={imageAlt}
            width={imageW}
            height={imageH}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-burgundy-deep/65" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-ivory">
          <Reveal>
            <p className="label-gold">{eyebrow}</p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="mt-6 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] max-w-3xl">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-8 max-w-xl font-serif italic text-[17px] leading-[1.8] text-ivory/85">
              {body}
            </p>
          </Reveal>
          {meta && (
            <Reveal delay={450}>
              <p className="mt-8 label-gold">{meta}</p>
            </Reveal>
          )}
        </div>
      </section>
    );
  }

  let bg = "bg-ivory";
  if (variant === "beige") bg = "bg-beige";
  else if (variant === "dark") bg = "bg-burgundy-deep";
  const textColor = variant === "dark" ? "text-ivory" : "text-charcoal";
  const titleColor = variant === "dark" ? "text-ivory" : "text-burgundy";
  const bodyColor = variant === "dark" ? "text-ivory/80" : "text-charcoal/90";
  const orderImg = reverse ? "md:order-2" : "";
  const orderText = reverse ? "md:order-1" : "";

  return (
    <section id={id} className={`relative ${bg} ${textColor} py-28 md:py-36`}>
      <div className="mx-auto grid max-w-[1280px] gap-14 px-6 md:grid-cols-12 md:gap-20 md:px-12">
        <div className={`md:col-span-7 ${orderImg}`}>
          <Reveal className="relative overflow-hidden group">
            {isImageKitUrl ? (
              <IKImage
                src={image}
                alt={imageAlt}
                width={imageW}
                height={imageH}
                loading="lazy"
                className="h-auto w-full object-cover transition-transform duration-[1500ms] group-hover:scale-[1.05]"
              />
            ) : (
              <img
                src={image}
                alt={imageAlt}
                width={imageW}
                height={imageH}
                loading="lazy"
                className="h-auto w-full object-cover transition-transform duration-[1500ms] group-hover:scale-[1.05]"
              />
            )}
          </Reveal>
        </div>
        <div className={`md:col-span-5 flex flex-col justify-center ${orderText}`}>
          <Reveal>
            <div className="flex items-baseline gap-4">
              <span className="font-serif italic text-gold text-2xl">{number}</span>
              <span className={`label-eyebrow ${variant === "dark" ? "text-ivory/60" : ""}`}>
                {eyebrow}
              </span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2
              className={`mt-6 font-serif ${titleColor} text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1]`}
            >
              {title}
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className={`mt-7 font-serif text-[17px] leading-[1.85] ${bodyColor} max-w-[480px]`}>
              {body}
            </p>
          </Reveal>
          {meta && (
            <Reveal delay={360}>
              <p className="mt-8 label-gold">{meta}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

