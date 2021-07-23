import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {WritableDraft} from 'immer/dist/internal';
import {menus as groups} from 'mocks/menus';
import {MenuGroupType} from 'models/menuType';
import {CartItemType, MerchantType} from 'models/merchantType';

interface MerchantState {
  merchants: MerchantType[];
  selectedMerchant?: MerchantType;
  menus: MenuGroupType[];
  carts: CartItemType[];
  selectedCarts: CartItemType[];
}

const initialState = {
  merchants: [],
  selectedMerchant: undefined,
  menus: [],
  carts: [],
  selectedCarts: [],
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
      state.selectedCarts = state.carts.filter(
        cart => cart.merchantId === action.payload,
      );
      state.menus = groups.filter(group => group.merchantId === action.payload);
    },

    reset: state => {
      state.selectedMerchant = undefined;
      state.selectedCarts = [];
      state.menus = [];
    },

    addToCart: (state, action: PayloadAction<CartItemType>) => {
      state.carts.push(action.payload);
      state.selectedCarts.push(action.payload);
    },

    updateCart: (
      state,
      action: PayloadAction<{
        menuId: number;
        data: CartItemType;
      }>,
    ) => {
      const {cartIndex, selectedIndex} = getIndex({
        state,
        menuId: action.payload.menuId,
      });

      state.carts.splice(cartIndex, 1, action.payload.data);
      state.selectedCarts.splice(selectedIndex, 1, action.payload.data);
    },

    deleteCart: (state, action: PayloadAction<number>) => {
      const {cartIndex, selectedIndex} = getIndex({
        state,
        menuId: action.payload,
      });

      state.carts.splice(cartIndex, 1);
      state.selectedCarts.splice(selectedIndex, 1);
    },
  },
});

const getIndex = ({
  state,
  menuId,
}: {
  state: WritableDraft<MerchantState>;
  menuId: number;
}) => {
  const cartIndex = state.carts.findIndex(cart => cart.menuId === menuId);
  const selectedIndex = state.selectedCarts.findIndex(
    cart => cart.menuId === menuId,
  );

  return {cartIndex, selectedIndex};
};

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
