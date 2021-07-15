import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MenuType} from 'models/menu/type';

interface MenuState {
  menus: MenuType[];
  selectedMenu?: MenuType;
}

const initialState = {
  menus: [],
  selectedMenu: undefined,
} as MenuState;

const menusSlice = createSlice({
  name: 'menus',
  initialState,
  reducers: {
    fetchMenus: (state, action: PayloadAction<MenuType[]>) => {
      state.menus = action.payload;
    },
    selectMenu: (state, action: PayloadAction<number>) => {
      state.selectedMenu = state.menus.filter(
        menu => menu.id === action.payload,
      )[0];
    },
    clearSelectedMenu: state => (state.selectedMenu = undefined),
  },
});

const {reducer, actions} = menusSlice;

export const {selectMenu, fetchMenus, clearSelectedMenu} = actions;

export default reducer;
