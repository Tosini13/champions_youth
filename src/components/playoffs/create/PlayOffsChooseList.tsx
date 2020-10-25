import React from "react";

import { ChooseListStyled } from "../../../styled/styledBracket";
import PlayOffsChooseListElement from "./PlayOffsChooseListElement";
import { TeamData } from "../../../models/teamData";

type Props = {
  list: TeamData[]; // | PromotedTeam[]
  chosenTeams: TeamData[]; // | PromotedTeam[]
  setChosenTeams: (teams: TeamData[]) => void; // | PromotedTeam[]
  handleChooseTeam: (team?: TeamData) => void;
  gameTeam?: TeamData;
};

const PlayOffsChooseList: React.FC<Props> = ({
  list,
  chosenTeams,
  setChosenTeams,
  handleChooseTeam,
  gameTeam,
}) => {
  const addToChosenTeams = (element: TeamData) => {
    // | PromotedTeam
    if (chosenTeams.includes(element)) {
      if (gameTeam === element) {
        setChosenTeams([...chosenTeams.filter((chosen) => chosen !== element)]);
        handleChooseTeam(undefined);
      }
    } else {
      if (gameTeam && chosenTeams.includes(gameTeam)) {
        setChosenTeams([
          ...chosenTeams.filter((chosen) => chosen !== gameTeam),
          element,
        ]);
      } else {
        setChosenTeams([...chosenTeams, element]);
      }
      handleChooseTeam(element);
    }
  };

  return (
    <ChooseListStyled>
      {list.map((element) => (
        <PlayOffsChooseListElement
          key={element.id}
          element={element}
          selected={chosenTeams.includes(element)}
          available={gameTeam !== element}
          addToChosenTeams={addToChosenTeams}
        />
      ))}
    </ChooseListStyled>
  );
};

export default PlayOffsChooseList;
