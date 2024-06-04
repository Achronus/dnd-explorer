type ImageType = {
  href: string;
  alt: string;
};

type CardDetailsType = {
  url: string;
  title: string;
  description: string;
  img: ImageType;
};

const HomepageCategories: CardDetailsType[] = [
  {
    url: "/classes",
    title: "Classes",
    description: "Get your classes here!",
    img: {
      href: "",
      alt: "",
    },
  },
  {
    url: "/spells",
    title: "Spells",
    description: "Get your spells here!",
    img: {
      href: "",
      alt: "",
    },
  },
  {
    url: "/monsters",
    title: "Monsters",
    description: "Get your monsters here!",
    img: {
      href: "",
      alt: "",
    },
  },
];

export { HomepageCategories };
export type { CardDetailsType, ImageType };
