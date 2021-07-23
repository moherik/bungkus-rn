import React from 'react';
import {VStack, Heading, HStack, Image, Text, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Rating, Separator} from 'components';
import {MerchantType} from 'models/merchantType';

const IMAGE_HEIGHT = 240;

type Props = {merchant: MerchantType};

export const Header = ({merchant}: Props) => {
  return (
    <VStack>
      <Image
        source={{uri: merchant.profileImage}}
        alt={merchant.name}
        width={'100%'}
        height={IMAGE_HEIGHT}
      />
      <VStack space={2} px={4} pt={2}>
        <Heading size="lg">{merchant.name}</Heading>
        <VStack space={1}>
          <Text fontSize="sm" color="gray.600">
            {merchant.address}
          </Text>
          <HStack space={2}>
            <HStack space={1} alignItems="center">
              <Icon as={<Ionicons name="bicycle-outline" />} size={4} />
              <Text fontSize="sm">{merchant.distance} km</Text>
            </HStack>
            <Rating
              stars={merchant.rating.stars}
              reviews={merchant.rating.review}
              shouldShowReviewsText={true}
              iconColor="yellow.500"
              isSmall
              isSingleStar
              textSize="sm"
            />
          </HStack>
          <Separator height={2} />
          <Heading size="xs">Jam Buka</Heading>
          {merchant.open.map((open, index) => (
            <HStack width="200px" justifyContent="space-between" key={index}>
              <Text fontSize="sm" color="gray.600">
                {open.day}
              </Text>
              <Text fontSize="sm" color="gray.600">
                : {open.time}
              </Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
      <Separator height={4} bg="gray.100" my={4} />
    </VStack>
  );
};