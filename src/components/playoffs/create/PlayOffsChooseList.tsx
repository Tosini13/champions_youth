import React from "react";

import { ChooseListStyled } from "../../../styled/styledBracket";
import PlayOffsChooseListElement from "./PlayOffsChooseListElement";
import { TeamData } from "../../../models/teamData";

type Props = {
  list: TeamData[]; // | PromotedTeam[]
  chosenTeams: TeamData[]; // | PromotedTeam[]
  setChosenTeams: (teams: TeamData[]) => void; // | PromotedTeam[]
};

const PlayOffsChooseList: React.FC<Props> = ({
  list,
  chosenTeams,
  setChosenTeams,
}) => {
  const addToChosenTeams = (element: TeamData) => {
    // | PromotedTeam
    if (chosenTeams.includes(element)) {
      setChosenTeams([...chosenTeams.filter((chosen) => chosen !== element)]);
    } else {
      setChosenTeams([...chosenTeams, element]);
    }
  };

  return (
    <ChooseListStyled>
      {list.map((element) => (
        <PlayOffsChooseListElement
          key={element.id}
          element={element}
          selected={chosenTeams.includes(element)}
          addToChosenTeams={addToChosenTeams}
        />
      ))}
    </ChooseListStyled>
  );
};

export default PlayOffsChooseList;
