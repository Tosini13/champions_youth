import React from "react";

import { ChooseListStyled } from "../../../../../styled/styledBracket";
import PlayOffsChooseListElement from "./ChooseTeamListElement";
import { TeamData } from "../../../../../models/teamData";

type Props = {
  teams?: TeamData[];
  chosenTeams: TeamData[];
  setChosenTeams: (teams: TeamData[]) => void;
  handleChooseTeam: (team?: TeamData) => void;
  gameTeam?: TeamData;
};

const PlayOffsChooseList: React.FC<Props> = ({
  teams,
  chosenTeams,
  setChosenTeams,
  handleChooseTeam,
  gameTeam,
}) => {
  const addTeam = (team: TeamData) => {
    if (chosenTeams.includes(team)) {
      if (gameTeam === team) {
        setChosenTeams([...chosenTeams.filter((chosen) => chosen !== team)]);
        handleChooseTeam(undefined);
      }
    } else {
      if (gameTeam && chosenTeams.includes(gameTeam)) {
        setChosenTeams([
          ...chosenTeams.filter((chosen) => chosen !== gameTeam),
          team,
        ]);
      } else {
        setChosenTeams([...chosenTeams, team]);
      }
      handleChooseTeam(team);
    }
  };

  return (
    <ChooseListStyled>
      {teams?.map((element) => (
        <PlayOffsChooseListElement
          key={element.id}
          element={element}
          selected={chosenTeams.includes(element)}
          addToChosenTeams={addTeam}
        />
      ))}
    </ChooseListStyled>
  );
};

export default PlayOffsChooseList;
