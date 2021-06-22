import React from "react";
import { Grid, GridProps } from "@material-ui/core";
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
  specialcolor: string;
}>`
  padding: 5px 70px;
  background: ${(props) => props.gradient};
  > div {
    border-bottom: solid 1px ${(props) => props.specialcolor};
  }
  > div:last-child {
    border-bottom: none;
  }
`;

export const GroupTeamsContainer: React.FC<GridProps> = ({
  children,
  ...props
}) => {
  const { transparentGradient, specialColor } = useColors();
  return (
    <GroupTeamsContainerStyled
      gradient={transparentGradient}
      specialcolor={specialColor}
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

const GroupTeamSummaryContainerStyled = styled(Grid)``;

export const GroupTeamSummaryContainer: React.FC<GridProps> = ({
  children,
  ...props
}) => {
  return (
    <GroupTeamSummaryContainerStyled item {...props}>
      {children}
    </GroupTeamSummaryContainerStyled>
  );
};
