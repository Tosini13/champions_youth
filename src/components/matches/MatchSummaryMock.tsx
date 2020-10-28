import React from "react";

import {
  MatchContainerStyled,
  MatchRoundTitleStyled,
  MatchMockTeamsContainerStyled,
  MatchHeaderStyled,
  MatchRoundDateStyled,
} from "../../styled/styledMatch";
import { MatchData, MatchStructure } from "../../structures/match";
import { Placeholder } from "../../const/groupConst";

type Props = {
  match: MatchData | MatchStructure;
};

const MatchSummaryMock: React.FC<Props> = ({ match }) => {
  const displayPlaceholder = (placeholder?: Placeholder | string) => {
    const obj = placeholder as Placeholder;
    return obj.name ? obj.name : obj;
  };

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
            : displayPlaceholder(match.placeholder.home)}
        </p>
        <p>vs</p>
        <p>
          {match.away
            ? match.away.name
            : displayPlaceholder(match.placeholder.away)}
        </p>
      </MatchMockTeamsContainerStyled>
    </MatchContainerStyled>
  );
};

export default MatchSummaryMock;
