import React from 'react';
import {AppBar} from 'components';
import {HelpScreenProps} from 'navigation/ProfileStack';

type Props = {} & HelpScreenProps;

const Help: React.FC<Props> = () => {
  return <AppBar title="Bantuan" />;
};

export default Help;
