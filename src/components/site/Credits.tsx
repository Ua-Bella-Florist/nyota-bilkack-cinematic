import { Reveal } from "./Reveal";
import { ChapterHeader } from "./ChapterHeader";

type Credit = {
  role: string;
  name: string;
  phone?: string;
  email?: string;
  social?: {
    label: string;
    url: string;
  };
};

const credits: Credit[] = [
  //   { 
  //   role: "Photography", 
  //   name: "Xavier Shot IT",
  //   phone: "+254 700 000000",
  //   email: "hello@example.com",
  //   social: { label: "@xaviershotit", url: "https://instagram.com/xaviershotit" }
  // },

  {
    role: "Photography",
    name: "Xavier Shot IT",
    phone: "+254723651696",
  },
  {
    role: "Reception Decor",
    name: "Sajero Events",
    phone: "+254716819433",
    email: " events@sajero.co.ke",
  },
  {
    role: "Event Setup",
    name: "Sajero Events",
    phone: "+254716819433",
  },
  {
    role: "Cake",
    name: "Lavendar Cakes, Kisumu",
    phone: "+254719506545",
  },
  {
    role: "Church",
    name: "Voice of Salvation and Healing Church, VOSH"
  },
  {
    role: "Church",
    name: "Ministry of Repentance and Holiness, Ahero Main Altar"
  },
];

export function Credits() {
  return (
    <section id="credits" className="relative bg-burgundy py-28 md:py-36 text-ivory">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <ChapterHeader light eyebrow="It Takes A Village" title="The team that made it happen." />

        <div className="mt-20 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {credits.map((c, i) => (
            <Reveal key={`${c.role}-${i}`} delay={i * 90} className="border-t border-gold/30 pt-6">
              <p className="label-gold">{c.role}</p>
              <p className="mt-3 font-serif text-ivory text-2xl">{c.name}</p>
              {(c.phone || c.email || c.social) && (
                <div className="mt-4 flex flex-col gap-2 text-sm text-ivory/70 font-sans tracking-wide">
                  {c.phone && (
                    <a href={`tel:${c.phone.replace(/\s+/g, '')}`} className="hover:text-gold transition-colors inline-flex items-center gap-2">
                      {c.phone}
                    </a>
                  )}
                  {c.email && c.email !== "[EMAIL_ADDRESS]" && (
                    <a href={`mailto:${c.email}`} className="hover:text-gold transition-colors inline-flex items-center gap-2">
                      {c.email}
                    </a>
                  )}
                  {c.social && (
                    <a href={c.social.url} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors inline-flex items-center gap-2">
                      {c.social.label}
                    </a>
                  )}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
