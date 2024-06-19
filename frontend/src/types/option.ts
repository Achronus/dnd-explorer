export type CategoryDetails = {
  name: string;
  heading: string;
  queryKey: string;
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

export type CategoryCounts = {
  query: string;
  categories: Category[];
};
