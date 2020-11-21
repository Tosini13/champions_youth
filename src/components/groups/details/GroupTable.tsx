import React from "react";
import styled from "styled-components";

import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";

import { TeamData } from "../../../models/teamData";
import { MatchData } from "../../../structures/match";
import { mainTheme, styledColors } from "../../../styled/styledConst";
import { createTable } from "../../../structures/groupPromotion";

export interface GroupTableProps {
  teams: TeamData[];
  matches: MatchData[];
  promotedQtt: number;
}

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

const GroupTable: React.FC<GroupTableProps> = ({
  teams,
  matches,
  promotedQtt,
}) => {
  const table = createTable(teams, matches);

  let promotionCounter = 0;
  const tableList = table.map((row) => {
    let rowClass = "";
    if (promotionCounter < promotedQtt) {
      rowClass += " group-table-promoted";
    }
    if (row.live) {
      rowClass += " group-table-live";
    }
    promotionCounter++;
    const team = teams.find((team) => team.id === row.team);
    if (!team) return null;
    return (
      <tr key={team.id} className={rowClass}>
        <td>{promotionCounter}</td>
        <td>{team.name}</td>
        <td>{row.matches}</td>
        <td>{row.points}</td>
        <td>{row.goalsScored}</td>
        <td>{row.goalsLost}</td>
      </tr>
    );
  });

  return (
    <GroupTableStyled>
      <table>
        <thead>
          <tr>
            <th>
              <FormatListNumberedIcon />
            </th>
            <th>ZESPOŁY</th>
            <th>
              <p>M</p>
            </th>
            <th>
              <p>PKT</p>
            </th>
            <th>
              <p>GZ</p>
            </th>
            <th>GS</th>
          </tr>
        </thead>
        <tbody>{tableList}</tbody>
      </table>
    </GroupTableStyled>
  );
};

export default GroupTable;
