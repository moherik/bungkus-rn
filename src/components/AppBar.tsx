import React from 'react';
import {Box, Heading, HStack, IBoxProps, Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Ripple} from 'components';

type Props = {
  title?: string;
  rightComp?: JSX.Element | null;
} & IBoxProps;

const AppBar: React.FC<Props> = ({title, rightComp, children, ...rest}) => {
  const navigation = useNavigation();

  return (
    <HStack
      bg="white"
      alignItems="center"
      justifyContent="space-between"
      shadow={2}
      space={2}
      overflow="hidden"
      {...rest}>
      <HStack alignItems="center">
        <Ripple onPress={() => navigation.goBack()}>
          <Box p={3}>
            <Icon as={<MIcons name="arrow-left" />} size={6} />
          </Box>
        </Ripple>
        {children ? (
          children
        ) : (
          <Heading size="md" isTruncated>
            {title}
          </Heading>
        )}
      </HStack>
      {rightComp}
    </HStack>
  );
};

export default AppBar;
