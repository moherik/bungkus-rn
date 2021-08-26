import React from 'react';
import {ListRenderItem} from 'react-native';
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
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Merchant} from 'models/merchant.model';
import {Rating, Ripple} from 'components';

import {HorizontalSectionLoader} from './Loader';

const ITEM_WIDTH = 160;
const ITEM_HEIGHT = 160;

type Props = {
  data: Merchant[];
  label?: string;
  labelColor?: string;
  loading: boolean;
  itemWidth?: number;
  itemHeight?: number;
};

export const Recommendations: React.FC<Props> = ({
  data,
  label,
  labelColor = 'red.600',
  loading,
  itemWidth,
  itemHeight,
}) => {
  const renderItem: ListRenderItem<Merchant> = ({item, index}) => {
    const width = itemWidth || ITEM_WIDTH;
    const height = itemHeight || ITEM_HEIGHT;

    return (
      <Box ml={index === 0 ? 4 : 2} mr={index === data.length - 1 ? 4 : 2}>
        <Ripple borderRadius="lg" onPress={() => {}}>
          <ZStack width={width} height={height}>
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
              <VStack space={1} px={3} pb={2}>
                <Heading isTruncated color="white" size="sm">
                  {item.name}
                </Heading>
                <HStack alignItems="center" space={2}>
                  <HStack space={1} alignItems="center">
                    <Icon
                      as={<MIcons name="map-marker" />}
                      size={4}
                      color="white"
                    />
                    <Text fontSize="sm" color="white" isTruncated>
                      {item.distance}km
                    </Text>
                  </HStack>
                  <Rating
                    isSmall
                    iconColor="yellow.500"
                    textColor="white"
                    stars={item.rating.stars}
                    reviews={item.rating.review}
                    shouldShowReviewsText={true}
                    isSingleStar
                  />
                </HStack>
              </VStack>
            </VStack>
          </ZStack>
        </Ripple>
      </Box>
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
              <Heading size="md" color={labelColor}>
                {label}
              </Heading>
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
