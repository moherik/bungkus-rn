import {Center, IBoxProps, ITextProps, Text} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';

type Props = {
  disabled?: boolean;
  bg?: string;
  disabledBg?: string;
  color?: string;
  onPress: () => void;
} & IBoxProps &
  ITextProps;

const Button: React.FC<Props> = ({
  disabled = false,
  bg = 'red.600',
  disabledBg = 'red.400',
  color = 'white',
  textTransform = 'uppercase',
  onPress,
  children,
  borderRadius,
  ...rest
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Center
        bg={!disabled ? bg : disabledBg}
        {...rest}
        borderRadius={borderRadius}>
        <Text color={color} fontWeight={700} textTransform={textTransform}>
          {children}
        </Text>
      </Center>
    </TouchableOpacity>
  );
};

export default Button;
