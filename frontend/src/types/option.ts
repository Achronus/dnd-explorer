export type SelectOption = {
  heading: string;
  url: string;
};

export type Option = {
  name: string;
  count: number;
};

export type Category = {
  name: string;
  items: Option[];
};
