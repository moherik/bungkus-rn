import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {menus as groups} from 'mocks/menus';
import {MenuGroupType} from 'models/menuType';
import {CartItemType, MerchantType} from 'models/merchantType';

interface MerchantState {
  merchants: MerchantType[];
  selectedMerchant?: MerchantType;
  menus: MenuGroupType[];
  carts: CartItemType[];
}

const initialState = {
  merchants: [],
  selectedMerchant: undefined,
  menus: [],
  carts: [],
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
    },

    reset: state => {
      state.selectedMerchant = undefined;
      state.menus = [];
    },

    addToCart: (state, action: PayloadAction<CartItemType>) => {
      const payload = action.payload;
      state.carts.push(payload);
    },

    updateCart: (
      state,
      action: PayloadAction<{
        menuId: number;
        data: CartItemType;
      }>,
    ) => {
      const index = state.carts.findIndex(
        cart => cart.menuId === action.payload.menuId,
      );
      state.carts.splice(index, 1, action.payload.data);
    },

    deleteCart: (state, action: PayloadAction<number>) => {
      const index = state.carts.findIndex(
        cart => cart.menuId === action.payload,
      );
      state.carts.splice(index, 1);
    },
  },
});

const {reducer, actions} = merchantSlice;

export const {
  selectMerchant,
  fetchMerchants,
  reset,
  addToCart,
  updateCart,
  deleteCart,
} = actions;

export default reducer;
