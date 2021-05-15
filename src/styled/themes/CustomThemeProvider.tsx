import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { lightTheme, lightThemeGradient } from "./lightTheme";
import { mainTheme, darkThemeGradient } from "./darkTheme";

export enum EThemes {
  dark = "dark",
  light = "light",
}

const themes = {
  light: lightTheme,
  dark: mainTheme,
};

export function getTheme(theme: EThemes) {
  return themes[theme];
}

export const CustomThemeContext = React.createContext({
  currentTheme: EThemes.dark,
  setTheme: (name: EThemes) => {},
});

export const CustomThemeProvider: React.FC<{}> = ({ children }) => {
  const currentTheme =
    (localStorage.getItem("championsYouthTheme") as EThemes) || EThemes.dark;

  const [themeName, _setThemeName] = useState<EThemes>(currentTheme);

  const theme = getTheme(themeName);

  const setThemeName = (name: EThemes) => {
    console.log(name);
    localStorage.setItem("championsYouthTheme", name);
    _setThemeName(name);
  };

  const contextValue = {
    currentTheme: themeName as EThemes,
    setTheme: setThemeName,
  };

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;

export const useColors = () => {
  const currentTheme =
    (localStorage.getItem("championsYouthTheme") as EThemes) || EThemes.dark;
  return {
    lightGradient:
      currentTheme === EThemes.dark
        ? darkThemeGradient.light
        : lightThemeGradient.light,
    darkGradient:
      currentTheme === EThemes.dark
        ? darkThemeGradient.dark
        : lightThemeGradient.dark,
    specialColor: currentTheme === EThemes.dark ? "#4FC9F0" : "#FFF",
    isDarkCurrent: currentTheme === EThemes.dark,
  };
};
