import styled from "styled-components";

import { mainTheme } from "./styledConst";

export const GroupTitleText = styled.p`
  background-color: ${mainTheme.palette.primary.main};
  color: ${mainTheme.palette.secondary.dark};
  text-align: center;
  margin: 0px;
  font-size: 15px;
  padding: 2px;
`;

export const GroupTeamText = styled.p`
  color: ${mainTheme.palette.secondary.main};
  text-align: center;
  margin: 0px;
  font-size: 13px;
  padding: 0px;
  margin: 5px;
`;

export const GroupContainer = styled.div`
  margin-bottom: 10px;
`;

export const GroupHeaderContainer = styled.div`
  background-color: ${mainTheme.palette.primary.light};
  border-radius: 3px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

export const ChooseTeamContainer = styled.div<{ chosen: boolean }>`
  ${(props) =>
    props.chosen
      ? `background-color: ${mainTheme.palette.primary.main};`
      : `background-color: ${mainTheme.palette.primary.light};`}
  color: ${mainTheme.palette.secondary.main};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  padding: 5px;
  margin: 3px 0px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
`;

export const ChooseTeamName = styled.p`
  font-size: 13px;
  margin: 0px;
  padding: 0px;
`;
