const palette = {
  purple: '#5A31F4',
  green: '#0ECD9D',
  red: '#CD0E61',
  dark: '#141414',
  light: '#F0F2F3',
  white: '#fff',
  black: '#0a0a0a',
};

const colors = {
  background: palette.white,
  foreground: palette.dark,
  primary: palette.purple,
  success: palette.green,
  danger: palette.red,
  failure: palette.red,
};

export const theme = {
  colors,
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    brand: {
      fontFamily: 'Raleway',
      fontSize: 24,
      fontWeight: 'bold',
    },
    header: {
      fontFamily: 'Raleway',
      fontSize: 36,
      fontWeight: 'bold',
    },
    title: {
      fontFamily: 'Merriweather',
      fontSize: 18,
    },
    label: {
      fontFamily: 'Merriweather',
      fontSize: 16,
    },
    body: {
      fontFamily: 'Merriweather',
      fontSize: 14,
    },
  },
  appBar: {
    background: palette.white,
  },
  navigation: {
    activeTintColor: colors.primary,
    inactiveTintColor: palette.dark,
    background: palette.white,
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.dark,
    foreground: palette.white,
  },
  appBar: {
    background: palette.black,
    tintColor: palette.light,
  },
  navigation: {
    activeTintColor: palette.light,
    inactiveTintColor: palette.light,
    background: palette.black,
  },
};
