import { UTImage } from "./api";

export type CategoryCardDetails = {
  title: string;
  count: number | "N/A";
  url: string;
  img: UTImage;
};

export type CardDetailsType = {
  url: string;
  title: string;
  description: string;
  img: UTImage;
};
