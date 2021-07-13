// @flow

import React, {Fragment} from 'react';
import {useStyled} from '../hooks';
import {Box, Text} from '../themes/styled';
import Ionicons from './Ionicons';

const MAX_GRADE = 5;

const getStars = ({
  stars,
  iconColor,
  isSmall,
}: {
  stars: number,
  iconColor: string,
  isSmall: boolean,
}): Array<Object> => {
  const quantityEmptyStars = MAX_GRADE - Math.ceil(stars);
  const starsFromGrade = [];

  const iconSize = isSmall ? 12 : 16;

  const FullStar = <Ionicons name="star" size={iconSize} color={iconColor} />;

  const HalfStar = (
    <Ionicons name="star-half" size={iconSize} color={iconColor} />
  );

  const EmptyStar = (
    <Ionicons name="star-outline" size={iconSize} color={iconColor} />
  );

  let currentStars = stars;

  if (currentStars >= MAX_GRADE) {
    for (let i = 0; i < MAX_GRADE; i++) {
      starsFromGrade.push(FullStar);
    }

    return starsFromGrade;
  }

  while (currentStars >= 1) {
    starsFromGrade.push(FullStar);
    currentStars--;
  }

  if (currentStars === 0.5) {
    starsFromGrade.push(HalfStar);
  }

  for (let i = 0; i < quantityEmptyStars; i++) {
    starsFromGrade.push(EmptyStar);
  }

  return starsFromGrade;
};

const renderStars = ({
  stars,
  iconColor,
  isSmall,
}: {
  stars: number,
  iconColor: string,
  isSmall: boolean,
}): Object => {
  const starsFromGrade = getStars({stars, iconColor, isSmall});

  return (
    <Box flexDirection="row">
      {starsFromGrade.map(star => (
        <Fragment key={Math.random()}>{star}</Fragment>
      ))}
    </Box>
  );
};

type Props = {
  shouldShowReviewsText: boolean,
  textColor: ?string,
  isSmall: boolean,
  reviews: ?number,
  stars: number,
};

const Rating = ({
  shouldShowReviewsText,
  iconColor,
  textColor,
  isSmall,
  reviews,
  stars,
  ...rest
}: Props) => {
  const theme = useStyled();

  return (
    <Box flexDirection="row" alignItems="center" {...rest}>
      {renderStars({stars, iconColor, isSmall})}
      {shouldShowReviewsText && !!reviews && (
        <Text
          numberOfLines={1}
          ml={theme.space.s}
          color={textColor}
          variant={isSmall ? 'caption2' : 'footnote'}>
          {`${reviews} ${reviews > 1 ? 'Reviews' : 'Review'}`}
        </Text>
      )}
    </Box>
  );
};

export default Rating;
