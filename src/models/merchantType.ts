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
