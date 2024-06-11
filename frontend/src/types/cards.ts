import { UTImage } from "./api";

type HomeCategories = {
  url: string;
  title: string;
  imgName: string;
  count?: number | "N/A";
  img?: UTImage;
};

type CategoryCardDetails = {
  title: string;
  count: number | "N/A";
  url: string;
  img: UTImage;
};

type CardDetailsType = {
  url: string;
  title: string;
  description: string;
  img: {
    name: string;
    url: string;
  };
};

type ImgCategory = {
  name: string;
  url: string;
};

export type {
  HomeCategories,
  CategoryCardDetails,
  CardDetailsType,
  ImgCategory,
};
