import React from 'react';
import {Box, IBoxProps} from 'native-base';

const Separator: React.FC<IBoxProps> = ({bg, height = 10, my, ...rest}) => {
  return <Box my={my} bg={bg} height={height} {...rest} />;
};
export default Separator;
