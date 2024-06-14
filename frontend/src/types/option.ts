export type CategoryDetails = {
  name: string;
  heading: string;
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

export type QueryOption = {
  name?: string;
  value: string;
};

export type QueryParam = QueryOption & {
  prefix: string;
};

export type CategoryCounts = {
  query: string;
  categories: Category[];
};
