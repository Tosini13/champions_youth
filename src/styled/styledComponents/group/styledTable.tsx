import React from "react";
import styled from "styled-components";

import { Grid, useTheme } from "@material-ui/core";
import { useColors } from "../../themes/CustomThemeProvider";
import { parseStyledBoolean } from "../../../helpers/booleanParser";

const TablePlaceStyled = styled.div<{
  isPromoted?: string;
  isLive?: string;
}>`
  border-radius: 3px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  width: fit-content;
  margin: auto;
  width: 30px;
  height: 30px;
  color: ${(props) => props.theme.palette.text.primary};
  background-color: ${(props) => props.theme.palette.primary.main};
  ${(props) =>
    props.isPromoted
      ? `background-color: ${props.theme.palette.success.dark};`
      : ``}
`;

type TTablePlaceRCParams = {
  isPromoted: boolean;
};

export const TablePlaceRC: React.FC<TTablePlaceRCParams> = ({
  children,
  isPromoted,
}) => {
  const theme = useTheme();
  return (
    <TablePlaceStyled theme={theme} isPromoted={parseStyledBoolean(isPromoted)}>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Grid item>{children}</Grid>
      </Grid>
    </TablePlaceStyled>
  );
};

const tdth = `
    padding: 5px 3px;
    min-width: 20px;
`;

const TDStyled = styled.td`
  ${tdth}
`;

export const TDRC: React.FC<{}> = ({ children }) => {
  const theme = useTheme();
  return <TDStyled theme={theme}>{children}</TDStyled>;
};

const TRStyled = styled.tr<{
  isPromoted?: string;
  isLive?: string;
  liveColor: string;
}>`
  ${(props) => (props.isLive ? `color: ${props.liveColor};` : ``)}
`;

export const TRRC: React.FC<{
  isPromoted?: string;
  isLive?: string;
}> = ({ children, isPromoted, isLive }) => {
  const { liveColor } = useColors();
  const theme = useTheme();
  return (
    <TRStyled
      liveColor={liveColor}
      theme={theme}
      isPromoted={isPromoted}
      isLive={isLive}
    >
      {children}
    </TRStyled>
  );
};

export const TableStyled = styled.table<{
  specialColor: string;
}>`
  width: 100%;
  text-align: center;
  border-radius: 3px;
  border-collapse: collapse;
  color: ${(props) => props.theme.palette?.text.primary};
  thead {
    border-bottom: ${(props) => props.specialColor} solid 0.1px;
  }
  tr {
    border-bottom: ${(props) => props.specialColor} solid 0.1px;
    > td,
    > th {
      border-right: ${(props) => props.specialColor} solid 0.1px;
    }
    > td:last-child,
    > th:last-child {
      border-right: none;
    }
  }
  tr:last-child {
    border-bottom: none;
  }
`;

export const TableRC: React.FC<{}> = ({ children }) => {
  const theme = useTheme();
  const { specialColor } = useColors();
  return (
    <TableStyled theme={theme} specialColor={specialColor}>
      {children}
    </TableStyled>
  );
};
