import { createMuiTheme } from "@material-ui/core/styles";

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#D8D8D8",
      light: "#001626",
      dark: "#EBEBEB",
    },
    secondary: {
      main: "#030839",
      dark: "#FFFFFF",
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
      primary: "#001626",
      secondary: "#CFCFCF",
    },
    background: {
      default: `linear-gradient(90deg, rgba(0, 22, 38, 0.15) 0%, rgba(0, 22, 38, 0.8) 27.08%, #001626 52.08%, rgba(0, 22, 38, 0.8) 77.6%, rgba(0, 22, 38, 0.15) 100%)`,
      paper:
        "linear-gradient(90deg, rgba(46, 102, 134, 0.15) 0%, rgba(46, 102, 134, 0.8) 27.08%, #2E6686 52.08%, rgba(46, 102, 134, 0.8) 77.6%, rgba(46, 102, 134, 0.15) 100%)",
    },
  },
});
