import { createMuiTheme } from "@material-ui/core/styles";

// TODO: REMOVE FILE
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
  },
});

export const styledColors = {
  icons: {
    tournament: "#7E6714",
    live: "#FF3B2E",
    my: "#7E6714",
    favorites: "#7E6714",
  },
  transparent: {
    main: "rgba(0,0,0,0)",
    light: "rgba(0,0,0,0.05)",
    dark: "rgba(255,255,255,0.05)",
  },
};
