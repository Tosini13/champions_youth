import { mainTheme } from "./themes/darkTheme";

export const ScrollBarStyled = `
-webkit-overflow-scrolling: touch;
/* width */
::-webkit-scrollbar {
  width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: ${mainTheme.palette.primary.dark};
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: ${mainTheme.palette.secondary.dark};
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: ${mainTheme.palette.secondary.dark};
}`;
