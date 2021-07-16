import React, {forwardRef} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {
  Box,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import {Modalize} from 'react-native-modalize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Portal} from 'react-native-portalize';
import ContentLoader, {Rect} from 'react-content-loader/native';

import {currencyFormat} from 'utils';
import {Rating, Separator} from 'components';
import {useAppDispatch, useAppSelector} from 'hooks';

import {Variant} from './Variant';
import {clearSelectedMenu} from 'stores/menus';

const IMAGE_HEIGHT = 240;

const ItemLabel: React.FC<{icon: string}> = ({icon, children}) => (
  <HStack alignItems="center" space={3}>
    <Icon as={<Ionicons name={icon} />} size={5} />
    <Text fontSize="sm" isTruncated>
      {children}
    </Text>
  </HStack>
);

const Loader = () => (
  <ContentLoader
    speed={2}
    width={600}
    height={600}
    viewBox="0 0 600 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <Rect x="19" y="260" rx="0" ry="0" width="247" height="33" />
    <Rect x="21" y="307" rx="0" ry="0" width="127" height="25" />
    <Rect x="20" y="348" rx="0" ry="0" width="358" height="92" />
    <Rect x="22" y="457" rx="0" ry="0" width="179" height="25" />
    <Rect x="0" y="0" rx="0" ry="0" width="600" height="240" />
  </ContentLoader>
);

type Props = {
  closeModal: () => void;
};

const DetailModal = forwardRef<Modalize, Props>((props, ref) => {
  const menu = useAppSelector(state => state.menu.selectedMenu);
  const dispatch = useAppDispatch();

  const deviceHeight = Dimensions.get('window').height;

  const handleOnClose = () => {
    dispatch(clearSelectedMenu());
  };

  const headerComponent = () => (
    <HStack
      width={'100%'}
      alignItems="center"
      justifyContent="space-between"
      px={4}
      my={4}
      space={2}>
      <TouchableOpacity onPress={() => props.closeModal()}>
        <Icon as={<Ionicons name="arrow-back-outline" />} size={7} />
      </TouchableOpacity>

      <HStack reversed alignItems="center" space={4}>
        <TouchableOpacity onPress={() => {}}>
          <Icon as={<Ionicons name="heart-outline" />} size={7} />
        </TouchableOpacity>
        <Box bg="red.600" borderRadius={100} px={2} py={1}>
          <Text color="white" fontSize="xs" textTransform="uppercase">
            Diskon 50%
          </Text>
        </Box>
      </HStack>
    </HStack>
  );

  return (
    <Portal>
      <Modalize
        ref={ref}
        onClose={handleOnClose}
        HeaderComponent={headerComponent}
        snapPoint={(deviceHeight / 100) * 75}>
        {menu ? (
          <ScrollView bg="white" flex={1}>
            <VStack space={2}>
              <Image
                source={{uri: menu.image}}
                alt={menu.name}
                width={'100%'}
                height={IMAGE_HEIGHT}
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
                  <ItemLabel icon="location-outline">
                    {menu.user.address}
                  </ItemLabel>
                  <ItemLabel icon="time-outline">08:00 - 12:00</ItemLabel>
                </VStack>
                <Image
                  alt={menu.user.name}
                  source={{uri: menu.user.image}}
                  size="md"
                  borderRadius="lg"
                />
              </HStack>
              {menu.variants?.length!! > 0 && (
                <Variant variants={menu?.variants!!} />
              )}
              <Separator height={2} bg="gray.100" my={2} />
              <VStack mx={4}>
                <TextArea
                  textAlignVertical="top"
                  placeholder="Catatan tambahan"
                />
              </VStack>
            </VStack>
          </ScrollView>
        ) : (
          <Loader />
        )}
      </Modalize>
    </Portal>
  );
});

export default DetailModal;
