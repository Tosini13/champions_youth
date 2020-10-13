import { Id } from "../../const/structuresConst";
import { GroupDataDb } from "../../structures/dbAPI/groupData";
import { MatchDataDb } from "../../structures/dbAPI/matchData";

export const createGroup = (
  tournamentId: Id,
  group: GroupDataDb,
  matches: MatchDataDb[]
) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    console.log(tournamentId, group, matches);
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
        matches.forEach((match) => {
          firestore
            .collection("tournaments")
            .doc(tournamentId)
            .collection("groups")
            .doc(res.id)
            .collection("matches")
            .add({
              ...match,
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
        dispatch({ type: "ADD_TEAM_TO_TOURNAMENT_ERROR", err });
      });
  };
};
