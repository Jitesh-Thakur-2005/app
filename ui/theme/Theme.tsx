import React, { createContext, useContext, useMemo } from 'react';
import { Appearance } from 'react-native';
import { Colors } from './Color';
// import { Colors } from './colors';

const ThemeContext = createContext();

const DarkColorScheme = {
  primary: Colors.Purple80,
  secondary: Colors.PurpleGrey80,
  tertiary: Colors.Pink80,
  background: Colors.AppBackgroundColor,
};

const LightColorScheme = {
  primary: Colors.Purple40,
  secondary: Colors.PurpleGrey40,
  tertiary: Colors.Pink40,
  background: Colors.AppBackgroundColor,
};

export const YoYoTestTheme = ({
  children,
  darkTheme,
}:Props) => {
  const systemTheme = Appearance.getColorScheme();

  const isDark =
    darkTheme !== undefined
      ? darkTheme
      : systemTheme === 'dark';

  const theme = useMemo(() => {
    return isDark ? DarkColorScheme : LightColorScheme;
  }, [isDark]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
