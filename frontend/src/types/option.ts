export type SelectOption = {
  heading: string;
  url: string;
};

export type Option = {
  name: string;
  count: number;
  value: string;
};

export type Category = {
  name: string;
  items: Option[];
};
