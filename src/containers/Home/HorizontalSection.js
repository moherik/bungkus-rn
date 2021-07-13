import React from 'react';
import {FlatList} from 'react-native';
import {
  Box,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollBox,
} from '../../themes/styled';
import {Ionicons, Rating} from '../../components';
import {currencyFormat} from '../../utils';
import {useStyled} from '../../hooks';
import {HeadingLoader, HorizontalSectionLoader} from './Loader';

const ITEM_WIDTH = 200;
const ITEM_HEIGHT = 200;

export const HorizontalSection = ({
  data,
  label,
  loading,
  itemWidth,
  itemHeight,
}) => {
  const theme = useStyled();

  const renderItem = ({item, length, index}) => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <ImageBackground
          flexDirection="column"
          width={itemWidth || ITEM_WIDTH}
          height={itemHeight || ITEM_HEIGHT}
          borderRadius={theme.radius.m}
          source={{uri: item.image}}
          ml={index === 0 ? theme.space.m : theme.space.s}
          mr={index === length ? theme.space.m : theme.space.s}>
          <Box
            bg="#00000030"
            py={theme.space.s}
            flex={1}
            borderRadius={theme.radius.m}
            justifyContent="space-between">
            <Box alignItems="flex-end" mr={theme.space.s}>
              <Box
                bg={theme.colors.warning}
                px={theme.space.s}
                py={5}
                borderRadius={theme.radius.full}>
                <Text variant="caption1" color={theme.colors.light}>
                  {currencyFormat(item.price)}
                </Text>
              </Box>
            </Box>
            <Box px={theme.space.m}>
              <Text
                variant="headline"
                color={theme.colors.light}
                numberOfLines={1}>
                {item.name}
              </Text>
              <Rating
                stars={item.rating.number}
                reviews={item.rating.total}
                iconColor={theme.colors.warning}
                textColor={theme.colors.light}
                shouldShowReviewsText={true}
              />
              <Box flexDirection="row" alignItems="center" mt={theme.space.s}>
                <Ionicons
                  size={16}
                  name="location"
                  color={theme.colors.light}
                />
                <Text
                  variant="caption1"
                  ml={theme.space.s}
                  color={theme.colors.light}>
                  {item.distance} km dari anda
                </Text>
              </Box>
            </Box>
          </Box>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <Box my={theme.space.m}>
      {loading ? (
        <Box mx={theme.space.m} pt={theme.space.m}>
          <HorizontalSectionLoader />
        </Box>
      ) : (
        <>
          {label && (
            <Box
              mx={theme.space.m}
              my={theme.space.m}
              flexDirection="row"
              alignItems="center">
              <Text variant="title2">{label}</Text>
            </Box>
          )}
          <FlatList
            snapToInterval={itemWidth || ITEM_WIDTH}
            snapToAlignment="center"
            decelerationRate={0}
            data={data}
            renderItem={({item, index}) =>
              renderItem({
                item,
                length: data.length - 1,
                index,
              })
            }
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
    </Box>
  );
};
