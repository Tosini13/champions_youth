import { mainTheme } from "./themes/darkTheme";

export const ScrollBarStyled = `
/* width */
::-webkit-scrollbar {
  width: 3px;
  &:hover{
    width: 10px;
  }
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
}


-webkit-overflow-scrolling: touch;
overflow-y: auto;
overflow-x: hidden;

max-height: calc(100vh);
max-height: calc(100vh - 155px);
@media only screen and (min-width: 960)  {
  max-height: calc(100vh);
}
`;
