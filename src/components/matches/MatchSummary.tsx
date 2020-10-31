import React, { useState } from "react";

import { BracketRoundTitleStyled } from "../../styled/styledBracket";
import MatchDetails from "./MatchDetails";
import {
  BracketMatchContainerStyled,
  BracketMatchTeamsContainerStyled,
  MatchResultContainerStyled,
  MatchResultScoreStyled,
  MatchTeamsAndResultStyled,
} from "../../styled/styledMatches";
import { matchModeConst } from "../../const/matchConst";
import { GameStructure } from "../../structures/game";
import { MatchData } from "../../structures/match";
import { TeamData } from "../../models/teamData";

type Props = {
  game?: GameStructure;
  match: MatchData;
  teams: TeamData[];
};

const MatchSummary: React.FC<Props> = ({ match, teams, game }) => {
  console.log(match.id);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const home = teams.find((team) => team.id === match.home?.id);
  const away = teams.find((team) => team.id === match.away?.id);
  return (
    <>
      <BracketMatchContainerStyled onClick={handleOpen}>
        {match.round ? (
          <BracketRoundTitleStyled live={match.mode === matchModeConst.live}>
            {match.round}
          </BracketRoundTitleStyled>
        ) : null}
        <MatchTeamsAndResultStyled>
          <BracketMatchTeamsContainerStyled>
            <p>{home ? home.name : match.placeholder.home}</p>
            <p>vs</p>
            <p>{away ? away.name : match.placeholder.away}</p>
          </BracketMatchTeamsContainerStyled>
          <MatchResultContainerStyled>
            <MatchResultScoreStyled>
              {match.result?.home}
            </MatchResultScoreStyled>
            :
            <MatchResultScoreStyled>
              {match.result?.away}
            </MatchResultScoreStyled>
          </MatchResultContainerStyled>
        </MatchTeamsAndResultStyled>
      </BracketMatchContainerStyled>
      {/* <MatchDetails
        match={match}
        open={open}
        setOpen={setOpen}
        gameIsFinished={game?.isFinished}
      /> */}
    </>
  );
};

export default MatchSummary;
