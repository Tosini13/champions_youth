import React from "react";
import { Rosetta, Translator } from "react-rosetta";
import { LOCALE } from "../../../../locale/config";
import matchDict from "../../../../locale/matchDict";
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
  locale: LOCALE;
}

const MatchSummaryMock: React.SFC<MatchSummaryMockProps> = ({
  match,
  locale,
}) => {
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
          <p>
            <ShowTeam
              team={match.home}
              placeholder={match?.placeholder?.home}
            />
          </p>
          <p>vs</p>
          <p>
            <ShowTeam
              team={match.away}
              placeholder={match?.placeholder?.away}
            />
          </p>
        </MatchMockTeamsContainerStyled>
      </MatchContainerStyled>
    </Rosetta>
  );
};

export default MatchSummaryMock;
