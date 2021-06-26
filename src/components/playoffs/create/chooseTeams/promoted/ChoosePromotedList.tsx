import React from "react";

import { ChooseListStyled } from "../../../../../styled/styledBracket";
import { Group } from "../../../../../models/groupData";
import ChoosePromotedListElement from "./ChoosePromotedListElement";
import { Id } from "../../../../../const/structuresConst";
import { Placeholder, PromotedTeam } from "../../../../../NewModels/Team";
import { TeamsList } from "../../../../../styled/styledComponents/teams/styledLayout";
import { TypographyPrimaryText } from "../../../../../styled/styledComponents/styledTypography";
import { GroupHeaderContainer } from "../../../../../styled/styledComponents/group/styledLayout";

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
  const isDisabled = (team: PromotedTeam, groupId?: Id | null) => {
    const game = {
      ...team,
      id: groupId === null ? undefined : groupId,
    };
    return (
      (gameTeam &&
        !comparePlaceholders(gameTeam, game) &&
        doesChosenTeamsIncludes(team.place, groupId)) ||
      (!gameTeam && doesChosenTeamsIncludes(team.place, groupId))
    );
  };

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

  const doesChosenTeamsIncludes = (place?: number | string, id?: Id | null) => {
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
          <GroupHeaderContainer>
            <TypographyPrimaryText align="center" style={{ color: "white" }}>
              {group.name}
            </TypographyPrimaryText>
          </GroupHeaderContainer>
          <TeamsList>
            {group.promoted.map((team, id) => (
              <ChoosePromotedListElement
                key={id}
                groupId={group.id}
                element={team}
                selected={doesChosenTeamsIncludes(team.place, group.id)}
                addToChosenTeams={addTeam}
                disabled={Boolean(isDisabled(team, group.id))}
              />
            ))}
          </TeamsList>
        </div>
      ))}
    </ChooseListStyled>
  );
};

export default ChoosePromotedList;
