import React, {useMemo} from 'react';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useTheme} from 'native-base';

type Props = {
  onClose: () => void;
} & BottomSheetBackdropProps;

const CustomModalBackdrop = ({animatedIndex, style, onClose}: Props) => {
  const {colors} = useTheme();

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 0.4],
      [0, 0.4],
      Extrapolate.CLAMP,
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: colors.gray[900],
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle, colors],
  );

  return <Animated.View style={containerStyle} onTouchEnd={onClose} />;
};

export default CustomModalBackdrop;
