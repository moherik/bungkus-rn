import React from 'react';
import {AppBar} from 'components';
import {StoreScreenProps} from 'navigation/ProfileStack';

type Props = {} & StoreScreenProps;

const Store: React.FC<Props> = () => {
  return <AppBar title="Toko Saya" />;
};

export default Store;
