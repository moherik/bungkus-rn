import React from 'react';
import {Box} from '../themes/styled';
import {useStyled} from '../hooks';

const Separator = ({bg, height = 10, my}) => {
  const theme = useStyled();

  return <Box my={my} bg={bg || theme.colors.background} height={height} />;
};
export default Separator;
