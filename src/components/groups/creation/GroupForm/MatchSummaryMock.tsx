import { Typography } from "@material-ui/core";
import React from "react";
import { Rosetta, Translator } from "react-rosetta";
import matchDict from "../../../../locale/matchDict";
import { useLocale } from "../../../../Provider/LocaleProvider";
import { MatchData } from "../../../../structures/match";
import {
  MatchContainerStyled,
  MatchHeaderStyled,
  MatchMockTeamsContainerStyled,
  MatchRoundDateStyled,
  MatchRoundTitleStyled,
} from "../../../../styled/styledMatch";
import ShowTeam from "../../../matches/ShowTeam";

export interface MatchSummaryMockProps {
  match: MatchData;
}

const MatchSummaryMock: React.SFC<MatchSummaryMockProps> = ({ match }) => {
  const { locale } = useLocale();
  return (
    <Rosetta translations={matchDict} locale={locale}>
      <MatchContainerStyled>
        <MatchHeaderStyled live={false}>
          {match.round ? (
            <MatchRoundTitleStyled>
              <Translator id="round" /> {match.round}
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
