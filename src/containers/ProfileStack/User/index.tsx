import React from 'react';
import {AppBar} from 'components';
import {UserScreenProps} from 'navigation/ProfileStack';

type Props = {} & UserScreenProps;

const User: React.FC<Props> = () => {
  return <AppBar title="Pengaturan User" />;
};

export default User;
