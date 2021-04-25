import { createMuiTheme } from "@material-ui/core/styles";

export const mainTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#042A46",
      light: "#0269E2", //
      dark: "#001626",
    },
    secondary: {
      main: "#C4C4C4",
      light: "#FFFFFF",
      dark: "#969696",
    },
    error: {
      main: "#D90E00",
      light: "#FF3B2E",
      dark: "#960A00",
    },
    success: {
      main: "#1D850D",
      light: "#18B500",
      dark: "#094200",
    },
    info: {
      main: "#4B58B8",
      light: "#576BFF",
      dark: "#07168A",
    },
    text: {
      primary: "#FFF",
      secondary: "#4FC9F0",
    },
    background: {
      // match background
      default: `linear-gradient(90deg, rgba(2, 105, 226, 0.15) 0%, rgba(2, 105, 226, 0.8) 27.08%, #0269E2 52.08%, rgba(2, 105, 226, 0.8) 77.6%, rgba(2, 105, 226, 0.15) 100%)`,
      // match header background
      paper: `linear-gradient(90deg, rgba(46, 102, 134, 0.15) 0%, rgba(46, 102, 134, 0.8) 27.08%, #2E6686 52.08%, rgba(46, 102, 134, 0.8) 77.6%, rgba(46, 102, 134, 0.15) 100%)`,
    },
  },
});
