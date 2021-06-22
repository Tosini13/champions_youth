import { THEME } from "../../locale/config";
import { IThemeActions } from "../actions/ThemeActions";

const initState = {
  locale: THEME.dark,
};

const themeReducer = (state = initState, action: IThemeActions) => {
  switch (action.type) {
    case "THEME_SET":
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
};

export default themeReducer;
