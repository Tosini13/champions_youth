import React from "react";

import { Id } from "../../../const/structuresConst";
import { GroupModel } from "../../../NewModels/Group";
import { UpdateMatch } from "../../../store/actions/MatchActions";
import { UpdateGame } from "../../../store/actions/GameActions";
import { getPromoted } from "../../../structures/groupPromotion";
import { matchGame } from "../../../store/actions/PlayOffsActions";
import GroupTableView from "./GroupTableView";
import GroupMatchesView from "./GroupMatches";
import TabsGlobal from "../../global/Tabs";

export interface GroupDetailsViewProps {
  tournamentId: Id;
  groupId: Id;
  group: GroupModel;
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
}

const GroupDetailsView: React.FC<GroupDetailsViewProps> = ({
  tournamentId,
  groupId,
  group,
  updateMatch,
  updateGame,
  updateGroupMode,
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
  };

  return (
    <>
      <TabsGlobal
        labels={["table", "matches"]}
        components={[
          <GroupTableView
            group={group}
            handleFinishGroup={handleFinishGroup}
            handleContinueGroup={handleContinueGroup}
          />,
          <GroupMatchesView
            tournamentId={tournamentId}
            groupId={groupId}
            matches={matches}
          />,
        ]}
      />
    </>
  );
};

export default GroupDetailsView;
