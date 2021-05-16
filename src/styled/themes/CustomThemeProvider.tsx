import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { lightTheme, lightThemeGradient } from "./lightTheme";
import { mainTheme, darkThemeGradient } from "./darkTheme";
import { styledColors } from "./other";

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
    transparentGradient:
      currentTheme === EThemes.dark
        ? darkThemeGradient.transparent
        : lightThemeGradient.transparent,
    specialColor:
      currentTheme === EThemes.dark
        ? "rgba(79, 201, 240, 0.2)"
        : "rgba(0,0,0,0.2)",
    isDarkCurrent: currentTheme === EThemes.dark,
    liveColor: styledColors.icons.live,
    buttonColor: currentTheme === EThemes.dark ? "#4FC9F0" : "#000",
  };
};
