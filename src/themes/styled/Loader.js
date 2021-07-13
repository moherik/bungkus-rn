import ContentLoader from 'react-content-loader';
import styled from 'styled-components';
import {border, color, layout, space} from 'styled-system';

const Loader = styled(ContentLoader)`
  ${layout}
  ${color}
  ${space}
  ${border}
`;

export default Loader;
