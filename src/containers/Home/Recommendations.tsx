import React from 'react';
import {ListRenderItem, TouchableOpacity} from 'react-native';
import {
  FlatList,
  Box,
  Text,
  Icon,
  Image,
  ZStack,
  Heading,
  VStack,
  HStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Merchant} from 'models/merchant.model';
import {Rating} from 'components';

import {HorizontalSectionLoader} from './Loader';

const ITEM_WIDTH = 200;
const ITEM_HEIGHT = 200;

type Props = {
  data: Merchant[];
  label?: string;
  loading: boolean;
  itemWidth?: number;
  itemHeight?: number;
};

export const Recommendations: React.FC<Props> = ({
  data,
  label,
  loading,
  itemWidth,
  itemHeight,
}) => {
  const renderItem: ListRenderItem<Merchant> = ({item, index}) => {
    const width = itemWidth || ITEM_WIDTH;
    const height = itemHeight || ITEM_HEIGHT;

    return (
      <TouchableOpacity onPress={() => {}}>
        <ZStack
          width={width}
          height={height}
          ml={index === 0 ? 4 : 2}
          mr={index === data.length - 1 ? 4 : 2}
          borderRadius="xl"
          overflow="hidden">
          <Image
            source={{uri: item.profileImage}}
            alt={item.name}
            width={width}
            height={height}
          />

          <VStack
            justifyContent="flex-end"
            bg="#18191a61"
            width={width}
            height={height}>
            <VStack px={3} pb={2}>
              <Heading isTruncated color="white" size="sm">
                {item.name}
              </Heading>
              <Rating
                isSmall
                iconColor="yellow.500"
                textColor="white"
                stars={item.rating.stars}
                reviews={item.rating.review}
                shouldShowReviewsText={true}
              />
              <HStack space={1} mt={2} alignItems="center">
                <Icon as={<Ionicons name="bicycle" />} size={4} color="white" />
                <Text fontSize="sm" color="white" fontWeight="700">
                  {item.distance} km dari anda
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </ZStack>
      </TouchableOpacity>
    );
  };

  return (
    <Box>
      {loading ? (
        <Box mx={4} mt={4}>
          <HorizontalSectionLoader />
        </Box>
      ) : (
        <>
          {label && (
            <HStack alignItems="center" mt={4} mx={4}>
              <Heading size="md">{label}</Heading>
            </HStack>
          )}
          <FlatList
            mt={4}
            snapToInterval={itemWidth || ITEM_WIDTH}
            snapToAlignment="center"
            decelerationRate={0}
            data={data}
            renderItem={item => renderItem(item)}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
    </Box>
  );
};
