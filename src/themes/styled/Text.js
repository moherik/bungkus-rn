import styled from 'styled-components';
import {color, space, typography, variant} from 'styled-system';
import {human} from 'react-native-typography';

const Text = styled.Text`
  ${typography}
  ${space}
  ${color}
  ${variant({
    variants: {
      ...human,
    },
  })}
  color: ${p => p.color || p.theme.colors.foreground}
`;

Text.defaultProps = {
  variant: 'body',
};

export default Text;
