import { SpellCardApi } from "./api";

type ImageType = {
  href: string;
  alt: string;
};

type CategoryCardDetailsType = {
  url: string;
  title: string;
  count: number;
  img: ImageType;
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

export type {
  CategoryCardDetailsType,
  CardDetailsType,
  ImageType,
  SpellCardInfo,
};
