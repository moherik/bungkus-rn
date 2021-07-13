import React from 'react';
import {Ionicons} from '../../components';
import {useStyled} from '../../hooks';
import {Box, TextInput} from '../../themes/styled';

export const SearchBox = ({placeholder, ...rest}) => {
  const theme = useStyled();

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      px={theme.space.m}
      mt={2}
      mb={theme.space.s}
      mx={theme.space.m}
      bg={theme.colors.gray}
      borderRadius={theme.radius.m}>
      <Ionicons name="search" size={20} />
      <TextInput ml={theme.space.s} placeholder={placeholder} fontSize={16} />
    </Box>
  );
};
