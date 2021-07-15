import React from 'react';
import {ListRenderItem, TouchableOpacity} from 'react-native';
import {
  FlatList,
  Box,
  Text,
  Icon,
  Image,
  ZStack,
  Badge,
  Heading,
  VStack,
  HStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {RecommendationMenuType} from 'models/menu/type';
import {currencyFormat} from 'utils';
import {Rating} from 'components';

import {HorizontalSectionLoader} from './Loader';

const ITEM_WIDTH = 200;
const ITEM_HEIGHT = 200;

type Props = {
  data: RecommendationMenuType[];
  label?: string;
  loading: boolean;
  itemWidth?: number;
  itemHeight?: number;
  showModal: (id: number | string) => void;
};

export const Recommendations: React.FC<Props> = ({
  data,
  label,
  loading,
  itemWidth,
  itemHeight,
  showModal,
}) => {
  const renderItem: ListRenderItem<RecommendationMenuType> = ({
    item,
    index,
  }) => {
    const width = itemWidth || ITEM_WIDTH;
    const height = itemHeight || ITEM_HEIGHT;

    return (
      <TouchableOpacity onPress={() => showModal(item.id)}>
        <ZStack
          width={width}
          height={height}
          ml={index === 0 ? 4 : 2}
          mr={index === data.length - 1 ? 4 : 2}
          borderRadius="xl"
          overflow="hidden">
          <Image
            source={{uri: item.image}}
            alt={item.name}
            width={width}
            height={height}
          />

          <VStack
            justifyContent="space-between"
            bg="#18191a61"
            width={width}
            height={height}>
            <Box alignItems="flex-end" m={2}>
              <Badge bg="red.600" px={2} py={1} borderRadius={100}>
                <Text fontSize="xs" color="white" fontWeight="700">
                  {currencyFormat(item.price)}
                </Text>
              </Badge>
            </Box>
            <VStack px={3} pb={2}>
              <Heading isTruncated color="white" size="sm">
                {item.name}
              </Heading>
              <Rating
                isSmall
                iconColor="yellow.300"
                textColor="white"
                stars={item.rating.star}
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
