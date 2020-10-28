import React from "react";

import { ChooseListStyled } from "../../../../../styled/styledBracket";
import { TeamData } from "../../../../../models/teamData";
import {
  Placeholder,
  PromotedGroupsTeams,
  PromotedTeam,
} from "../../../../../const/groupConst";
import { Group } from "../../../../../models/groupData";
import ChoosePromotedListElement from "./ChoosePromotedListElement";
import { Id } from "../../../../../const/structuresConst";

type Props = {
  groups?: Group[];
  chosenTeams: Placeholder[];
  setChosenTeams: (teams: Placeholder[]) => void;
  handleChooseTeam: (groupId: Id, team?: Placeholder) => void;
  gameTeam?: Placeholder;
};

const ChoosePromotedList: React.FC<Props> = ({
  groups,
  chosenTeams,
  setChosenTeams,
  handleChooseTeam,
  gameTeam,
}) => {
  const addTeam = (team: PromotedTeam, groupId: Id) => {
    const game = {
      ...team,
      id: groupId,
    };
    if (
      gameTeam &&
      doesChosenTeamsIncludes(game.place, game.id) &&
      !comparePlaceholders(gameTeam, game)
    ) {
      return false;
    }
    console.log(team);

    if (doesChosenTeamsIncludes(game.place, game.id)) {
      if (gameTeam && comparePlaceholders(gameTeam, game)) {
        setChosenTeams([
          ...chosenTeams.filter((chosen) => !comparePlaceholders(chosen, game)),
        ]);
        handleChooseTeam(groupId, undefined);
      }
    } else {
      if (gameTeam && doesChosenTeamsIncludes(gameTeam.place, gameTeam.id)) {
        setChosenTeams([
          ...chosenTeams.filter(
            (chosen) => !comparePlaceholders(chosen, gameTeam)
          ),
          game,
        ]);
      } else {
        setChosenTeams([...chosenTeams, game]);
      }
      handleChooseTeam(groupId, game);
    }
  };

  const doesChosenTeamsIncludes = (place: number, id?: Id | null) => {
    return Boolean(
      chosenTeams.find((chosen) => {
        return chosen.id === id && chosen.place === place;
      })
    );
  };

  const comparePlaceholders = (a: Placeholder, b: Placeholder) => {
    return a.id === b.id && a.place === b.place;
  };

  return (
    <ChooseListStyled>
      {groups?.map((group) => (
        <div key={group.id}>
          <p>{group.name}</p>
          {group.promoted.map((team, id) => (
            <ChoosePromotedListElement
              key={id}
              groupId={group.id}
              element={team}
              selected={doesChosenTeamsIncludes(team.place, group.id)}
              addToChosenTeams={addTeam}
            />
          ))}
        </div>
      ))}
    </ChooseListStyled>
  );
};

export default ChoosePromotedList;
