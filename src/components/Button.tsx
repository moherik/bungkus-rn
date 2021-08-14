import React from 'react';
import {IBoxProps, ITextProps, Pressable, Text, View} from 'native-base';

type Props = {
  disabled?: boolean;
  bg?: string;
  rippleBg?: string;
  disabledBg?: string;
  color?: string;
  onPress: () => void;
} & IBoxProps &
  ITextProps;

const Button: React.FC<Props> = ({
  disabled = false,
  bg = 'red.600',
  disabledBg = 'red.400',
  rippleBg = '#ccc',
  color = 'white',
  textTransform = 'none',
  fontWeight = 'bold',
  borderRadius,
  onPress,
  children,
  m,
  mt,
  mb,
  mx,
  my,
  ml,
  mr,
  ...rest
}) => {
  return (
    <View m={m} mt={mt} mx={mx} my={my} mb={mb} mr={mr} ml={ml}>
      <View borderRadius={borderRadius} overflow="hidden">
        <Pressable
          bg={disabled ? disabledBg : bg}
          android_ripple={{color: rippleBg, borderless: false}}
          onPress={onPress}
          disabled={disabled}
          {...rest}>
          <Text
            color={color}
            fontWeight={fontWeight}
            textTransform={textTransform}
            textAlign="center">
            {children}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Button;
