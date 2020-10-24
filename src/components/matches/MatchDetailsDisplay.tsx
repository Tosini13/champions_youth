import React, { useState, useEffect } from "react";
import { matchModeConst } from "../../const/matchConst";
import { Id } from "../../const/structuresConst";

import trophy from "../../images/logo/tournament_logo_trophy2.png";
import { Match } from "../../structures/dbAPI/matchData";
import { LogoLargeStyled } from "../../styled/styledLayout";
import {
  MatchDisplayContainerStyled,
  MatchDisplayTeamNameStyled,
  MatchDisplayResultContainerStyled,
  MatchDisplayResultGoalStyled,
  MatchDisplayTeamContainerStyled,
} from "../../styled/styledMatch";
import { getImage } from "../tournaments/actions/getImage";

export interface MatchDetailsDisplayProps {
  match: Match;
  authorId: Id;
}

const MatchDetailsDisplay: React.FC<MatchDetailsDisplayProps> = ({
  match,
  authorId,
}) => {
  const [imageHome, setImageHome] = useState<any>(null);
  const [imageAway, setImageAway] = useState<any>(null);

  useEffect(() => {
    if (match.home?.logo && authorId) {
      const image = getImage(match.home?.logo, authorId);
      setImageHome(image);
    }

    if (match.away?.logo && authorId) {
      const image = getImage(match.away?.logo, authorId);
      setImageAway(image);
    }
  }, [match, authorId]);

  const isStarted: boolean = match.mode !== matchModeConst.notStarted;
  return (
    <MatchDisplayContainerStyled>
      <MatchDisplayTeamContainerStyled>
        <LogoLargeStyled src={imageHome ? imageHome : trophy}></LogoLargeStyled>
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
        <LogoLargeStyled src={imageAway ? imageAway : trophy}></LogoLargeStyled>
        <MatchDisplayTeamNameStyled>
          {match.away ? match.away?.name : match.placeholder.away}
        </MatchDisplayTeamNameStyled>
      </MatchDisplayTeamContainerStyled>
    </MatchDisplayContainerStyled>
  );
};

export default MatchDetailsDisplay;
