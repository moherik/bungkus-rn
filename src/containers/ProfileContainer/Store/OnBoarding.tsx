import React from 'react';
import {Text, View} from 'native-base';

import {Button} from 'components';
import {useAppDispatch} from 'hooks';
import {setStoreOnBoarding} from 'stores/merchant.store';

type Props = {};

export const OnBoarding: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();

  const onDoneOnBoarding = () => {
    dispatch(setStoreOnBoarding(false));
  };

  return (
    <View p={4}>
      <Text>OnBoarding Here</Text>
      <Button onPress={onDoneOnBoarding} py={2} borderRadius="lg">
        Mulai
      </Button>
    </View>
  );
};
