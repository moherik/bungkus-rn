import {useContext} from 'react';
import {ThemeContext} from 'styled-components';

const useStyled = () => useContext(ThemeContext);
export default useStyled;
