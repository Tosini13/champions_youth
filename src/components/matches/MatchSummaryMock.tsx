import React from "react";
import { Rosetta, Translator } from "react-rosetta";
import { isNumber } from "util";

import {
  MatchContainerStyled,
  MatchRoundTitleStyled,
  MatchMockTeamsContainerStyled,
  MatchHeaderStyled,
  MatchRoundDateStyled,
} from "../../styled/styledMatch";
import { MatchData, MatchStructure } from "../../structures/match";
import { connect } from "react-redux";
import { LOCALE } from "../../locale/config";
import matchDict from "../../locale/matchDict";
import styled from "styled-components";

export const PlaceLabel = styled.span`
  margin-left: 2px;
`;

type Props = {
  match: MatchData | MatchStructure;
  locale: LOCALE;
};

const MatchSummaryMock: React.FC<Props> = ({ match, locale }) => {
  console.log(match);
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
            {match.home
              ? match.home.name
              : match.placeholder?.home
              ? `${match.placeholder.home.name}  `
              : "no Team"}
            {match?.placeholder?.home?.place ? (
              <PlaceLabel>
                <Translator id={match.placeholder.home.place.toString()} />
              </PlaceLabel>
            ) : null}
            {isNumber(match?.placeholder?.home?.place) ? (
              <PlaceLabel>
                <Translator id="place" />
              </PlaceLabel>
            ) : null}
          </p>
          <p>vs</p>
          <p>
            {match.away ? (
              match.away.name
            ) : match.placeholder?.away ? (
              `${match.placeholder.away.name}  `
            ) : (
              <Translator id="noTeam" />
            )}
            {match?.placeholder?.away?.place ? (
              <PlaceLabel>
                <Translator id={match.placeholder.away.place.toString()} />
              </PlaceLabel>
            ) : null}
            {isNumber(match?.placeholder?.away?.place) ? (
              <PlaceLabel>
                <Translator id="place" />
              </PlaceLabel>
            ) : null}
          </p>
        </MatchMockTeamsContainerStyled>
      </MatchContainerStyled>
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};
export default connect(mapStateToProps)(MatchSummaryMock);
