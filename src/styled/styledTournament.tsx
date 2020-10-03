import styled from "styled-components";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import Stepper from "@material-ui/core/Stepper";
import { mainTheme, styledColors } from "./styledConst";

export const TournamentDashboardMenuStyled = styled.div`
  position: fixed;
  left: 0;
  z-index: 9;
  width: 100%;
  background-color: ${mainTheme.palette.primary.main};
  display: flex;
  justify-content: space-around;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const TournamentDashboardMenuItemStyled = styled.div<{
  selected: boolean;
}>`
  transition: background-color 0.3s;
  color: ${mainTheme.palette.secondary.main};
  padding: 7px 7px;
  margin: 5px 0px 2px 0px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 13px;
  ${(props) =>
    props.selected
      ? `background-color: ${mainTheme.palette.primary.dark};`
      : `background-color: ${styledColors.transparent.main};`}
`;

export const TournamentDashboardStyled = styled.ul`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  display: flex;
  justify-content: space-evenly;
`;

export const TournamentDashboardElementStyled = styled.li<{
  selected: boolean;
}>`
  padding: 20px 10px 5px 10px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  margin: 0px 5px;
  font-size: 10px;
  display: flex;
  text-align: center;
  align-items: center;
  ${(props) =>
    props.selected
      ? `background-color: ${mainTheme.palette.primary.dark};
    transform: translateY(5px);`
      : `background-color: ${mainTheme.palette.primary.main};`}
`;

export const TournamentListItemStyled = styled(ListItem)`
  display: flex;
  align-items: stretch;
  position: relative;
  margin-top: 10px;
  border-radius: 3px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  padding: 5px;
  background-color: ${mainTheme.palette.primary.main};
`;

export const TournamentLinkItemStyled = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  color: ${mainTheme.palette.secondary.main};
  text-decoration: none;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;

export const TournamentListItemTitleStyled = styled.p`
  padding: 0px;
  margin: 0px;
  margin-left: 5px;
  color: ${mainTheme.palette.secondary.main};
  font-size: 15px;
  text-align: center;
  flex-grow: 1;
`;

export const TournamentListItemDateStyled = styled.p`
  padding: 0px;
  margin: 0px;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 2px;
  border-radius: 5px;
  width: fit-content;
  font-size: 11px;
  color: ${mainTheme.palette.secondary.dark};
`;

export const TournamentListItemImgStyled = styled.img`
  height: 60px;
  width: 60px;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 5px;
  border-radius: 5px;
`;

export const TournamentListItemActionSideStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TournamentDetailsContainerStyled = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
`;

export const TournamentDetailsHeaderStyled = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const TournamentDetailsTitleStyled = styled.div`
  font-size: 20px;
  text-align: center;
  color: ${mainTheme.palette.secondary.main};
  flex-grow: 1;
`;

export const TournamentDetailsInfoStyled = styled.div`
  color: ${mainTheme.palette.secondary.main};
  display: flex;
  align-items: center;
`;

export const TournamentDetailsInfoTitleStyled = styled.p`
  margin: 2px;
  margin-right: 10px;
`;

export const TournamentDetailsInfoContentStyled = styled.p`
  color: ${mainTheme.palette.secondary.light};
  font-size: 20px;
  margin: 5px;
  margin-left: 10px;
`;

export const TournamentCreationFinishStyled = styled.div`
  background-color: transparent;
`;

export const TournamentCreationStepperStyled = styled(Stepper)`
  background-color: transparent;
  width: 100%;
`;

export const TournamentCreationStepLabelStyled = styled.span`
  color: ${mainTheme.palette.secondary.light};
`;
