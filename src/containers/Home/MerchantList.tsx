import React from 'react';
import {Box, Heading, HStack, Icon, Image, Text, VStack} from 'native-base';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Merchant} from 'models/merchant.model';
import {HomeScreenNavigationProps} from 'navigation/types';
import {Rating, Ripple} from 'components';
import {selectMerchant} from 'stores/merchant.store';
import {useAppDispatch} from 'hooks';

import {MenuItemLoader} from './Loader';

type Props = {
  data: Merchant[];
  label?: string;
  labelColor?: string;
  loading: boolean;
  navigation: HomeScreenNavigationProps;
};

export const MerchantList: React.FC<Props> = ({
  data,
  label,
  labelColor = 'red.600',
  loading,
  navigation,
}) => {
  const dispatch = useAppDispatch();

  const imageWidth = 75;
  const imageHeight = 75;

  const handleOpenMerchant = (id: number) => {
    dispatch(selectMerchant(id));

    navigation.navigate('Detail', {merchantId: id});
  };

  const renderItem = ({item, key}: {item: Merchant; key: number}) => {
    return (
      <Box flex={1} flexDirection="column" key={key}>
        <Ripple key={item.id} onPress={() => handleOpenMerchant(item.id)}>
          <HStack space={4} px={4} py={2}>
            <Image
              borderRadius={6}
              width={imageWidth}
              height={imageHeight}
              source={{uri: item.profileImage}}
              alt={item.name}
            />
            <VStack flex={1} space={2}>
              <Heading size="sm" mt={1} isTruncated>
                {item.name}
              </Heading>
              <HStack space={2} mb={2}>
                <HStack space={1} alignItems="center">
                  <Icon as={<MIcons name="walk" />} size={4} />
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
          </HStack>
        </Ripple>
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
    <VStack space={2} pb={4}>
      {label && (
        <HStack alignItems="center" mx={4}>
          <Heading size="md" color={labelColor}>
            {label}
          </Heading>
        </HStack>
      )}
      <VStack>{data.map((item, key) => renderItem({item, key}))}</VStack>
    </VStack>
  );
};
