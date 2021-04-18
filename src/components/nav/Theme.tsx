import React from "react";
import { connect } from "react-redux";

import { THEME } from "../../locale/config";
import { IconButton } from "@material-ui/core";
import { setTheme } from "../../store/actions/ThemeActions";
import WbSunnyIcon from "@material-ui/icons/WbSunny";

export interface ThemeProps {
  theme: THEME;
  setTheme: (theme: THEME) => void;
}

const Theme: React.FC<ThemeProps> = ({ theme, setTheme }) => {
  console.log(theme);
  const handleSetLocale = () => {
    setTheme(theme === THEME.dark ? THEME.light : THEME.dark);
  };

  return (
    <IconButton onClick={handleSetLocale}>
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
