type HomeCategories = {
  url: string;
  title: string;
  count: number;
  imgName: string;
};

type CategoryCardDetails = {
  title: string;
  count: number;
  url: string;
  img: {
    name: string;
    url: string;
  };
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
