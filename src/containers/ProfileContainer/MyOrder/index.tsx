import React from 'react';
import {AppBar} from 'components';
import {MyOrderScreenProps} from 'navigation/ProfileStack';

type Props = {} & MyOrderScreenProps;

const MyOrder: React.FC<Props> = () => {
  return <AppBar title="Pesanan Saya" />;
};

export default MyOrder;
