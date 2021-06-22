import React from "react";

import {
  MatchContentContainer,
  MatchContainer,
} from "../../../styled/styledComponents/match/styledLayout";

import { MatchData } from "../../../structures/match";
import MatchContent from "./MatchContent";

import { SIZE_LOGO, TeamLogo } from "../../global/Logo";
import MatchHeader from "./MatchHeader";
import {
  AwayLogoContainer,
  HomeLogoContainer,
} from "../../../styled/styledComponents/match/styledLogo";

export interface MatchSummaryProps {
  match: MatchData;
}

const MatchSummary: React.FC<MatchSummaryProps> = ({ match }) => {
  return (
    <MatchContainer>
      <HomeLogoContainer>
        <TeamLogo teamLogo={match.home?.logo} size={SIZE_LOGO.md} />
      </HomeLogoContainer>
      <MatchContentContainer>
        <MatchHeader mode={match.mode} date={match.date} round={match.round} />
        <MatchContent match={match} />
      </MatchContentContainer>
      <AwayLogoContainer>
        <TeamLogo teamLogo={match.away?.logo} size={SIZE_LOGO.md} />
      </AwayLogoContainer>
    </MatchContainer>
  );
};

export default MatchSummary;
