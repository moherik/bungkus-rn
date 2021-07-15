import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, Heading, HStack, Icon, Image, Text, VStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {MenuItemLoader} from './Loader';

import {MenuType} from 'models/menu/type';
import {Rating} from 'components';
import currencyFormat from 'utils/currencyFormat';

const IMAGE_WIDTH = 120;
const IMAGE_HEIGHT = 120;

type Props = {
  data: MenuType[];
  label?: string;
  loading: boolean;
  imageWidth?: number;
  imageHeight?: number;
  showModal: (id: number | string) => void;
};

export const Menu: React.FC<Props> = ({
  data,
  label,
  loading,
  imageWidth,
  imageHeight,
  showModal,
}) => {
  const renderItem = (item: MenuType) => {
    return (
      <TouchableOpacity key={item.id} onPress={() => showModal(item.id)}>
        <HStack space={4}>
          <Image
            borderRadius={6}
            width={imageWidth || IMAGE_WIDTH}
            height={imageHeight || IMAGE_HEIGHT}
            source={{uri: item.image}}
            alt={item.name}
          />
          <VStack flex={1} space={1}>
            <Heading size="sm" isTruncated>
              {item.name}
            </Heading>
            <Text fontSize="sm" fontWeight="700">
              {currencyFormat(item.price)}
            </Text>
            <Rating
              isSmall
              iconColor="yellow.400"
              stars={item.rating.star}
              reviews={item.rating.review}
              shouldShowReviewsText={true}
            />
            <VStack space={1}>
              <HStack space={1} alignItems="center">
                <Icon as={<Ionicons name="bicycle-outline" />} size={4} />
                <Text fontSize="xs">{item.distance} km</Text>
              </HStack>
            </VStack>
          </VStack>
        </HStack>
      </TouchableOpacity>
    );
  };

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
    <VStack mx={4} space={5} pb={4}>
      {label && (
        <HStack alignItems="center">
          <Heading size="md">{label}</Heading>
        </HStack>
      )}
      {data.map(item => renderItem(item))}
    </VStack>
  );
};
