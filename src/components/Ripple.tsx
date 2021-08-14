import React from 'react';
import {Box, IBoxProps, Pressable, View} from 'native-base';

type Props = {
  bg?: string;
  rippleBg?: string;
  onPress: () => void;
} & IBoxProps;

const IconButton: React.FC<Props> = ({
  onPress,
  bg = 'transparent',
  rippleBg = '#ccc',
  children,
  borderRadius,
  m,
  mx,
  my,
  mt,
  mb,
  ml,
  mr,
  ...rest
}) => {
  return (
    <View m={m} mx={mx} my={my} mt={mt} mb={mb} ml={ml} mr={mr}>
      <Box {...rest} borderRadius={borderRadius} overflow="hidden">
        <Pressable
          bg={bg}
          onPress={onPress}
          android_ripple={{color: rippleBg, borderless: false}}>
          {children}
        </Pressable>
      </Box>
    </View>
  );
};

export default IconButton;
