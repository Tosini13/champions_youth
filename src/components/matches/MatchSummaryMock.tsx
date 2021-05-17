import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import {
  MatchContainerStyled,
  MatchRoundTitleStyled,
  MatchMockTeamsContainerStyled,
  MatchHeaderStyled,
  MatchRoundDateStyled,
} from "../../styled/styledMatch";
import { MatchData, MatchStructure } from "../../structures/match";
import matchDict from "../../locale/matchDict";
import styled from "styled-components";
import ShowTeam from "./ShowTeam";
import useTranslationHelp from "../../hooks/useTranslationHelp";
import { Typography } from "@material-ui/core";
import { useLocale } from "../../Provider/LocaleProvider";

export const PlaceLabel = styled.span`
  margin-left: 2px;
`;

type Props = {
  match: MatchStructure | MatchData;
};

const MatchSummaryMock: React.FC<Props> = ({ match }) => {
  const { locale } = useLocale();
  const { translateRound } = useTranslationHelp();
  const { round, number } = translateRound(match.round);
  return (
    <Rosetta translations={matchDict} locale={locale}>
      <MatchContainerStyled>
        <MatchHeaderStyled live={false}>
          {match.round ? (
            <MatchRoundTitleStyled>
              <Translator id="round" /> <Translator id={round} /> {number}
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
    </Rosetta>
  );
};

export default MatchSummaryMock;
