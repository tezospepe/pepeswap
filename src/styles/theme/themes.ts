const lightTheme = {
  primary: 'rgba(252, 240, 197, 1)',
  text: 'rgba(215, 152, 34,1)',
  textSecondary: 'rgba(0, 0, 0, 0.8)',
  background: 'rgba(239, 226, 186 ,1)',
  backgroundVariant: 'rgba(215, 152, 34,1)',
  border: 'rgba(58,52,51,0.12)',
  borderLight: 'rgba(58,52,51,0.05)',
};

const darkTheme: Theme = {
  primary: 'rgba(30,31,40,1)',
  text: 'rgba(149,215,146,1)',
  textSecondary: 'rgba(252,253,252,1)',
  background: 'rgba(5,5,15,1);',
  backgroundVariant: 'rgba(149,215,146,1);',
  border: 'rgba(241,233,231,0.15)',
  borderLight: 'rgba(241,233,231,0.05)',
};

export type Theme = typeof lightTheme;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
