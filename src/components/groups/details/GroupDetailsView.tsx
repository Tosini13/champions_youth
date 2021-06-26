import React, { useState } from "react";

import { Id } from "../../../const/structuresConst";
import { GroupModel } from "../../../NewModels/Group";
import { UpdateMatch } from "../../../store/actions/MatchActions";
import {
  TResetNextGames,
  UpdateGame,
} from "../../../store/actions/GameActions";
import { getPromoted } from "../../../structures/groupPromotion";
import { matchGame } from "../../../store/actions/PlayOffsActions";
import GroupTableView from "./table/GroupTableView";
import GroupMatchesView from "./GroupMatches";
import { Hidden } from "@material-ui/core";
import { UpdatePlayOffsGroupTeamsParams } from "../../../store/actions/GroupActions";
import {
  DesktopMainContainerStyled,
  DesktopMainDividerStyled,
  DesktopMainItemStyled,
  SectionContentStyled,
  SectionNavStyled,
  SectionStyled,
} from "../../../styled/styledLayout";
import { Placeholder } from "../../../NewModels/Team";
import GroupDetailsNav from "./GroupDetailsNav";
import { useNotification } from "../../global/Notification";
import {
  E_GROUP_MENU,
  useTournamentNav,
} from "../../../hooks/useTournamentNavs";

export interface GroupDetailsViewProps {
  isOwner: boolean;
  tournamentId: Id;
  groupId: Id;
  group: GroupModel;
  playOffsGroups?: GroupModel[];
  updateMatch: ({
    tournamentId,
    groupId,
    gameId,
    matchId,
    mode,
    result,
    homeTeam,
    awayTeam,
  }: UpdateMatch) => void;
  updateGame: ({
    tournamentId,
    gameId,
    homeTeam,
    awayTeam,
    returnMatch,
  }: UpdateGame) => void;
  updateGroupMode: (tournamentId: Id, groupId: Id, finished: boolean) => void;
  updatePlayOffsGroupTeams: ({
    tournamentId,
    groupId,
    groupTeams,
  }: UpdatePlayOffsGroupTeamsParams) => void;
  resetNextGames?: ({
    tournamentId,
    teamsId,
    gamesId,
  }: TResetNextGames) => void;
}

