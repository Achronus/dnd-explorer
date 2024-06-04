import { SpellCardApi } from "./api";

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

type SpellCardInfo = SpellCardApi & {
  desc: string[];
  img?: ImageType;
};

export type { CardDetailsType, ImageType, SpellCardInfo };
