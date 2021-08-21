import React from 'react';
import {AppBar} from 'components';
import {CartScreenProps} from 'navigation/ProfileStack';

type Props = {} & CartScreenProps;

const Cart: React.FC<Props> = () => {
  return <AppBar title="Keranjang" />;
};

export default Cart;
