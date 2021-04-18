import React from "react";
import { connect } from "react-redux";

import { ThemeProvider } from "@material-ui/styles";
import { lightTheme, mainTheme } from "./styledConst";
import { THEME } from "../locale/config";

export interface ThemeProviderWrapperProps {
  theme: THEME;
}

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({
  theme,
  children,
}) => {
  console.log(theme === THEME.light);
  return (
    <ThemeProvider theme={theme === THEME.light ? lightTheme : mainTheme}>
      {children}
    </ThemeProvider>
  );
};

const mapStateToProps = (state: any) => {
  return {
    theme: state.theme.theme,
  };
};
export default connect(mapStateToProps)(ThemeProviderWrapper);
