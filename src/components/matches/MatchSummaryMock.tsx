import React from "react";

import {
  MatchContainerStyled,
  MatchRoundTitleStyled,
  MatchMockTeamsContainerStyled,
} from "../../styled/styledMatch";
import { TeamData } from "../../models/teamData";
import { MatchData } from "../../structures/match";

type Props = {
  match: MatchData;
  teams: TeamData[];
};

const MatchSummaryMock: React.FC<Props> = ({ match, teams }) => {
  const home = teams.find((team) => team.id === match.home?.id);
  const away = teams.find((team) => team.id === match.away?.id);
  return (
    <MatchContainerStyled>
      {match.round ? (
        <MatchRoundTitleStyled live={false}>
          Runda {match.round}
        </MatchRoundTitleStyled>
      ) : null}
      <MatchMockTeamsContainerStyled>
        <p>{home ? home.name : match.placeholder.home}</p>
        <p>vs</p>
        <p>{away ? away.name : match.placeholder.away}</p>
      </MatchMockTeamsContainerStyled>
    </MatchContainerStyled>
  );
};

export default MatchSummaryMock;
