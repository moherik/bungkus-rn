import styled from 'styled-components';
import {color, layout, space} from 'styled-system';

const Container = styled.SafeAreaView`
  background: ${props => props.theme.colors.background};
  ${layout}
  ${space}
  ${color}
`;

export default Container;
