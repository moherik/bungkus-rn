import React from 'react';
import {Box, Text, TouchableOpacity, Image} from '../../themes/styled';

import {MenuItemLoader} from './Loader';

import {Rating} from '../../components';
import {useStyled} from '../../hooks';
import {currencyFormat} from '../../utils';

const IMAGE_WIDTH = 120;
const IMAGE_HEIGHT = 120;

export const Menu = ({data, label, loading, imageWidth, imageHeight}) => {
  const theme = useStyled();

  const renderItem = item => {
    return (
      <TouchableOpacity key={item.id} onPress={() => {}}>
        <Box flexDirection="row" mx={theme.space.m} my={theme.space.m - 2}>
          <Image
            width={imageWidth || IMAGE_WIDTH}
            height={imageHeight || IMAGE_HEIGHT}
            borderRadius={theme.radius.m}
            source={{uri: item.image}}
          />
          <Box ml={theme.space.m}>
            <Text
              variant="headline"
              color={theme.colors.foreground}
              numberOfLines={1}>
              {item.name}
            </Text>
            <Rating
              stars={item.rating.number}
              reviews={item.rating.total}
              iconColor={theme.colors.primary}
              textColor={theme.colors.foreground}
              shouldShowReviewsText={true}
            />
            <Text variant="subhead" my={theme.space.s} numberOfLines={1}>
              {currencyFormat(item.price)}
            </Text>
            <Text variant="caption1" color={theme.colors.foreground}>
              {item.distance} km dari anda
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <Box my={theme.space.m}>
      {loading ? (
        [...Array(2)].map((val, i) => (
          <Box mx={theme.space.m} key={i}>
            <MenuItemLoader />
          </Box>
        ))
      ) : (
        <>
          {label && (
            <Box
              mx={theme.space.m}
              my={theme.space.s}
              flexDirection="row"
              alignItems="center">
              <Text variant="title3">{label}</Text>
            </Box>
          )}
          {data.map(item => renderItem(item))}
        </>
      )}
    </Box>
  );
};
