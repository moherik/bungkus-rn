import React from 'react';
import {AppBar} from 'components';
import {SettingScreenProps} from 'navigation/ProfileStack';

type Props = {} & SettingScreenProps;

const Setting: React.FC<Props> = () => {
  return <AppBar title="Pengaturan" />;
};

export default Setting;
