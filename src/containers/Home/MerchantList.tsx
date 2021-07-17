import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {
  Box,
  FlatList,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {MenuItemLoader} from './Loader';

import {MerchantType} from 'models/merchantType';
import {Rating} from 'components';

type Props = {
  data: MerchantType[];
  label?: string;
  loading: boolean;
  showModal: (id: number | string) => void;
};

export const MerchantList: React.FC<Props> = ({
  data,
  label,
  loading,
  showModal,
}) => {
  const deviceWidth = Dimensions.get('window').width;
  const imageWidth = (deviceWidth / 100) * 45;
  const imageHeight = imageWidth - 50;

  const renderItem = (item: MerchantType) => {
    return (
      <Box flex={1} flexDirection="column" mx={2} mb={4}>
        <TouchableOpacity key={item.id} onPress={() => showModal(item.id)}>
          <VStack space={2}>
            <Image
              borderRadius={6}
              width={imageWidth}
              height={imageHeight}
              source={{uri: item.profileImage}}
              alt={item.name}
            />
            <VStack flex={1} space={1}>
              <Heading size="sm" isTruncated>
                {item.name}
              </Heading>
              <HStack space={2} mb={2}>
                <HStack space={1} alignItems="center">
                  <Icon as={<Ionicons name="bicycle-outline" />} size={4} />
                  <Text fontSize="xs">{item.distance} km</Text>
                </HStack>
                <Rating
                  stars={item.rating.stars}
                  reviews={item.rating.review}
                  shouldShowReviewsText={true}
                  iconColor="yellow.500"
                  isSmall
                  isSingleStar
                />
              </HStack>
            </VStack>
          </VStack>
        </TouchableOpacity>
      </Box>
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
    <VStack space={5} pb={4}>
      {label && (
        <HStack alignItems="center" mx={4}>
          <Heading size="md">{label}</Heading>
        </HStack>
      )}
      <Box mx={2}>
        <FlatList
          scrollEnabled={false}
          data={data}
          renderItem={({item}) => renderItem(item)}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      </Box>
    </VStack>
  );
};
