import React from "react";

import {
  MatchContainerStyled,
  MatchRoundTitleStyled,
  MatchMockTeamsContainerStyled,
} from "../../styled/styledMatch";
import { MatchData } from "../../structures/match";

type Props = {
  match: MatchData;
};

const MatchSummaryMock: React.FC<Props> = ({ match }) => {
  return (
    <MatchContainerStyled>
      {match.round ? (
        <MatchRoundTitleStyled live={false}>
          Runda {match.round}
        </MatchRoundTitleStyled>
      ) : null}
      <MatchMockTeamsContainerStyled>
        <p>{match.home ? match.home.name : match.placeholder.home}</p>
        <p>vs</p>
        <p>{match.away ? match.away.name : match.placeholder.away}</p>
      </MatchMockTeamsContainerStyled>
    </MatchContainerStyled>
  );
};

export default MatchSummaryMock;
