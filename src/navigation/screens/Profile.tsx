import React from 'react';
import {Box, Text} from 'native-base';
import {useAppDispatch, useAppSelector} from 'hooks';
import {Button} from 'components';
import {signOut} from 'stores/auth.store';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <Box>
      <Text>{user?.name}</Text>
      <Button onPress={handleLogout}>Logout</Button>
    </Box>
  );
};

export default ProfileScreen;