const GroupDetailsView: React.FC<GroupDetailsViewProps> = ({
  isOwner,
  tournamentId,
  groupId,
  group,
  playOffsGroups,
  updateMatch,
  updateGame,
  updateGroupMode,
  updatePlayOffsGroupTeams,
  resetNextGames,
}) => {
  const { setQuestion, setAnswers, openNotification } = useNotification();
  const { matches } = group;
  const { getLocalStorageGroupNav } = useTournamentNav();
  const [view, setView] = useState<E_GROUP_MENU>(
    getLocalStorageGroupNav() || E_GROUP_MENU.TABLE
  );

  const handleFinishGroupNotification = () => {
    setQuestion("doFinishGroup");
    setAnswers([
      {
        title: "yes",
        action: handleFinishGroup,
      },
      {
        title: "no",
      },
    ]);
    openNotification();
  };

  const handleContinueGroupsNotification = () => {
    setQuestion("doContinueGroups");
    setAnswers([
      {
        title: "yes",
        action: handleContinueGroups,
      },
      {
        title: "no",
      },
    ]);
    openNotification();
  };

  const handleFinishGroup = () => {
    const promoted = getPromoted(group?.teams, matches) as Placeholder[];
    group?.playOffs?.forEach((promotedTeam) => {
      let homeTeam: Id | undefined = undefined;
      let awayTeam: Id | undefined = undefined;
      const teamId = promoted[promotedTeam.place - 1].id;

      if (promotedTeam.home) {
        homeTeam = teamId;
      } else {
        awayTeam = teamId;
      }

      if (teamId) {
        updateGroupMode(tournamentId, groupId, true);
        updateGame({
          tournamentId,
          gameId: promotedTeam.gameId,
          homeTeam,
          awayTeam,
          returnMatch: false,
        });
        updateMatch({
          tournamentId,
          gameId: promotedTeam.gameId,
          matchId: matchGame.match,
          homeTeam,
          awayTeam,
        });
      }
    });
    if (playOffsGroups?.length) {
      let groupsTeams = playOffsGroups.map((playOffsGroup) => ({
        id: playOffsGroup.id,
        groupTeams: playOffsGroup.groupTeams?.map((groupTeam) => {
          return {
            ...groupTeam,
          };
        }),
      }));
      group.playOffsGroup?.forEach((promotedTeam) => {
        groupsTeams.forEach((groupTeams) => {
          if (groupTeams.id === promotedTeam.group.id) {
            groupTeams.groupTeams?.forEach((team) => {
              if (
                team.group?.place === promotedTeam.place &&
                team.group?.id === group.id
              ) {
                team.id = promoted[promotedTeam.place - 1].id;
              }
            });
          }
        });
      });
      updateGroupMode(tournamentId, groupId, true);
      groupsTeams.forEach((groupTeams) => {
        updatePlayOffsGroupTeams({
          tournamentId,
          groupId: groupTeams.id,
          groupTeams: groupTeams.groupTeams,
        });
      });
    }
  };

  const handleContinueGroups = () => {
    const promoted = getPromoted(group?.teams, matches) as Placeholder[];
    if (group?.playOffs && resetNextGames) {
      updateGroupMode(tournamentId, groupId, false);
      const teamsId = group?.playOffs?.map(
        (promotedTeam) => promoted[promotedTeam.place - 1].id ?? ""
      );
      const gamesId = group?.playOffs?.map(
        (promotedTeam) => promotedTeam.gameId
      );
      resetNextGames({ tournamentId, teamsId, gamesId });
    }
    if (playOffsGroups?.length) {
      let groupsTeams = playOffsGroups.map((playOffsGroup) => ({
        id: playOffsGroup.id,
        groupTeams: playOffsGroup.groupTeams?.map((groupTeam) => ({
          ...groupTeam,
        })),
      }));
      group.playOffsGroup?.forEach((promotedTeam) => {
        groupsTeams.forEach((groupTeams) => {
          if (groupTeams.id === promotedTeam.group.id) {
            groupTeams.groupTeams?.forEach((team) => {
              if (
                team.group?.place === promotedTeam.place &&
                team.group?.id === group.id
              ) {
                team.id = undefined;
              }
            });
          }
        });
      });
      updateGroupMode(tournamentId, groupId, false);
      groupsTeams.forEach((groupTeams) => {
        updatePlayOffsGroupTeams({
          tournamentId,
          groupId: groupTeams.id,
          groupTeams: groupTeams.groupTeams,
        });
      });
    }
  };

  if (!group.teams.length) {
    return (
      <>
        <Hidden mdUp>
          <SectionStyled>
            <SectionNavStyled>
              <GroupDetailsNav value={view} setValue={setView} />
            </SectionNavStyled>
            <SectionContentStyled navQty={1}>
              {view === E_GROUP_MENU.TABLE ? (
                <GroupTableView
                  isOwner={isOwner}
                  group={group}
                  handleFinishGroup={
                    playOffsGroups && handleFinishGroupNotification // BUTTON REMOVED FROM PLAYOFFS
                  }
                  handleContinueGroup={
                    playOffsGroups && handleContinueGroupsNotification
                  }
                />
              ) : null}
              {view === E_GROUP_MENU.MATCHES ? (
                <GroupMatchesView
                  tournamentId={tournamentId}
                  groupId={groupId}
                  matches={matches}
                />
              ) : null}
            </SectionContentStyled>
          </SectionStyled>
        </Hidden>
        <Hidden smDown>
          <DesktopMainContainerStyled>
            <DesktopMainItemStyled>
              <GroupTableView
                isOwner={isOwner}
                group={group}
                handleFinishGroup={
                  playOffsGroups && handleFinishGroupNotification
                }
                handleContinueGroup={
                  playOffsGroups && handleContinueGroupsNotification
                }
              />
            </DesktopMainItemStyled>
            <DesktopMainItemStyled>
              <GroupMatchesView
                tournamentId={tournamentId}
                groupId={groupId}
                matches={matches}
              />
            </DesktopMainItemStyled>
          </DesktopMainContainerStyled>
        </Hidden>
      </>
    );
  }
  return (
    <>
      <Hidden mdUp>
        <SectionStyled>
          <SectionNavStyled>
            <GroupDetailsNav value={view} setValue={setView} />
          </SectionNavStyled>
          <SectionContentStyled>
            {view === E_GROUP_MENU.TABLE ? (
              <GroupTableView
                isOwner={isOwner}
                group={group}
                handleFinishGroup={handleFinishGroupNotification}
                handleContinueGroup={handleContinueGroupsNotification}
              />
            ) : null}
            {view === E_GROUP_MENU.MATCHES ? (
              <GroupMatchesView
                tournamentId={tournamentId}
                groupId={groupId}
                matches={matches}
              />
            ) : null}
          </SectionContentStyled>
        </SectionStyled>
      </Hidden>
      <Hidden smDown>
        <DesktopMainContainerStyled>
          <DesktopMainItemStyled>
            <GroupTableView
              isOwner={isOwner}
              group={group}
              handleFinishGroup={handleFinishGroupNotification}
              handleContinueGroup={handleContinueGroupsNotification}
            />
          </DesktopMainItemStyled>
          <DesktopMainDividerStyled />
          <DesktopMainItemStyled>
            <GroupMatchesView
              tournamentId={tournamentId}
              groupId={groupId}
              matches={matches}
            />
          </DesktopMainItemStyled>
        </DesktopMainContainerStyled>
      </Hidden>
    </>
  );
};

export default GroupDetailsView;
