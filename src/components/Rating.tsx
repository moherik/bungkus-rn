import React, {Fragment} from 'react';
import {Text, Icon, HStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MAX_GRADE = 5;

type StarProps = {
  stars: number;
  iconColor?: string;
  isSmall?: boolean;
};

const getStars = ({stars, iconColor, isSmall}: StarProps): Array<Object> => {
  const quantityEmptyStars = MAX_GRADE - Math.ceil(stars);
  const starsFromGrade = [];

  const iconSize = isSmall ? 4 : 5;

  const FullStar = (
    <Icon as={<Ionicons name="star" />} size={iconSize} color={iconColor} />
  );

  const HalfStar = (
    <Icon
      as={<Ionicons name="star-half" />}
      size={iconSize}
      color={iconColor}
    />
  );

  const EmptyStar = (
    <Icon
      as={<Ionicons name="star-outline" />}
      size={iconSize}
      color={iconColor}
    />
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

const renderStars = ({stars, iconColor, isSmall}: StarProps): Object => {
  const starsFromGrade = getStars({stars, iconColor, isSmall});

  return (
    <HStack space={1}>
      {starsFromGrade.map(star => (
        <Fragment key={Math.random()}>{star}</Fragment>
      ))}
    </HStack>
  );
};

type RatingProps = {
  shouldShowReviewsText?: boolean;
  textColor?: string;
  iconColor?: string;
  isSmall?: boolean;
  reviews?: number;
  stars: number;
};

const Rating = ({
  shouldShowReviewsText = false,
  iconColor,
  textColor,
  isSmall = false,
  reviews,
  stars,
}: RatingProps) => {
  return (
    <HStack alignItems="center" space={2}>
      {renderStars({stars, iconColor, isSmall})}
      {shouldShowReviewsText && !!reviews && (
        <Text
          isTruncated
          flex={1}
          fontSize={!isSmall ? 'md' : 'sm'}
          color={textColor}>
          ({reviews})
        </Text>
      )}
    </HStack>
  );
};

export default Rating;
