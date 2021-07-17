import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {menus as groups, rawMenu} from 'mocks/menus';
import {MenuGroupType, MenuItemType} from 'models/menuType';
import {MerchantType} from 'models/merchantType';

interface MenuState {
  merchants: MerchantType[];
  selectedMerchant?: MerchantType;
  menus: MenuGroupType[];
  selectedMenu?: MenuItemType;
}

const initialState = {
  merchants: [],
  selectedMerchant: undefined,
  menus: [],
  selectedMenu: undefined,
} as MenuState;

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
    selectMenu: (state, action: PayloadAction<number>) => {
      state.selectedMenu = rawMenu.filter(
        menu => menu.id === action.payload,
      )[0];
    },
    reset: state => {
      state.selectedMerchant = undefined;
      state.menus = [];
    },
    resetSelectedMenu: state => {
      state.selectedMenu = undefined;
    },
  },
});

const {reducer, actions} = merchantSlice;

export const {
  selectMerchant,
  fetchMerchants,
  selectMenu,
  reset,
  resetSelectedMenu,
} = actions;

export default reducer;
