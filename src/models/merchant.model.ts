export type MerchantOpenType = {
  day: string;
  time: string;
};

export type MerchantCategory = {
  id: number;
  name: string;
  icon?: string;
  image?: string;
  color?: string;
  bgColor?: string;
};

export type Merchant = {
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
  categories: MerchantCategory[];
  profileImage: string;
  bannerImage?: string;
};

export type CartItem = {
  id: number;
  merchantId: number;
  menuId: number;
  menuName: string;
  qty: number;
  price: number;
  discount: number;
  note: string;
  extras: Extras[];
};

export type Extras = {
  groupId: number | string;
  items: ExtrasItem[];
};

export type ExtrasItem = {
  itemId: number | string;
  itemName: string;
  price: number | string;
};
