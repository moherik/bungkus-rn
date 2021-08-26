import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  Text,
  VStack,
  HStack,
  useDisclose,
  Actionsheet,
  ScrollView,
  Image,
} from 'native-base';

import {MerchantCategory} from 'models/merchant.model';
import {Ripple} from 'components';
import {SharedElement} from 'react-navigation-shared-element';
import {useNavigation} from '@react-navigation/native';

type Props = {
  data: MerchantCategory[];
};

const width = Dimensions.get('window').width;

export const Category: React.FC<Props> = ({data}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const navigation = useNavigation();

  const handleOnClick = (category: MerchantCategory) => {
    if (category.id === -1) {
      onOpen();
    } else {
      onClose();
      navigation.navigate('Category', {category});
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: MerchantCategory;
    index: number;
  }) => (
    <Ripple onPress={() => handleOnClick(item)} borderRadius="lg" key={index}>
      <VStack
        alignItems="center"
        justifyContent="center"
        style={styles.box}
        py={3}>
        <SharedElement id={`item.${item.id}.image`}>
          <Image
            source={{uri: item.image}}
            alt={item.name}
            width={50}
            height={50}
            borderRadius={100}
          />
        </SharedElement>
        <Text fontSize="xs" textAlign="center" color="muted.500" mt={1}>
          {item.name}
        </Text>
      </VStack>
    </Ripple>
  );

  return (
    <>
      <HStack px={4} py={2} flexWrap="wrap">
        {data
          .filter((_item, idx) => idx < 7)
          .map((item, index) => renderItem({item, index}))}

        {renderItem({
          item: {
            id: -1,
            name: 'Lihat semua',
            image:
              'https://cdn0-production-images-kly.akamaized.net/kutsJcqqYV0-9pDI3l6YEl2v7xQ=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1367799/original/048059200_1475843806-Masakan_Indonesia.jpg',
          },
          index: -1,
        })}
      </HStack>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <ScrollView width={'100%'} showsVerticalScrollIndicator={false}>
            {data.map((item, index) => (
              <Ripple
                borderRadius="lg"
                onPress={() => handleOnClick(item)}
                key={index}>
                <HStack alignItems="center" space={4} p={2}>
                  <Image
                    borderRadius="lg"
                    source={{uri: item.image}}
                    alt={item.name}
                    width={10}
                    height={10}
                  />
                  <Text>{item.name}</Text>
                </HStack>
              </Ripple>
            ))}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    width: width / 4 - 8,
  },
});
