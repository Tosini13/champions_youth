import React from "react";
import { Grid, GridProps, useTheme } from "@material-ui/core";
import styled from "styled-components";
import { useColors } from "../../themes/CustomThemeProvider";

// #################### HEADER ##########################

const GroupHeaderContainerStyled = styled.div<{
  gradient: string;
}>`
  background: ${(props) => props.gradient};
  padding: 2px;
`;

export const GroupHeaderContainer: React.FC = ({ children }) => {
  const { lightGradient } = useColors();
  return (
    <GroupHeaderContainerStyled gradient={lightGradient}>
      {children}
    </GroupHeaderContainerStyled>
  );
};

// #################### GROUP TEAMS SUMMARY ##########################

const GroupTeamsContainerStyled = styled(Grid)<{
  gradient: string;
}>`
  padding: 5px 0px;
  padding-left: 70px;
`;

export const GroupTeamsContainer: React.FC<GridProps> = ({
  children,
  ...props
}) => {
  const { darkGradient } = useColors();
  return (
    <GroupTeamsContainerStyled
      gradient={darkGradient}
      container
      alignItems="stretch"
      direction="column"
      spacing={1}
      {...props}
    >
      {children}
    </GroupTeamsContainerStyled>
  );
};

const GroupTeamSummaryContainerStyled = styled(Grid)`
  border-bottom: solid 1px ${(props) => props.theme.palette.text.primary};
`;

export const GroupTeamSummaryContainer: React.FC<GridProps> = ({
  children,
  ...props
}) => {
  const theme = useTheme();
  return (
    <GroupTeamSummaryContainerStyled item {...props} theme={theme}>
      {children}
    </GroupTeamSummaryContainerStyled>
  );
};
