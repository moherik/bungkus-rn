export type MerchantOpenType = {
  day: string;
  time: string;
};

export type MerchantCategoryType = {
  id: number;
  name: string;
};

export type MerchantType = {
  id: number;
  name: string;
  description?: string;
  address: string;
  latlong: string;
  distance: number;
  rating: {
    stars: number;
    review: number;
  };
  open: MerchantOpenType[];
  categories: MerchantCategoryType[];
  profileImage: string;
  bannerImage?: string;
};

export type CartItemType = {
  id: number;
  merchantId: number;
  menuId: number;
  menuName: string;
  qty: number;
  price: number;
  discount: number;
  note: string;
  extras: ExtrasType[];
};

export type ExtrasType = {
  groupId: number | string;
  items: ExtrasItemType[];
};

export type ExtrasItemType = {
  itemId: number | string;
  itemName: string;
  price: number | string;
};
