import firebase from "firebase";
import { matchModeConst } from "../../const/matchConst";
import { Id } from "../../const/structuresConst";
import { GroupDataDb } from "../../models/groupData";
import { GroupTeamModel } from "../../models/teamData";
import { GroupModel, GroupPlayOffsGroup } from "../../NewModels/Group";
import { MatchDataDb } from "../../structures/dbAPI/matchData";

export const createPlayOffGroup = (tournamentId: Id, group: GroupModel) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("playOffsGroups")
      .doc(group.id)
      .set({
        name: group.name,
        teams: group.teams.map((team) => team.id),
        promoted: group.teams.map((team, i) => ({
          name: group.name,
          place: i + 1,
        })),
        finishAt: group.finishAt?.format(),
        placeholderTeams: group.placeholderTeams,
        groupTeams: group.groupTeams,
      })
      .then((res: any) => {
        dispatch({ type: "CREATE_GROUP" });
        group.matches?.forEach((match) => {
          firestore
            .collection("tournaments")
            .doc(tournamentId)
            .collection("playOffsGroups")
            .doc(group.id)
            .collection("matches")
            .doc(`Match${match.id}`)
            .set({
              home: match.home?.id,
              away: match.away?.id,
              date: match.date?.format(),
              mode: match.mode,
              result: match.result,
              round: match.round,
              groupPlaceholder: match.groupPlaceholder,
            })
            .then(() => {
              dispatch({ type: "CREATE_MATCHES_TO_GROUP" });
            })
            .catch((err: any) => {
              dispatch({ type: "CREATE_MATCHES_TO_GROUP_ERROR", err });
            });
        });
      })
      .catch((err: any) => {
        dispatch({ type: "CREATE_GROUP_ERROR", err });
      });
  };
};

export const createWholeGroup = (tournamentId: Id, group: GroupModel) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("groups")
      .doc(group.id)
      .set({
        name: group.name,
        teams: group.teams.map((team) => team.id),
        promoted: group.teams.map((team, i) => ({
          name: group.name,
          place: i + 1,
        })),
        finishAt: group.finishAt?.format(),
      })
      .then((res: any) => {
        dispatch({ type: "CREATE_GROUP" });
        group.matches?.forEach((match) => {
          firestore
            .collection("tournaments")
            .doc(tournamentId)
            .collection("groups")
            .doc(group.id)
            .collection("matches")
            .doc(`Match${match.id}`)
            .set({
              home: match.home?.id,
              away: match.away?.id,
              date: match.date?.format(),
              mode: match.mode,
              result: match.result,
              round: match.round,
            })
            .then(() => {
              dispatch({ type: "CREATE_MATCHES_TO_GROUP" });
            })
            .catch((err: any) => {
              dispatch({ type: "CREATE_MATCHES_TO_GROUP_ERROR", err });
            });
        });
      })
      .catch((err: any) => {
        dispatch({ type: "CREATE_GROUP_ERROR", err });
      });
  };
};

export const createGroup = (
  tournamentId: Id,
  group: GroupDataDb,
  matches?: MatchDataDb[]
) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("groups")
      .add({
        ...group,
      })
      .then((res: any) => {
        dispatch({ type: "CREATE_GROUP" });
        matches?.forEach((match) => {
          firestore
            .collection("tournaments")
            .doc(tournamentId)
            .collection("groups")
            .doc(res.id)
            .collection("matches")
            .doc(`Match${match.id}`)
            .set({
              home: match.home,
              away: match.away,
              date: match.date,
              mode: match.mode,
              result: match.result,
              round: match.round,
            })
            .then(() => {
              dispatch({ type: "CREATE_MATCHES_TO_GROUP" });
            })
            .catch((err: any) => {
              dispatch({ type: "CREATE_MATCHES_TO_GROUP_ERROR", err });
            });
        });
      })
      .catch((err: any) => {
        dispatch({ type: "CREATE_GROUP_ERROR", err });
      });
  };
};

export type GroupPlayOffs = {
  gameId: Id;
  place: number;
  home: boolean;
};
export type UpdateGroupPromotedParams = {
  tournamentId: Id;
  groupId: Id;
  playOffs?: GroupPlayOffs[];
  playOffsGroup?: GroupPlayOffsGroup[];
};
export const updateGroupPromoted = ({
  tournamentId,
  groupId,
  playOffs,
  playOffsGroup,
}: UpdateGroupPromotedParams) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("groups")
      .doc(groupId)
      .update({
        playOffs: playOffs ? playOffs : [],
        playOffsGroup: playOffsGroup ? playOffsGroup : [],
      })
      .then((res: any) => {
        dispatch({ type: "UPDATE_GROUP" });
      })
      .catch((err: any) => {
        dispatch({ type: "UPDATE_GROUP_ERROR", err });
      });
  };
};

export type UpdatePlayOffsGroupTeamsParams = {
  tournamentId: Id;
  groupId: Id;
  groupTeams?: GroupTeamModel[];
};
export const updatePlayOffsGroupTeams = ({
  tournamentId,
  groupId,
  groupTeams,
}: UpdatePlayOffsGroupTeamsParams) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    console.log('groupTeams', groupTeams);
    const firestore = getFirestore();
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("playOffsGroups")
      .doc(groupId)
      .update({
        groupTeams,
      })
      .then((res: any) => {
        firestore
        .collection("tournaments")
        .doc(tournamentId)
        .collection("playOffsGroups")
        .doc(groupId)
        .collection("matches")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            // console.log('doc fields',doc.xf.nn.proto.mapValue.fields);
            doc.ref
              .update({
                mode: matchModeConst.notStarted,
                result: {}
              })
              .catch((err) => {
                console.log("update", err);
              });
          });
        })
        .catch((err) => {
          console.log("get", err);
        });
        dispatch({ type: "UPDATE_GROUP" });
      })
      .catch((err: any) => {
        dispatch({ type: "UPDATE_GROUP_ERROR", err });
      });
  };
};

export type GroupMode = {
  gameId: Id;
  place: number;
  finished: boolean;
};
export const updateGroupMode = (
  tournamentId: Id,
  groupId: Id,
  finished: boolean
) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("groups")
      .doc(groupId)
      .update({
        finished: finished,
      })
      .then((res: any) => {
        dispatch({ type: "UPDATE_GROUP" });
      })
      .catch((err: any) => {
        dispatch({ type: "UPDATE_GROUP_ERROR", err });
      });
  };
};

export const deleteGroups = (
  tournamentId: Id,
  callBackSuccess?: () => void,
  callBackError?: () => void
) => {
  const path = `/tournaments/${tournamentId}/groups`;
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    var deleteFn = firebase.functions().httpsCallable("recursiveDelete");
    deleteFn({ path: path })
      .then(function (result) {
        if (callBackSuccess) {
          callBackSuccess();
        }
        dispatch({ type: "DELETE_ALL_GROUPS_FROM_TOURNAMENT" });
      })
      .catch(function (err) {
        if (callBackError) {
          callBackError();
        }
        dispatch({ type: "DELETE_ALL_GROUPS_FROM_TOURNAMENT_ERROR", err });
      });
  };
};

export type TContinueAllGroups = {
  tournamentId: Id;
};

export const continueAllGroups = ({ tournamentId }: TContinueAllGroups) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();

    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("groups")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref
            .update({
              finished: false,
            })
            .catch((err) => {
              console.log("update", err);
            });
        });
      })
      .catch((err) => {
        console.log("get", err);
      });
  };
};
