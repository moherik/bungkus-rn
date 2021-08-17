import React from 'react';
import {Text} from 'native-base';
import {FeedScreenProps} from 'navigation/FeedStack';

type Props = {} & FeedScreenProps;

const Feed: React.FC<Props> = ({}) => {
  return <Text>Hello Feed</Text>;
};

export default Feed;
