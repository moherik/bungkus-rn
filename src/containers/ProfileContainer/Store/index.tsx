import React from 'react';
import {ScrollView} from 'native-base';

import {AppBar} from 'components';
import {useAppSelector} from 'hooks';

import {OnBoarding} from './OnBoarding';
import {StoreList} from './StoreList';

type Props = {};

export interface IStore {
  name: string;
  location: string;
  imageUrl?: string;
  description?: string;
}

const stores: IStore[] = [];

const Store: React.FC<Props> = () => {
  const onBoarding = useAppSelector(state => state.merchant.onBoarding);

  return (
    <>
      <AppBar title="Toko Saya" />
      <ScrollView flex={1} bg="white">
        {onBoarding || stores.length <= 0 ? (
          <OnBoarding />
        ) : (
          <StoreList stores={stores} />
        )}
      </ScrollView>
    </>
  );
};

export default Store;
