import React from "react";
import { IconButton, IconButtonProps, useTheme } from "@material-ui/core";
import styled from "styled-components";
import { useColors } from "../../themes/CustomThemeProvider";
import { parseStyledBoolean } from "../../../helpers/booleanParser";

const TeamItemIconButtonStyled = styled(IconButton)<{
  buttoncolor: string;
}>`
  color: ${(props) => props.buttoncolor};
`;

export const TeamItemIconButton: React.FC<IconButtonProps> = ({
  children,
  ...props
}) => {
  const { buttonColor } = useColors();
  return (
    <TeamItemIconButtonStyled buttoncolor={buttonColor} {...props}>
      {children}
    </TeamItemIconButtonStyled>
  );
};

const iconWidth = 60;
const iconHeight = 10;

const ChooseTeamIconButtonStyled = styled.div<{
  buttoncolor: string;
  isselected?: string;
}>`
  transition: all 0.2s;

  width: 30px;
  height: 30px;
  position: relative;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  div {
    position: absolute;
    left: 50%;
    top: 50%;
    width: ${iconWidth}%;
    height: ${iconHeight}%;
    border-radius: 2px;
    margin-top: -${iconHeight / 2}%;
    margin-left: -${iconWidth / 2}%;
    background-color: ${(props) => props.buttoncolor};
    ${(props) =>
      props.isselected
        ? `background-color: ${(props) => props.buttoncolor};`
        : ""}
  }

  #horizontal {
    transition: all 0.2s;
    transform: rotateZ(90deg);
    ${(props) => (props.isselected ? "transform: rotateZ(0deg);" : "")}
  }
`;

type TChooseTeamIconButtonProps = {
  isSelected: boolean;
  handleClick?: () => void;
};

export const ChooseTeamIconButton: React.FC<TChooseTeamIconButtonProps> = ({
  isSelected,
  handleClick,
}) => {
  const theme = useTheme();
  const { buttonColor } = useColors();
  return (
    <ChooseTeamIconButtonStyled
      onClick={handleClick}
      isselected={parseStyledBoolean(isSelected)}
      theme={theme}
      buttoncolor={buttonColor}
    >
      <div id="vertical"></div>
      <div id="horizontal"></div>
    </ChooseTeamIconButtonStyled>
  );
};
