import React from 'react';
import {Box, Heading, HStack, VStack} from 'native-base';

import {Merchant} from 'models/merchant.model';
import {MerchantListItem} from 'containers';

import {MenuItemLoader} from './Loader';

type Props = {
  data: Merchant[];
  label?: string;
  labelColor?: string;
  loading: boolean;
};

export const MerchantList: React.FC<Props> = ({
  data,
  label,
  labelColor = 'red.600',
  loading,
}) => {
  if (loading) {
    return (
      <>
        {[...Array(2)].map((_val, i) => (
          <Box key={i} mx={4}>
            <MenuItemLoader />
          </Box>
        ))}
      </>
    );
  }

  return (
    <VStack space={2} pb={4}>
      {label && (
        <HStack alignItems="center" mx={4}>
          <Heading size="md" color={labelColor}>
            {label}
          </Heading>
        </HStack>
      )}
      <VStack>
        {data.map((item, index) => (
          <MerchantListItem item={item} key={index} />
        ))}
      </VStack>
    </VStack>
  );
};
