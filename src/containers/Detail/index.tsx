import React, {useEffect, useState} from 'react';
import {
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Spinner,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {currencyFormat} from 'utils';
import {Rating, Separator} from 'components';
import {MenuType} from 'models/menu/type';
import {DetailScreenProps} from 'navigation/types';
import {useAppSelector} from 'hooks';

import {HeaderModal} from './HeaderModal';
import {Variant} from './Variant';

const IMAGE_HEIGHT = 240;

const ItemLabel: React.FC<{icon: string}> = ({icon, children}) => (
  <HStack alignItems="center" space={3}>
    <Icon as={<Ionicons name={icon} />} size={5} />
    <Text fontSize="sm" isTruncated>
      {children}
    </Text>
  </HStack>
);

const Detail = ({navigation, route}: DetailScreenProps) => {
  const {menuId} = route.params;
  const menus = useAppSelector(state => state.menu.menus);
  const [menu, setMenu] = useState<MenuType>();

  useEffect(() => {
    const selectedMenu = menus.filter(_menu => _menu.id === menuId)[0];
    setMenu(selectedMenu);

    return () => {
      setMenu(undefined);
    };
  }, [menus, menuId]);

  const handleCloseModal = () => navigation.goBack();

  return menu ? (
    <ScrollView bg="white" flex={1}>
      <VStack space={2}>
        <HeaderModal
          height={IMAGE_HEIGHT}
          menu={menu}
          closeModal={handleCloseModal}
        />
        <VStack flex={1} space={2} px={4} pt={2}>
          <Heading size="lg">{menu.name}</Heading>
          <Text fontSize="lg" fontWeight="700">
            {currencyFormat(menu.price)}
          </Text>
          {menu.description && (
            <Text fontSize="sm" lineHeight={6}>
              {menu.description}
            </Text>
          )}
          <Rating
            iconColor="yellow.400"
            stars={menu.rating.star}
            reviews={menu.rating.review}
            shouldShowReviewsText={true}
          />
        </VStack>
        <Separator height={2} bg="gray.100" my={2} />
        <HStack px={4} space={4} justifyContent="space-between">
          <VStack space={2} flex={1}>
            <ItemLabel icon="person-outline">{menu.user.name}</ItemLabel>
            <ItemLabel icon="location-outline">{menu.user.address}</ItemLabel>
            <ItemLabel icon="time-outline">08:00 - 12:00</ItemLabel>
          </VStack>
          <Image
            alt={menu.user.name}
            source={{uri: menu.user.image}}
            size="md"
            borderRadius="lg"
          />
        </HStack>
        {menu.variants?.length!! > 0 && <Variant variants={menu?.variants!!} />}
        <Separator height={2} bg="gray.100" my={2} />
        <VStack mx={4}>
          <TextArea textAlignVertical="top" placeholder="Catatan tambahan" />
        </VStack>
      </VStack>
    </ScrollView>
  ) : (
    <Center flex={1} bg="white">
      <Spinner accessibilityLabel="Loading detail" />
    </Center>
  );
};

export default Detail;
