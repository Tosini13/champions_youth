import React, { useContext } from "react";
import { connect } from "react-redux";

import { THEME } from "../../locale/config";
import { IconButton } from "@material-ui/core";
import { setTheme } from "../../store/actions/ThemeActions";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import {
  CustomThemeContext,
  EThemes,
} from "../../styled/themes/CustomThemeProvider";

export interface ThemeProps {
  theme: THEME;
  setTheme: (theme: THEME) => void;
}

const Theme: React.FC<ThemeProps> = ({ theme }) => {
  const { currentTheme, setTheme } = useContext(CustomThemeContext);

  const isDark = Boolean(currentTheme === EThemes.dark);

  const handleChangeTheme = () => {
    if (isDark) {
      setTheme(EThemes.light);
    } else {
      setTheme(EThemes.dark);
    }
  };

  return (
    <IconButton onClick={handleChangeTheme}>
      <WbSunnyIcon />
    </IconButton>
  );
};

const mapStateToProps = (state: any) => {
  const loggedIn = Boolean(state.firebase.auth.uid);
  return {
    loggedIn,
    theme: state.theme.theme,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setTheme: (theme: THEME) => dispatch(setTheme(theme)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
