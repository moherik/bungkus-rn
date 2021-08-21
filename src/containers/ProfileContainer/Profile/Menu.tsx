import React from 'react';
import {Icon} from 'native-base';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';

export interface IProfileMenu {
  type: 'item' | 'separator';
  label: string;
  subText?: string;
  iconName?: string;
  iconComponent?: JSX.Element;
  iconRightName?: string;
  route?: string;
  isUri?: boolean;
}

const ICON_SIZE = 6;

const styles = StyleSheet.create({
  icon: {
    width: 25,
  },
});

export const menuItems: IProfileMenu[] = [
  {
    type: 'item',
    label: 'Pesanan Saya',
    subText: 'Semua daftar pesanan kamu ada disini',
    iconComponent: (
      <Icon
        as={<MIcons name="silverware" />}
        size={ICON_SIZE}
        style={styles.icon}
      />
    ),
    route: 'MyOrder',
  },
  {
    type: 'item',
    label: 'Favorit',
    subText: 'Toko dan menu favoritmu',
    iconComponent: (
      <Icon
        as={<MIcons name="heart-outline" />}
        size={ICON_SIZE}
        style={styles.icon}
      />
    ),
    route: 'Favorite',
  },
  {
    type: 'item',
    label: 'Keranjang',
    subText: 'Daftar pesanan yang belum kamu checkout',
    iconComponent: (
      <Icon
        as={<MIcons name="shopping-outline" />}
        size={ICON_SIZE}
        style={styles.icon}
      />
    ),
    route: 'Cart',
  },
  {
    type: 'item',
    label: 'Toko Saya',
    subText: 'Kelola tokomu',
    iconComponent: (
      <Icon
        as={<MIcons name="storefront-outline" />}
        size={ICON_SIZE}
        style={styles.icon}
      />
    ),
    route: 'Store',
  },
  {
    type: 'item',
    label: 'Pengaturan',
    iconComponent: (
      <Icon
        as={<MIcons name="cog-outline" />}
        size={ICON_SIZE}
        style={styles.icon}
      />
    ),
    route: 'Setting',
  },
  {
    type: 'separator',
    label: 'Hubungi Kami',
  },
  {
    type: 'item',
    label: 'Bantuan & FAQ',
    subText: 'Bantuan dan pertanyaan yang sering ditanyakan',
    iconComponent: (
      <Icon
        as={<MIcons name="help-circle-outline" />}
        size={ICON_SIZE}
        style={styles.icon}
      />
    ),
    route: 'Help',
  },
  {
    type: 'item',
    label: 'Facebook',
    iconComponent: (
      <Icon
        as={<MIcons name="facebook" />}
        size={ICON_SIZE}
        style={styles.icon}
      />
    ),
    iconRightName: 'open-in-new',
  },
  {
    type: 'item',
    label: 'Instagram',
    iconComponent: (
      <Icon
        as={<MIcons name="instagram" />}
        size={ICON_SIZE}
        style={styles.icon}
      />
    ),
    iconRightName: 'open-in-new',
  },
  {
    type: 'item',
    label: 'support@bungkus.com',
    iconComponent: (
      <Icon
        as={<MIcons name="email-outline" />}
        size={ICON_SIZE}
        style={styles.icon}
      />
    ),
    iconRightName: 'open-in-new',
  },
  {
    type: 'separator',
    label: 'Tentang Aplikasi',
  },
  {
    type: 'item',
    label: 'Kebijakan Privasi',
    iconRightName: 'open-in-new',
  },
  {
    type: 'item',
    label: 'Lisensi Sumber Terbuka',
    iconRightName: 'open-in-new',
  },
];
