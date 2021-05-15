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
import {
  TableRC,
  TRRC,
  TDRC,
  TablePlaceRC,
} from "../../../../styled/styledComponents/group/styledTable";
import { parseStyledBoolean } from "../../../../helpers/booleanParser";

const GroupTableStyled = styled.div`
  margin: 10px 0px;
  // > table {
  //   width: 100%;
  //   background-color: rgba(0, 0, 0, 0.1);
  //   text-align: center;
  //   border-radius: 3px;
  //   border-collapse: collapse;
  //   td,
  //   th {
  //     padding: 5px 3px;
  //     border: rgba(0, 0, 0, 0.2) solid 0.1px;
  //     min-width: 20px;
  //     color: ${mainTheme.palette.secondary.main};
  //   }
  //   th {
  //     color: ${mainTheme.palette.secondary.dark};
  //     text-transform: uppercase;
  //     font-size: 10px;
  //   }
  //   .group-table-promoted {
  //     background-color: ${mainTheme.palette.success.dark};
  //   }
  //   .group-table-live {
  //     color: ${styledColors.icons.live};
  //   }
  //   background-color: rgba(0, 0, 0, 0.1);
  // }
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
    return (
      <TRRC
        key={team.id}
        isPromoted={parseStyledBoolean(promoted)}
        isLive={parseStyledBoolean(row.live)}
      >
        <TDRC>
          <TablePlaceRC isPromoted={promoted}>
            {promotionCounter++}
          </TablePlaceRC>
        </TDRC>
        <TDRC>{team.name}</TDRC>
        <TDRC>{row.matches}</TDRC>
        <TDRC>{row.points}</TDRC>
        <TDRC>{row.goalsScored}</TDRC>
        <TDRC>{row.goalsLost}</TDRC>
      </TRRC>
    );
  });

  return (
    <Rosetta translations={groupDetailsDict} locale={locale}>
      <GroupTableStyled>
        <TableRC>
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
        </TableRC>
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
