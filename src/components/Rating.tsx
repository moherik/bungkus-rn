import React, {Fragment} from 'react';
import {Text, Icon, HStack} from 'native-base';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MAX_GRADE = 5;

type StarProps = {
  stars: number;
  iconColor?: string;
  iconSize: number;
  isSingleStar?: boolean;
};

const getStars = ({stars, iconColor, iconSize}: StarProps): Array<Object> => {
  const quantityEmptyStars = MAX_GRADE - Math.ceil(stars);
  const starsFromGrade = [];

  const FullStar = (
    <Icon as={<MIcons name="star" />} size={iconSize} color={iconColor} />
  );

  const HalfStar = (
    <Icon
      as={<MIcons name="star-half-full" />}
      size={iconSize}
      color={iconColor}
    />
  );

  const EmptyStar = (
    <Icon
      as={<MIcons name="star-outline" />}
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

const renderStars = ({
  stars,
  iconColor,
  iconSize,
  isSingleStar,
}: StarProps): Object => {
  const starsFromGrade = getStars({stars, iconColor, iconSize});

  if (isSingleStar) {
    return (
      <Icon as={<MIcons name="star" />} size={iconSize} color={iconColor} />
    );
  }

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
  textSize?: string | number;
  iconColor?: string;
  iconSize?: number;
  isSmall?: boolean;
  isSingleStar?: boolean;
  reviews?: number;
  stars: number;
};

const Rating = ({
  shouldShowReviewsText = false,
  iconColor,
  iconSize,
  textColor,
  textSize,
  isSingleStar = false,
  isSmall = false,
  reviews,
  stars,
}: RatingProps) => {
  const _iconSize = iconSize ? iconSize : isSmall ? 4 : 5;
  const _textSize = textSize ? textSize : isSmall ? 'xs' : 'sm';

  return (
    <HStack flexGrow={1} alignItems="center" space={isSingleStar ? 1 : 2}>
      {renderStars({stars, iconColor, iconSize: _iconSize, isSingleStar})}
      {shouldShowReviewsText && !!reviews && (
        <Text
          isTruncated
          flex={1}
          fontSize={_textSize as any}
          color={textColor}>
          {isSingleStar ? `${stars} (${reviews})` : `${reviews}`}
        </Text>
      )}
    </HStack>
  );
};

export default Rating;
