const colors = {
  dark: '#0a0a0a',
  light: '#fff',
  purple: '#5A31F4',
  orange: '#ff5722',
  gray: '#eeee',
};

export const theme = {
  colors: {
    background: colors.light,
    foreground: colors.dark,
    primary: colors.orange,
    warning: colors.orange,
    light: colors.light,
    gray: colors.gray,
  },
  space: {
    s: 8,
    m: 16,
    l: 28,
    xl: 48,
  },
  radius: {
    s: 4,
    m: 10,
    l: 20,
    full: 100,
  },
  navigation: {
    activeTintColor: colors.orange,
    inactiveTintColor: colors.dark,
    background: colors.light,
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    background: colors.dark,
    foreground: colors.light,
  },
  navigation: {
    activeTintColor: colors.light,
    inactiveTintColor: colors.light,
    background: colors.dark,
  },
};
