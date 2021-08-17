import React from 'react';
import {AppBar} from 'components';
import {FavoriteScreenProps} from 'navigation/ProfileStack';

type Props = {} & FavoriteScreenProps;

const Favorite: React.FC<Props> = () => {
  return <AppBar title="Menu Favorit" />;
};

export default Favorite;
