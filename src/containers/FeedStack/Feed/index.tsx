import React from 'react';
import {AppBar} from 'components';
import {FeedScreenProps} from 'navigation/FeedStack';

type Props = {} & FeedScreenProps;

const Feed: React.FC<Props> = ({}) => {
  return <AppBar title="Feed" showBack={false} />;
};

export default Feed;
