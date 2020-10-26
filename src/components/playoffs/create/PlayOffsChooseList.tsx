import React from "react";

import { ChooseListStyled } from "../../../styled/styledBracket";
import PlayOffsChooseListElement from "./PlayOffsChooseListElement";
import { TeamData } from "../../../models/teamData";
import { PromotedGroupsTeams, PromotedTeam } from "../../../const/groupConst";
import { Group } from "../../../models/groupData";

type Props = {
  teams?: TeamData[];
  groups?: Group[];
  chosenTeams: TeamData[]; // | PromotedTeam[]
  setChosenTeams: (teams: TeamData[]) => void; // | PromotedTeam[]
  handleChooseTeam: (team?: TeamData) => void;
  gameTeam?: TeamData;
};

const PlayOffsChooseList: React.FC<Props> = ({
  teams,
  groups,
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
      {groups === undefined &&
        teams?.map((element) => (
          <PlayOffsChooseListElement
            key={element.id}
            element={element}
            selected={chosenTeams.includes(element)}
            addToChosenTeams={addToChosenTeams}
          />
        ))}
      {groups?.map((group) => (
        <div key={group.id}>
          {group.promoted.map((promoted, i) => (
            <p key={i}>{promoted.name}</p>
          ))}
        </div>
      ))}
    </ChooseListStyled>
  );
};

export default PlayOffsChooseList;
