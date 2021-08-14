import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Text, VStack, HStack, Avatar} from 'native-base';

import {MerchantCategory} from 'models/merchant.model';
import {Ripple} from 'components';

type Props = {
  data: MerchantCategory[];
};

const width = Dimensions.get('window').width;

export const Category: React.FC<Props> = ({data}) => {
  return (
    <HStack px={4} py={2} flexWrap="wrap">
      {data.map((item, index) => (
        <Ripple onPress={() => {}} borderRadius="lg" key={index}>
          <VStack
            alignItems="center"
            justifyContent="center"
            style={styles.box}
            py={3}>
            <Avatar source={{uri: item.image}} bgColor="red.600" />
            <Text fontSize="xs" textAlign="center" mt={1}>
              {item.name}
            </Text>
          </VStack>
        </Ripple>
      ))}
    </HStack>
  );
};

const styles = StyleSheet.create({
  box: {
    width: width / 4 - 8,
  },
});
