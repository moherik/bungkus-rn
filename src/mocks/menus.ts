import {MenuGroup, MenuItem} from 'models/menu.model';

const mieAyam: MenuItem[] = [
  {
    id: 1,
    name: 'Mie Ayam Kering',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    price: 10000,
    image:
      'https://images.unsplash.com/photo-1569924220711-b1648079a75b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    variants: [
      {
        id: 1,
        menuId: 1,
        name: 'Level Hot',
        isSingle: true,
        isRequired: true,
        item: [
          {id: 1, name: 'Mama Muda'},
          {id: 2, name: 'Mantan'},
          {id: 3, name: 'Tante'},
        ],
      },
      {
        id: 2,
        menuId: 1,
        name: 'Topping',
        isSingle: false,
        isRequired: false,
        item: [
          {id: 1, name: 'Telor', price: 2000},
          {id: 2, name: 'Ceker', price: 4000},
        ],
      },
    ],
  },
];

const krabbyMakanan: MenuItem[] = [
  {
    id: 3,
    name: 'Krabby Patty Deluxe',
    description: 'Hoooplaaaa',
    price: 20000,
    discount: 20,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=602&q=80',
    variants: [
      {
        id: 1,
        menuId: 3,
        name: 'Sauce',
        isSingle: true,
        isRequired: false,
        item: [
          {id: 1, name: 'Mayonaise', price: 2000},
          {id: 2, name: 'Tomato'},
          {id: 3, name: 'Tartar Sauce', price: 5000},
        ],
      },
      {
        id: 2,
        menuId: 3,
        name: 'Topping',
        isSingle: false,
        isRequired: true,
        item: [
          {id: 1, name: 'Cheese', price: 10000},
          {id: 2, name: 'Pickle', price: 5000},
          {id: 3, name: 'French Fries', price: 5000},
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'Monster Krabby Patty',
    price: 50000,
    image:
      'https://images.unsplash.com/photo-1564362411991-472954b39f56?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=282&q=80',
  },
  {
    id: 5,
    name: "Krabby O'Monday",
    price: 20000,
    image:
      'https://images.unsplash.com/photo-1586816001966-79b736744398?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
  {
    id: 6,
    name: 'Krabby Special',
    price: 105000,
    discount: 10,
    image:
      'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  },
  {
    id: 7,
    name: 'French Fries',
    price: 5000,
    image:
      'https://images.unsplash.com/photo-1598679253544-2c97992403ea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  },
];

const krabbyMinuman: MenuItem[] = [
  {
    id: 8,
    name: 'StarBug',
    price: 35000,
    image:
      'https://images.unsplash.com/photo-1589476993333-f55b84301219?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=282&q=80',
    variants: [
      {
        id: 1,
        menuId: 1,
        name: 'Ukuran',
        isSingle: true,
        isRequired: false,
        item: [
          {id: 1, name: 'Mini', price: 2000},
          {id: 2, name: 'Sedang', price: 10000},
          {id: 3, name: 'Besar', price: 20000},
        ],
      },
    ],
  },
  {
    id: 9,
    name: 'Milkshake',
    price: 15000,
    image:
      'https://images.unsplash.com/photo-1553787499-6f9133860278?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  },
  {
    id: 10,
    name: 'Cola Cola',
    price: 10000,
    image:
      'https://images.unsplash.com/photo-1554866585-cd94860890b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=401&q=80',
  },
];

const krabbyX: MenuItem[] = [
  {
    id: 11,
    name: 'StarBug',
    price: 35000,
    image:
      'https://images.unsplash.com/photo-1589476993333-f55b84301219?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=282&q=80',
    variants: [
      {
        id: 1,
        menuId: 1,
        name: 'Ukuran',
        isSingle: true,
        isRequired: false,
        item: [
          {id: 1, name: 'Mini', price: 2000},
          {id: 2, name: 'Sedang', price: 10000},
          {id: 3, name: 'Besar', price: 20000},
        ],
      },
    ],
  },
  {
    id: 12,
    name: 'Milkshake',
    price: 15000,
    image:
      'https://images.unsplash.com/photo-1553787499-6f9133860278?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  },
];

export const rawMenu: MenuItem[] = [
  ...mieAyam,
  ...krabbyMakanan,
  ...krabbyMinuman,
  ...krabbyX,
];

export const menus: MenuGroup[] = [
  {
    id: 1,
    merchantId: 1,
    title: 'Makanan',
    data: mieAyam,
  },
  {
    id: 2,
    merchantId: 2,
    title: 'Makanan',
    data: krabbyMakanan,
  },
  {
    id: 3,
    merchantId: 2,
    title: 'Minuman',
    data: krabbyMinuman,
  },
  {
    id: 4,
    merchantId: 2,
    title: 'Krabby Patty X Mobile Legends',
    data: krabbyX,
  },
];
