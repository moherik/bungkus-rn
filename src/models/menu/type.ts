type Rating = {
  star: number;
  review: number;
};

type User = {
  name: string;
  image: string;
  address: string;
  latLong: string;
};

export type MenuType = {
  id: number | string;
  name: string;
  description?: string;
  distance: number;
  price: number;
  image: string;
  rating: Rating;
  variants?: VariantType[];
  user: User;
};

type VariantItemType = {
  id: number;
  name: string;
  price?: number;
};

export type VariantType = {
  id: number;
  menuId: number;
  name: string;
  item: VariantItemType[];
};

export type RecommendationMenuType = {
  id: number | string;
  name: string;
  distance: number;
  price: number;
  rating: Rating;
  image: string;
};

export type MenuCategoryType = {
  id: number | string;
  name: string;
};
