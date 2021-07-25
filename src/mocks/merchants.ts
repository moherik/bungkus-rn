import {Merchant} from 'models/merchant.model';

const merchants: Merchant[] = [
  {
    id: 1,
    name: 'Mie Ayam Spesial',
    address: 'Jl. Raya Veteran No.69',
    latlong: '782742478,2489892',
    distance: 20,
    rating: {
      stars: 4,
      review: 20,
    },
    open: [{day: 'Setiap Hari', time: '16:00 - 22:00'}],
    categories: [{id: 1, name: 'Mie'}],
    profileImage:
      'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  },
  {
    id: 2,
    name: 'Krabby Patty',
    address: 'Rock Bottom, Bikini Bottom',
    latlong: '782742478,2489892',
    distance: 100,
    rating: {
      stars: 4.5,
      review: 30,
    },
    open: [
      {day: 'Senin - Sabtu', time: '16:00 - 22:00'},
      {day: 'Minggu', time: '14:00 - 20:00'},
    ],
    categories: [{id: 1, name: 'Mie'}],
    profileImage:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=602&q=80',
  },
];

export default merchants;
