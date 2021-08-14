import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {WritableDraft} from 'immer/dist/internal';
import {menus as groups} from 'mocks/menus';
import {MenuGroup} from 'models/menu.model';
import {CartItem, Merchant} from 'models/merchant.model';

export interface MerchantState {
  merchants: Merchant[];
  selectedMerchant?: Merchant;
  menus: MenuGroup[];
  carts: CartItem[];
  selectedCarts: CartItem[];
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
    fetchMerchants: (state, action: PayloadAction<Merchant[]>) => {
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

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const id = getLastId(state.carts);

      action.payload.id = id + 1;

      state.carts.push(action.payload);
      state.selectedCarts.push(action.payload);
    },

    updateCart: (
      state,
      action: PayloadAction<{
        id: number;
        data: CartItem;
      }>,
    ) => {
      const {cartIndex, selectedCartIndex} = getIndexById({
        state,
        id: action.payload.id,
      });

      state.carts.splice(cartIndex, 1, action.payload.data);
      state.selectedCarts.splice(selectedCartIndex, 1, action.payload.data);
    },

    deleteCart: (state, action: PayloadAction<number>) => {
      const {cartIndex, selectedCartIndex} = getIndexById({
        state,
        id: action.payload,
      });

      state.carts.splice(cartIndex, 1);
      state.selectedCarts.splice(selectedCartIndex, 1);
    },
  },
});

const getIndexById = ({
  state,
  id,
}: {
  state: WritableDraft<MerchantState>;
  id: number;
}) => {
  const cartIndex = state.carts.findIndex(cart => cart.id === id);
  const selectedCartIndex = state.selectedCarts.findIndex(
    cart => cart.id === id,
  );

  return {cartIndex, selectedCartIndex};
};

const getLastId = (carts: WritableDraft<CartItem>[]) => {
  return carts.reduce((acc, cart) => Math.max(acc, cart.id), 0);
};

export const {
  selectMerchant,
  fetchMerchants,
  reset,
  addToCart,
  updateCart,
  deleteCart,
} = merchantSlice.actions;

export default merchantSlice.reducer;
