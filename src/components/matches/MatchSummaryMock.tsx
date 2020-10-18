import React from "react";

import {
  MatchContainerStyled,
  MatchRoundTitleStyled,
  MatchMockTeamsContainerStyled,
  MatchHeaderStyled,
  MatchRoundDateStyled,
} from "../../styled/styledMatch";
import { MatchData } from "../../structures/match";

type Props = {
  match: MatchData;
};

const MatchSummaryMock: React.FC<Props> = ({ match }) => {
  return (
    <MatchContainerStyled>
      <MatchHeaderStyled live={false}>
        {match.round ? (
          <MatchRoundTitleStyled>Runda {match.round}</MatchRoundTitleStyled>
        ) : null}
        {match.date ? (
          <MatchRoundDateStyled>
            {match.date.format("YYYY-MM-DD HH:mm")}
          </MatchRoundDateStyled>
        ) : null}
      </MatchHeaderStyled>
      <MatchMockTeamsContainerStyled>
        <p>{match.home ? match.home.name : match.placeholder.home}</p>
        <p>vs</p>
        <p>{match.away ? match.away.name : match.placeholder.away}</p>
      </MatchMockTeamsContainerStyled>
    </MatchContainerStyled>
  );
};

export default MatchSummaryMock;
