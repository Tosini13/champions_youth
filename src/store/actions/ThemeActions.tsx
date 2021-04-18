import { THEME } from "../../locale/config";

export interface IThemeActions {
  type: string;
  theme?: THEME;
}

export const setTheme = (theme: THEME) => {
  return {
    type: "THEME_SET",
    theme,
  };
};
