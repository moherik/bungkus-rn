import {MenuType} from 'models/menu/type';

const menus: MenuType[] = [
  {
    id: 1,
    name: 'Mie Ayam Kering',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    distance: 20,
    price: 10000,
    image:
      'https://images.unsplash.com/photo-1569924220711-b1648079a75b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    rating: {
      star: 4,
      review: 2,
    },
    variants: [
      {
        id: 1,
        menuId: 1,
        name: 'Level Hot',
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
        item: [
          {id: 1, name: 'Telor', price: 2000},
          {id: 2, name: 'Ceker', price: 4000},
        ],
      },
    ],
    user: {
      name: 'McQueen',
      address: 'Jl. Raya Vetaran No. 60',
      latLong: '3940202039, 24422234',
      image: 'https://i.pravatar.cc/300',
    },
  },
  {
    id: 2,
    name: 'Kopi Star Bug',
    distance: 10,
    price: 35000,
    image:
      'https://images.unsplash.com/photo-1589476993333-f55b84301219?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=282&q=80',
    rating: {
      star: 4.5,
      review: 10,
    },
    variants: [
      {
        id: 1,
        menuId: 1,
        name: 'Ukuran',
        item: [
          {id: 1, name: 'Mini', price: 2000},
          {id: 2, name: 'Sedang', price: 10000},
          {id: 3, name: 'Besar', price: 20000},
        ],
      },
    ],
    user: {
      name: 'McQueen',
      address: 'Jl. Raya Vetaran No. 60',
      latLong: '3940202039, 24422234',
      image: 'https://i.pravatar.cc/300',
    },
  },
  {
    id: 3,
    name: 'Ayam Bakar Haji Gepeng',
    distance: 3,
    price: 40000,
    image:
      'https://images.unsplash.com/photo-1578874557108-9fc2cfb1121e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80',
    rating: {
      star: 4.5,
      review: 44,
    },
    user: {
      name: 'McQueen',
      address: 'Jl. Raya Vetaran No. 60',
      latLong: '3940202039, 24422234',
      image: 'https://i.pravatar.cc/300',
    },
  },
  {
    id: 4,
    name: 'Pentol Bakar Italia',
    distance: 8,
    price: 5000,
    image:
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=333&q=80',
    rating: {
      star: 4.5,
      review: 690,
    },
    user: {
      name: 'McQueen',
      address: 'Jl. Raya Vetaran No. 60',
      latLong: '3940202039, 24422234',
      image: 'https://i.pravatar.cc/300',
    },
  },
  {
    id: 5,
    name: 'Krabby Patty Deluxe',
    distance: 20,
    price: 20000,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=602&q=80',
    rating: {
      star: 5,
      review: 20,
    },
    user: {
      name: 'McQueen',
      address: 'Jl. Raya Vetaran No. 60',
      latLong: '3940202039, 24422234',
      image: 'https://i.pravatar.cc/300',
    },
  },
];

export default menus;
