import { Id } from "../../const/structuresConst";
import { GroupDataDb } from "../../models/groupData";
import { MatchDataDb } from "../../structures/dbAPI/matchData";

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
        console.log(matches);
        matches?.forEach((match) => {
          console.log(match);
          firestore
            .collection("tournaments")
            .doc(tournamentId)
            .collection("groups")
            .doc(res.id)
            .collection("matches")
            .doc(match.id?.toString())
            .set({
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
