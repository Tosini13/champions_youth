import styled from "styled-components";

import { Link } from "react-router-dom";
import { mainTheme } from "./styledConst";

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
`;

export const MainContainer = styled.main`
  overflow-x: hidden;
  overflow-y: auto;
  flex-grow: 1;
  background-color: ${mainTheme.palette.primary.dark};
  padding: 0px 5px;
`;

export const NoContentTitle = styled.p`
  text-align: center;
  color: ${mainTheme.palette.secondary.dark};
`;

export const ContentContainerStyled = styled.div`
  padding: 5px;
  padding-top: 35px;
`;

export const LinkStyled = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
