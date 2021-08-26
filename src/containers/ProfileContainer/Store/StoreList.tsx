import React from 'react';
import {Heading, HStack, Text, VStack} from 'native-base';

import {Ripple} from 'components';

import {IStore} from './index';

type Props = {
  stores: IStore[];
};

export const StoreList: React.FC<Props> = ({stores}) => {
  return (
    <HStack>
      {stores.map((store, index) => (
        <Ripple onPress={() => {}} key={index}>
          <VStack>
            <Heading size="sm">{store.name}</Heading>
            <Text fontSize="sm">{store.location}</Text>
          </VStack>
        </Ripple>
      ))}
    </HStack>
  );
};
