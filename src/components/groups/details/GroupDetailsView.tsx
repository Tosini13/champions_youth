import React from "react";

import { Id } from "../../../const/structuresConst";
import { GroupModel } from "../../../NewModels/Group";
import { UpdateMatch } from "../../../store/actions/MatchActions";
import { UpdateGame } from "../../../store/actions/GameActions";
import { getPromoted } from "../../../structures/groupPromotion";
import { matchGame } from "../../../store/actions/PlayOffsActions";
import GroupTableView from "./table/GroupTableView";
import GroupMatchesView from "./GroupMatches";
import SliderGlobal from "../../global/Slider";
import { Hidden } from "@material-ui/core";
import { UpdatePlayOffsGroupTeamsParams } from "../../../store/actions/GroupActions";
import {
  DesktopMainContainerStyled,
  DesktopMainDividerStyled,
  DesktopMainItemStyled,
} from "../../../styled/styledLayout";

export interface GroupDetailsViewProps {
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
}

const GroupDetailsView: React.FC<GroupDetailsViewProps> = ({
  tournamentId,
  groupId,
  group,
  playOffsGroups,
  updateMatch,
  updateGame,
  updateGroupMode,
  updatePlayOffsGroupTeams,
}) => {
  const { matches } = group;

  const handleFinishGroup = () => {
    const promoted = getPromoted(group?.teams, matches);
    group?.playOffs?.forEach((promotedTeam) => {
      let homeTeam = undefined;
      let awayTeam = undefined;
      const teamId = promoted[promotedTeam.place - 1];
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
                team.id = promoted[promotedTeam.place - 1];
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

  const handleContinueGroup = () => {
    const promoted = getPromoted(group?.teams, matches);
    group?.playOffs?.forEach((promotedTeam) => {
      let homeTeam: undefined | null = undefined;
      let awayTeam: undefined | null = undefined;
      const teamId = promoted[promotedTeam.place - 1];
      if (promotedTeam.home) {
        homeTeam = null;
      } else {
        awayTeam = null;
      }
      if (teamId) {
        updateGroupMode(tournamentId, groupId, false);
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
          <SliderGlobal
            components={[
              {
                title: "table",
                component: (
                  <GroupTableView
                    group={group}
                    handleFinishGroup={handleFinishGroup}
                    handleContinueGroup={handleContinueGroup}
                  />
                ),
              },
              {
                title: "matches",
                component: (
                  <GroupMatchesView
                    tournamentId={tournamentId}
                    groupId={groupId}
                    matches={matches}
                  />
                ),
              },
            ]}
          />
        </Hidden>
        <Hidden smDown>
          <DesktopMainContainerStyled>
            <DesktopMainItemStyled>
              <GroupTableView
                group={group}
                handleFinishGroup={handleFinishGroup}
                handleContinueGroup={handleContinueGroup}
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
        <SliderGlobal
          components={[
            {
              title: "table",
              component: (
                <GroupTableView
                  group={group}
                  handleFinishGroup={handleFinishGroup}
                  handleContinueGroup={handleContinueGroup}
                />
              ),
            },
            {
              title: "matches",
              component: (
                <GroupMatchesView
                  tournamentId={tournamentId}
                  groupId={groupId}
                  matches={matches}
                />
              ),
            },
          ]}
        />
      </Hidden>
      <Hidden smDown>
        <DesktopMainContainerStyled>
          <DesktopMainItemStyled>
            <GroupTableView
              group={group}
              handleFinishGroup={handleFinishGroup}
              handleContinueGroup={handleContinueGroup}
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
