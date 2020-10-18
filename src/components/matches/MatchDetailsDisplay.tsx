import React from "react";
import { matchModeConst } from "../../const/matchConst";

import trophy from "../../images/logo/tournament_logo_trophy2.png";
import { Match } from "../../structures/dbAPI/matchData";
import {
  MatchDisplayContainerStyled,
  TeamLogoStyled,
  MatchDisplayTeamNameStyled,
  MatchDisplayResultContainerStyled,
  MatchDisplayResultGoalStyled,
  MatchDisplayTeamContainerStyled,
} from "../../styled/styledMatch";

export interface MatchDetailsDisplayProps {
  match: Match;
}

const MatchDetailsDisplay: React.FC<MatchDetailsDisplayProps> = ({ match }) => {
  console.log(match);
  const isStarted: boolean = match.mode !== matchModeConst.notStarted;
  return (
    <MatchDisplayContainerStyled>
      <MatchDisplayTeamContainerStyled>
        <TeamLogoStyled
          src={match.home?.logo ? match.home?.logo : trophy}
          alt="logo"
        />
        <MatchDisplayTeamNameStyled>
          {match.home ? match.home?.name : match.placeholder.home}
        </MatchDisplayTeamNameStyled>
      </MatchDisplayTeamContainerStyled>
      <MatchDisplayResultContainerStyled>
        <MatchDisplayResultGoalStyled>
          {isStarted ? match.result?.home : undefined}
        </MatchDisplayResultGoalStyled>
        <p>vs</p>
        <MatchDisplayResultGoalStyled>
          {isStarted ? match.result?.away : undefined}
        </MatchDisplayResultGoalStyled>
      </MatchDisplayResultContainerStyled>
      <MatchDisplayTeamContainerStyled>
        <TeamLogoStyled
          src={match.away?.logo ? match.away?.logo : trophy}
          alt="logo"
        />
        <MatchDisplayTeamNameStyled>
          {match.away ? match.away?.name : match.placeholder.away}
        </MatchDisplayTeamNameStyled>
      </MatchDisplayTeamContainerStyled>
    </MatchDisplayContainerStyled>
  );
};

export default MatchDetailsDisplay;
