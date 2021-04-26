import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import { Divider, Grid } from "@material-ui/core";
import { ScrollBarStyled } from "./styledScrollBar";
import { CSSProperties } from "@material-ui/styles";

export const BodyContainer = styled.div<{ sm: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  ${(props) =>
    props.sm
      ? `
width: calc(100vw - 250px);
margin-left: auto;
`
      : ``}
`;

export const NoContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContentContainerStyled = styled.div`
  padding: 20px;
  text-align: center;
  position: relative;
`;

export const GroupsContentContainerStyled = styled(ContentContainerStyled)`
  max-height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export const LinkStyled = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const AStyled = styled.a`
  color: inherit;
  text-decoration: none;
`;

export const DialogTitle = styled.p`
  padding: 2px;
  margin: 0px;
  font-size: 12px;
  text-align: center;
`;

export const FlagImgStyled = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;
export const ImgStyled = styled.img`
  max-height: 60px;
  max-width: 60px;
  padding: 5px;
  border-radius: 5px;
`;

export const TeamImgStyled = styled(ImgStyled)`
  height: 30px;
  width: 30px;
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

export const LogoLargeStyled = styled(LogoStyled)`
  margin: 5px auto;
`;

export const LogoTeamStyled = styled(LogoStyled)`
  height: 30px;
  width: 30px;
`;

export const FlagStyled = styled(LogoStyled)`
  height: 20px;
  width: 20px;
  border-radius: 50%;
`;

/* -------------------------------------- */
/* =========== DESKTOP LAYOUT =========== */
/* -------------------------------------- */

export const DesktopMainContainerStyled: React.FC<{}> = ({ children }) => (
  <Grid container style={{ height: "100%" }}>
    {children}
  </Grid>
);

export const DesktopMainItemStyled: React.FC<{}> = ({ children }) => (
  <Grid
    item
    style={{
      maxHeight: "100%",
      maxWidth: "50%",
      flexGrow: 1,
    }}
  >
    {children}
  </Grid>
);

export const DesktopMainDividerStyled: React.FC<{}> = ({ children }) => (
  <Grid item>
    <Divider orientation="vertical" />
  </Grid>
);

/* -------------------------------------- */
/* ============== SECTION =============== */
/* -------------------------------------- */

const GridSectionStyled = styled(Grid)`
  max-height: 100%;
  flex-wrap: nowrap;
`;

type TSectionStyledProps = { style?: CSSProperties };

export const SectionStyled: React.FC<TSectionStyledProps> = ({
  children,
  style,
}) => (
  <GridSectionStyled container direction="column" style={style}>
    {children}
  </GridSectionStyled>
);

const GridSectionNavStyled = styled(Grid)`
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%),
    0 1px 5px 0 rgb(0 0 0 / 20%);
  z-index: 1;
`;

export const SectionNavStyled: React.FC<{}> = ({ children }) => (
  <GridSectionNavStyled item>{children}</GridSectionNavStyled>
);

const GridSectionContentStyled = styled(Grid)`
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  ${ScrollBarStyled}
  padding: 5px;
`;
export const SectionContentStyled: React.FC<{}> = ({ children }) => (
  <GridSectionContentStyled item>{children}</GridSectionContentStyled>
);
