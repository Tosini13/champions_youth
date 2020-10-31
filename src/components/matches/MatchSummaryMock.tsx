import React from "react";

import {
  MatchContainerStyled,
  MatchRoundTitleStyled,
  MatchMockTeamsContainerStyled,
  MatchHeaderStyled,
  MatchRoundDateStyled,
} from "../../styled/styledMatch";
import { MatchData, MatchStructure } from "../../structures/match";

type Props = {
  match: MatchData | MatchStructure;
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
        <p>
          {match.home
            ? match.home.name
            : match.placeholder.home
            ? match.placeholder.home.name
            : "brak zespołu"}
        </p>
        <p>vs</p>
        <p>
          {match.away
            ? match.away.name
            : match.placeholder.away
            ? match.placeholder.away.name
            : "brak zespołu"}
        </p>
      </MatchMockTeamsContainerStyled>
    </MatchContainerStyled>
  );
};

export default MatchSummaryMock;
