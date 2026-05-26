export interface GalleryItem {
  src: string;
  thumbnail?: string;
  tag: "Getting Ready" | "Ceremony" | "Reception" | "Party" | "Families";
  alt: string;
  aspect: string;
  /** Native pixel width of the image — used for CLS-prevention on <img> */
  width?: number;
  /** Native pixel height of the image — used for CLS-prevention on <img> */
  height?: number;
}

// =========================================================================
// IMAGEKIT FALLBACK IMAGES
// Provide specific ImageKit URLs as defaults when the dynamic fetching
// from your platform is offline, empty, or currently loading.
// Feel free to customize or add new links here for any section or category!
// =========================================================================

export const FALLBACK_GALLERY_IMAGES: GalleryItem[] = [
  {
    src: "https://ik.imagekit.io/nyotabilkack/nyota-bilkack/getting%20ready/22-IMG_9840.jpg?updatedAt=1779721007683",
    tag: "Getting Ready",
    alt: "Bride's dress by the window",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://ik.imagekit.io/nyotabilkack/wedding/156-IMG_0412.jpg",
    tag: "Ceremony",
    alt: "Church ceremony and vow exchange",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://ik.imagekit.io/nyotabilkack/wedding/WhatsApp%20Image%202026-05-18%20at%2010.30.41%20(1).jpeg",
    tag: "Ceremony",
    alt: "Hands joined together in holy matrimony",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://ik.imagekit.io/nyotabilkack/wedding/258-IMG_0581.jpg",
    tag: "Reception",
    alt: "Beautifully lit reception room",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://ik.imagekit.io/nyotabilkack/wedding/333-IMG_0691.jpg?updatedAt=1779729879891",
    tag: "Reception",
    alt: "Beautiful wedding gifts on the table",
    aspect: "aspect-square",
  },
  {
    src: "https://ik.imagekit.io/nyotabilkack/wedding/WhatsApp%20Image%202026-05-18%20at%2010.30.48.jpeg",
    tag: "Reception",
    alt: "Bridal party walking together",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://ik.imagekit.io/nyotabilkack/wedding/206-IMG_0499.jpg",
    tag: "Party",
    alt: "Guests dancing under vibrant reception lights",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://ik.imagekit.io/nyotabilkack/wedding/429-IMG_0811.jpg",
    tag: "Families",
    alt: "A grand family portrait at the altar",
    aspect: "aspect-[4/3]",
  },
];

export const FALLBACK_CHAPTER_IMAGES = {
  gettingReady:
    "https://ik.imagekit.io/nyotabilkack/nyota-bilkack/getting%20ready/22-IMG_9840.jpg?updatedAt=1779721007683",
  ceremony: "https://ik.imagekit.io/nyotabilkack/wedding/156-IMG_0412.jpg",
  reception: "https://ik.imagekit.io/nyotabilkack/wedding/258-IMG_0581.jpg",
  gifts: "https://ik.imagekit.io/nyotabilkack/wedding/333-IMG_0691.jpg?updatedAt=1779729879891",
  party: "https://ik.imagekit.io/nyotabilkack/wedding/206-IMG_0499.jpg",
  families: "https://ik.imagekit.io/nyotabilkack/wedding/429-IMG_0811.jpg",
};
