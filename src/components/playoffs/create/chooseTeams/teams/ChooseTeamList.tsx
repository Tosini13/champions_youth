import React from "react";

import { ChooseListStyled } from "../../../../../styled/styledBracket";
import PlayOffsChooseListElement from "./ChooseTeamListElement";
import { TeamData } from "../../../../../models/teamData";
import { TeamsList } from "../../../../../styled/styledComponents/teams/styledLayout";

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
        console.log("handleChooseTeam");
      }
      console.log("no handleChooseTeam");
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
      console.log("handleChooseTeam");
    }
  };

  return (
    <TeamsList>
      {teams?.map((element) => (
        <PlayOffsChooseListElement
          key={element.id}
          team={element}
          selected={chosenTeams.includes(element)}
          addToChosenTeams={addTeam}
          disabled={Boolean(
            chosenTeams.includes(element) && gameTeam !== element
          )}
        />
      ))}
    </TeamsList>
  );
};

export default PlayOffsChooseList;
