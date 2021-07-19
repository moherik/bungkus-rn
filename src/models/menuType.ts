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

export type MenuVariantType = {
  id: number;
  menuId: number;
  name: string;
  isSingle: boolean;
  isRequired?: boolean;
  item: MenuVariantItemType[];
};

type MenuVariantItemType = {
  id: number;
  name: string;
  price?: number;
};
