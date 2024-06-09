type CategoryCardDetailsType = {
  url: string;
  title: string;
  count: number;
  imgName: string;
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
  CategoryCardDetailsType,
  CardDetailsType,
  ImgCategory,
};
