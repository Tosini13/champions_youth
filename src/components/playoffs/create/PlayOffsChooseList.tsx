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
  const addToChosenTeams = (element: TeamData | PromotedTeam) => {
    if (groups?.length) {
      addPromoted(element as PromotedTeam);
    } else {
      addTeam(element as TeamData);
    }
  };

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

  const addPromoted = (promoted: PromotedTeam) => {
    // if (chosenTeams.includes(promoted)) {
    //   if (gameTeam === promoted) {
    //     setChosenTeams([
    //       ...chosenTeams.filter((chosen) => chosen !== promoted),
    //     ]);
    //     handleChooseTeam(undefined);
    //   }
    // } else {
    //   if (gameTeam && chosenTeams.includes(gameTeam)) {
    //     setChosenTeams([
    //       ...chosenTeams.filter((chosen) => chosen !== gameTeam),
    //       promoted,
    //     ]);
    //   } else {
    //     setChosenTeams([...chosenTeams, promoted]);
    //   }
    //   handleChooseTeam(promoted);
    // }
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
          {group.promoted.map((promoted, i) => {
            console.log(promoted);
            return <p key={i}>{promoted.name}</p>;
          })}
        </div>
      ))}
    </ChooseListStyled>
  );
};

export default PlayOffsChooseList;
