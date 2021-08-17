import React from 'react';
import {Image, Text, Box, HStack, VStack, Heading, Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Ripple, Rating} from 'components';
import {useAppDispatch} from 'hooks';

import {Merchant} from 'models/merchant.model';
import {selectMerchant} from 'stores/merchant.store';

type Props = {item: Merchant; key: number};

export const MerchantListItem: React.FC<Props> = ({item, key}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation() as any;

  const imageWidth = 75;
  const imageHeight = 75;

  const handleOpenMerchant = (id: number) => {
    dispatch(selectMerchant(id));

    navigation.navigate('Detail', {merchantId: id});
  };

  return (
    <Box flex={1} flexDirection="column" key={key}>
      <Ripple key={item.id} onPress={() => handleOpenMerchant(item.id)}>
        <HStack space={3} px={4} py={2}>
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
                <Icon as={<MIcons name="map-marker" />} size={4} />
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
