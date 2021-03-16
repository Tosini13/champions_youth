import { Tab } from "@material-ui/core";
import styled from "styled-components";
import { mainTheme } from "./styledConst";

export const TabStyled = styled(Tab)`
  flex-grow: 1;
  max-width: none;
  color: ${mainTheme.palette.secondary.dark};
`;
