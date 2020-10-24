import styled from "styled-components";

import { Link } from "react-router-dom";
import { mainTheme } from "./styledConst";

import Dialog from "@material-ui/core/Dialog";

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

export const NoContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NoContentTitle = styled.p`
  text-align: center;
  color: ${mainTheme.palette.secondary.dark};
`;

export const ContentContainerStyled = styled.div`
  padding: 5px;
  padding-top: 45px;
  text-align: center;
`;

export const LinkStyled = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const DialogStyled = styled(Dialog)`
  .MuiPaper-root {
    padding: 3px;
    color: ${mainTheme.palette.secondary.dark};
    background-color: ${mainTheme.palette.primary.dark};
    width: 90%;
    min-width: 290px;
  }
`;

export const DialogTitle = styled.p`
  padding: 2px;
  margin: 0px;
  font-size: 12px;
  text-align: center;
`;

export const ImgStyled = styled.img`
  height: 60px;
  width: 60px;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 5px;
  border-radius: 5px;
`;

export const LogoContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: fit-content;
  margin: 20px auto;
  position: relative;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

export const LogoStyled = styled.div<{
  src?: string;
}>`
  height: 60px;
  width: 60px;
  background-size: cover;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 5px;
  ${(props) =>
    props.src
      ? `background-image: url("${props.src}");`
      : `display: flex;
    justify-content: center;
    align-items: center;`}
`;

export const LogoTeamStyled = styled(LogoStyled)`
  height: 30px;
  width: 30px;
`;
