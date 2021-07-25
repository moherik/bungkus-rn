export type MenuCategory = {
  id: number | string;
  name: string;
};

export type MenuGroup = {
  id: number;
  merchantId: number;
  title: string;
  data: MenuItem[];
};

export type MenuItem = {
  id: number | string;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  image: string;
  variants?: MenuVariant[];
};

export type MenuVariant = {
  id: number;
  menuId: number;
  name: string;
  isSingle: boolean;
  isRequired?: boolean;
  item: MenuVariantItem[];
};

type MenuVariantItem = {
  id: number;
  name: string;
  price?: number;
};
