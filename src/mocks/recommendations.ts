import {RecommendationMenuType} from 'models/menu/type';

const recommendations: RecommendationMenuType[] = [
  {
    id: 1,
    name: 'Mie Ayam Kering',
    distance: 20,
    price: 10000,
    rating: {
      star: 4,
      review: 2,
    },
    image:
      'https://images.unsplash.com/photo-1569924220711-b1648079a75b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
  },
  {
    id: 2,
    name: 'Kopi Star Bug',
    distance: 10,
    price: 35000,
    rating: {
      star: 4.5,
      review: 10,
    },
    image:
      'https://images.unsplash.com/photo-1589476993333-f55b84301219?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=282&q=80',
  },
  {
    id: 3,
    name: 'Ayam Bakar Haji Gepeng',
    distance: 3,
    price: 40000,
    rating: {
      star: 4.5,
      review: 44,
    },
    image:
      'https://images.unsplash.com/photo-1578874557108-9fc2cfb1121e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80',
  },
  {
    id: 4,
    name: 'Pentol Bakar Italia',
    distance: 8,
    price: 5000,
    rating: {
      star: 4.5,
      review: 690,
    },
    image:
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=333&q=80',
  },
  {
    id: 5,
    name: 'Krabby Patty Deluxe',
    distance: 20,
    price: 20000,
    rating: {
      star: 5,
      review: 20,
    },
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=602&q=80',
  },
];

export default recommendations;
