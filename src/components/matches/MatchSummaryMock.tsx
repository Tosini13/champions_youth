import React from "react";

import {
  MatchContainerStyled,
  MatchRoundTitleStyled,
  MatchMockTeamsContainerStyled,
  MatchHeaderStyled,
  MatchRoundDateStyled,
} from "../../styled/styledMatch";
import { MatchData, MatchStructure } from "../../structures/match";
import styled from "styled-components";
import ShowTeam from "./ShowTeam";
import { Typography } from "@material-ui/core";
import { ShowRound } from "../../styled/styledComponents/match/styledTypography";

export const PlaceLabel = styled.span`
  margin-left: 2px;
`;

type Props = {
  match: MatchStructure | MatchData;
};

const MatchSummaryMock: React.FC<Props> = ({ match }) => {
  return (
    <MatchContainerStyled>
      <MatchHeaderStyled live={false}>
        {match.round ? (
          <MatchRoundTitleStyled>
            <ShowRound round={match.round} />
          </MatchRoundTitleStyled>
        ) : null}
        {match.date ? (
          <MatchRoundDateStyled>
            {match.date.format("YYYY-MM-DD HH:mm")}
          </MatchRoundDateStyled>
        ) : null}
      </MatchHeaderStyled>
      <MatchMockTeamsContainerStyled>
        <ShowTeam team={match.home} placeholder={match?.placeholder?.home} />
        <Typography variant="body2">vs</Typography>
        <ShowTeam team={match.away} placeholder={match?.placeholder?.away} />
      </MatchMockTeamsContainerStyled>
    </MatchContainerStyled>
  );
};

export default MatchSummaryMock;
