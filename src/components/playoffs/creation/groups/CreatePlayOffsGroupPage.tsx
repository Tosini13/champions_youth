import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { GroupModel } from "../../../../NewModels/Group";
import { NewPlaceholder } from "../../../../NewModels/Team";

import { Id } from "../../../../const/structuresConst";
import {
  createPlayOffGroup,
  createPlayOffsGroupsGeneralInfo,
  updateGroupPromoted,
  UpdateGroupPromotedParams,
} from "../../../../store/actions/GroupActions";
import CreatePlayOffsGroupScreen from "./CreatePlayOffsGroupScreen";
import { useHistory } from "react-router-dom";
import { calculateGroupsFinishDate } from "../../../../utils/calculateGroupsFinishDate";
import SplashScreen from "../../../global/SplashScreen";
import { SettingType } from "../../../groups/creation/CreateGroupsScreen";

export type PromotedGroup = {
  teams: NewPlaceholder[];
  name: string;
  id: Id;
};

export interface CreatePlayOffsGroupPageProps {
  groups?: GroupModel[];
  tournamentId: Id;
  createGroup: (tournamentId: Id, group: GroupModel) => void;
  userId: Id;
  doesGroupsExist: boolean;
  updateGroupPromoted: ({
    tournamentId,
    groupId,
    playOffs,
    playOffsGroup,
  }: UpdateGroupPromotedParams) => void;
  createGeneralInfo: (tournamentId: Id, settings: SettingType) => void;
}

const CreatePlayOffsGroupPage: React.SFC<CreatePlayOffsGroupPageProps> = ({
  groups,
  tournamentId,
  createGroup,
  userId,
  doesGroupsExist,
  updateGroupPromoted,
  createGeneralInfo,
}) => {
  const history = useHistory();
  if (groups === undefined) {
    return <SplashScreen />;
  }

  const groupsFinishDate = calculateGroupsFinishDate(groups);

  if (doesGroupsExist) {
    console.info("Group does not exists!");
    history.push("/");
  }
  let teamsQtt = 0;
  const promotedGroups: PromotedGroup[] =
    groups?.map((group) => {
      teamsQtt += group.teams.length;
      return {
        id: group.id,
        name: group.name,
        teams:
          group.promoted?.map((team) => ({
            id: group.id,
            place: team.place,
          })) ?? [],
      };
    }) ?? [];

  return (
    <CreatePlayOffsGroupScreen
      promotedGroups={promotedGroups}
      tournamentId={tournamentId}
      createGroup={createGroup}
      createGeneralInfo={createGeneralInfo}
      updateGroupPromoted={updateGroupPromoted}
      userId={userId}
      startDate={groupsFinishDate}
      teamsQtt={teamsQtt}
    />
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    groups: state.firestore.ordered.groups,
    userId: state.firebase.auth.uid,
    tournamentId: ownProps.match.params.tournamentId,
    doesGroupsExist: Boolean(state.firestore.ordered.playOffsGroups?.length),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createGroup: (tournamentId: Id, group: GroupModel) =>
      dispatch(createPlayOffGroup(tournamentId, group)),
    updateGroupPromoted: ({
      tournamentId,
      groupId,
      playOffs,
      playOffsGroup,
    }: UpdateGroupPromotedParams) =>
      dispatch(
        updateGroupPromoted({ tournamentId, groupId, playOffs, playOffsGroup })
      ),
    createGeneralInfo: (tournamentId: Id, settings: SettingType) =>
      dispatch(createPlayOffsGroupsGeneralInfo(tournamentId, settings)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: any) => {
    return [
      { collection: "tournaments" },
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [{ collection: "groups", orderBy: ["name", "asc"] }],
        storeAs: "groups",
      },
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [
          { collection: "playOffsGroups", orderBy: ["name", "asc"] },
        ],
        storeAs: "playOffsGroups",
      },
    ];
  })
)(CreatePlayOffsGroupPage);
