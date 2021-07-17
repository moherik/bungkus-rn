export type MenuCategoryType = {
  id: number | string;
  name: string;
};

export type MenuGroupType = {
  id: number;
  merchantId: number;
  title: string;
  data: MenuItemType[];
};

export type MenuItemType = {
  id: number | string;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  image: string;
  variants?: MenuVariantType[];
};

type MenuVariantItemType = {
  id: number;
  name: string;
  price?: number;
};

export type MenuVariantType = {
  id: number;
  menuId: number;
  name: string;
  item: MenuVariantItemType[];
};
