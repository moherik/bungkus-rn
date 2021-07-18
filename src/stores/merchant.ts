import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {WritableDraft} from 'immer/dist/internal';
import {menus as groups, rawMenu} from 'mocks/menus';
import {MenuGroupType, MenuItemType} from 'models/menuType';
import {CartItemType, MerchantType} from 'models/merchantType';

interface MerchantState {
  merchants: MerchantType[];
  selectedMerchant?: MerchantType;
  menus: MenuGroupType[];
  selectedMenu?: MenuItemType;
  carts: CartItemType[];
  totalCart?: {
    qty: number;
    price: number;
  };
  selectedCartMenu?: CartItemType;
}

const initialState = {
  merchants: [],
  selectedMerchant: undefined,
  menus: [],
  selectedMenu: undefined,
  carts: [],
  totalCart: {
    price: 0,
    qty: 0,
  },
  selectedCartMenu: undefined,
} as MerchantState;

const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {
    fetchMerchants: (state, action: PayloadAction<MerchantType[]>) => {
      state.merchants = action.payload;
    },

    selectMerchant: (state, action: PayloadAction<number>) => {
      state.selectedMerchant = state.merchants.filter(
        merchant => merchant.id === action.payload,
      )[0];
      state.menus = groups.filter(group => group.merchantId === action.payload);
      countTotalCart(state);
    },

    selectMenu: (state, action: PayloadAction<number>) => {
      state.selectedMenu = rawMenu.filter(
        menu => menu.id === action.payload,
      )[0];
      selectedMenuInCart(state);
    },

    reset: state => {
      state.selectedMerchant = undefined;
      state.totalCart = {
        price: 0,
        qty: 0,
      };
      state.menus = [];
    },

    resetSelectedMenu: state => {
      state.selectedMenu = undefined;
      state.selectedCartMenu = undefined;
    },

    addToCart: (state, action: PayloadAction<CartItemType>) => {
      const payload = action.payload;
      state.carts.push(payload);

      const price = state.totalCart?.price!!;
      const qty = state.totalCart?.qty!!;

      state.totalCart = {
        price: price + payload.price,
        qty: qty + payload.qty,
      };
    },
  },
});

const countTotalCart = (state: WritableDraft<MerchantState>) => {
  const selected = state.carts.filter(
    cart => cart.merchantId === state.selectedMerchant?.id,
  );

  const totalPrice = selected.reduce((acc, item) => acc + item.price, 0);
  const totalItem = selected.reduce((acc, item) => acc + Number(item.qty), 0);

  state.totalCart = {
    qty: totalItem,
    price: totalPrice,
  };
};

const selectedMenuInCart = (state: WritableDraft<MerchantState>) => {
  const selected = state.carts.filter(
    cart => cart.menuId === state.selectedMenu?.id,
  )[0];

  state.selectedCartMenu = selected;
};

const {reducer, actions} = merchantSlice;

export const {
  selectMerchant,
  fetchMerchants,
  selectMenu,
  reset,
  resetSelectedMenu,
  addToCart,
} = actions;

export default reducer;
