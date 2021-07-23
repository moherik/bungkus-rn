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
      const id = getLastId(state.carts);

      action.payload.id = id + 1;

      state.carts.push(action.payload);
      state.selectedCarts.push(action.payload);
    },

    updateCart: (
      state,
      action: PayloadAction<{
        id: number;
        data: CartItemType;
      }>,
    ) => {
      const {cartIndex, selectedIndex} = getIndexById({
        state,
        id: action.payload.id,
      });

      state.carts.splice(cartIndex, 1, action.payload.data);
      state.selectedCarts.splice(selectedIndex, 1, action.payload.data);
    },

    deleteCart: (state, action: PayloadAction<number>) => {
      const {cartIndex, selectedIndex} = getIndexById({
        state,
        id: action.payload,
      });

      state.carts.splice(cartIndex, 1);
      state.selectedCarts.splice(selectedIndex, 1);
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
  const selectedIndex = state.selectedCarts.findIndex(cart => cart.id === id);

  return {cartIndex, selectedIndex};
};

const getLastId = (carts: WritableDraft<CartItemType>[]) => {
  return carts.reduce((acc, cart) => Math.max(acc, cart.id), 0);
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
