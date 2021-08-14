import React from 'react';
import {Box, IBoxProps} from 'native-base';

const Separator: React.FC<IBoxProps> = ({
  bg,
  children,
  height = 10,
  my,
  ...rest
}) => {
  return (
    <Box my={my} bg={bg} height={height} {...rest}>
      {children}
    </Box>
  );
};
export default Separator;
