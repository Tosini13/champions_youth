import React from "react";
import { Rosetta, Translator } from "react-rosetta";
import styled from "styled-components";

import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";

import { GroupTeamModel, TeamData } from "../../../../models/teamData";
import { MatchData } from "../../../../structures/match";
import { mainTheme, styledColors } from "../../../../styled/styledConst";
import { createTable } from "../../../../structures/groupPromotion";
import { GroupPlayOffs } from "../../../../store/actions/GroupActions";
import { GroupPlayOffsGroup } from "../../../../NewModels/Group";
import { Typography } from "@material-ui/core";
import { LOCALE } from "../../../../locale/config";
import groupDetailsDict from "../../../../locale/groupDetails.dict";

const GroupTableStyled = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  margin: 10px 0px;
  > table {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    text-align: center;
    border-radius: 3px;
    border-collapse: collapse;
    td,
    th {
      padding: 5px 3px;
      border: rgba(0, 0, 0, 0.2) solid 0.1px;
      min-width: 20px;
      color: ${mainTheme.palette.secondary.main};
    }
    th {
      color: ${mainTheme.palette.secondary.dark};
      text-transform: uppercase;
      font-size: 10px;
    }
    .group-table-promoted {
      background-color: ${mainTheme.palette.success.dark};
    }
    .group-table-live {
      color: ${styledColors.icons.live};
    }
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export interface GroupTableProps {
  locale: LOCALE;
  teamsDb?: TeamData[];
  teams: TeamData[];
  groupTeams?: GroupTeamModel[];
  matches: MatchData[];
  playOffs?: GroupPlayOffs[];
  playOffsGroup?: GroupPlayOffsGroup[];
}

const GroupTable: React.FC<GroupTableProps> = ({
  locale,
  groupTeams,
  teams,
  matches,
  playOffs,
  playOffsGroup,
}) => {
  const teamsId =
    teams.map((team) => team.id) ?? groupTeams?.map((team) => team.id);

  const table = createTable(teamsId, matches);

  let promotionCounter = 1;
  const tableList = table.map((row) => {
    const team = teams.find((team) => team.id === row.team);
    if (!team) return null;
    const promoted: boolean = Boolean(
      playOffs?.find((game) => game.place === promotionCounter) ||
        playOffsGroup?.find((place) => place.place === promotionCounter)
    );
    let rowClass = "";
    if (promoted) {
      rowClass += " group-table-promoted";
    }
    if (row.live) {
      rowClass += " group-table-live";
    }
    return (
      <tr key={team.id} className={rowClass}>
        <td>{promotionCounter++}</td>
        <td>{team.name}</td>
        <td>{row.matches}</td>
        <td>{row.points}</td>
        <td>{row.goalsScored}</td>
        <td>{row.goalsLost}</td>
      </tr>
    );
  });

  return (
    <Rosetta translations={groupDetailsDict} locale={locale}>
      <GroupTableStyled>
        <table>
          <thead>
            <tr>
              <th>
                <FormatListNumberedIcon />
              </th>
              <th>
                <p>
                  <Translator id="teamsTable" />
                </p>
              </th>
              <th>
                <p>
                  <Translator id="matchesTable" />
                </p>
              </th>
              <th>
                <p>
                  <Translator id="pointsTable" />
                </p>
              </th>
              <th>
                <p>
                  <Translator id="scoredTable" />
                </p>
              </th>
              <th>
                <Translator id="goalsLostTable" />
              </th>
            </tr>
          </thead>
          <tbody>{teams.length || groupTeams?.length ? tableList : null}</tbody>
        </table>
        {!teams.length && !groupTeams?.length ? (
          <Typography color="secondary" align="center">
            <Translator id="noTeamsMessage" />
          </Typography>
        ) : null}
      </GroupTableStyled>
    </Rosetta>
  );
};

export default GroupTable;
