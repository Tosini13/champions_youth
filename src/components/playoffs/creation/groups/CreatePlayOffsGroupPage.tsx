import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { GroupModel } from "../../../../NewModels/Group";
import { NewPlaceholder } from "../../../../NewModels/Team";

import { Id } from "../../../../const/structuresConst";
import {
  createPlayOffGroup,
  updateGroupPromoted,
  UpdateGroupPromotedParams,
} from "../../../../store/actions/GroupActions";
import { LOCALE } from "../../../../locale/config";
import CreatePlayOffsGroupScreen from "./CreatePlayOffsGroupScreen";
import { useHistory } from "react-router-dom";

export type PromotedGroup = {
  teams: NewPlaceholder[];
  name: string;
  id: Id;
};

export interface CreatePlayOffsGroupPageProps {
  groups?: GroupModel[];
  tournamentId: Id;
  createGroup: (tournamentId: Id, group: GroupModel) => void;
  locale: LOCALE;
  userId: Id;
  doesGroupsExist: boolean;
  updateGroupPromoted: ({
    tournamentId,
    groupId,
    playOffs,
    playOffsGroup,
  }: UpdateGroupPromotedParams) => void;
}

const CreatePlayOffsGroupPage: React.SFC<CreatePlayOffsGroupPageProps> = ({
  groups,
  tournamentId,
  createGroup,
  locale,
  userId,
  doesGroupsExist,
  updateGroupPromoted,
}) => {
  const history = useHistory();
  if (doesGroupsExist) {
    console.log("history");
    history.push("/");
  }
  const mockDate = "01/01/2021"; // todo: change on real date
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
      updateGroupPromoted={updateGroupPromoted}
      locale={locale}
      userId={userId}
      startDate={mockDate}
      teamsQtt={teamsQtt}
    />
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    groups: state.firestore.ordered.groups,
    locale: state.dictionary.locale,
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
