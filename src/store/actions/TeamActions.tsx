import firebase from "firebase";
import moment from "moment";
import {
  getImageUrl,
  setImageJustUploaded,
} from "../../components/tournaments/actions/getImage";
import { Id } from "../../const/structuresConst";
import { TeamCreateData, TeamData } from "../../models/teamData";

export const addTeamToTournament = (
  tournamentId: Id,
  team: TeamCreateData,
  image?: any
) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    const logoName = image ? `${moment().format()}${image.name}` : undefined;
    if (image && logoName) {
      image.name = logoName;
      setImageJustUploaded(logoName, URL.createObjectURL(image), tournamentId);
    }

    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("teams")
      .add({
        name: team.name,
        logo: logoName,
      })
      .then(() => {
        if (image) {
          const storageRef = firebase.storage().ref();
          const ref = storageRef.child(
            getImageUrl({
              tournamentId,
              imageName: image.name,
            })
          );
          ref
            .put(image)
            .then((res) =>
              dispatch({ type: "ADD_TEAM_TO_TOURNAMENT_IMAGE_UPLOADED" })
            )
            .catch((err) =>
              dispatch({ type: "ADD_TEAM_TO_TOURNAMENT_IMAGE_UPLOADED_ERROR" })
            );
        }
      })
      .catch((err: any) => {
        dispatch({ type: "ADD_TEAM_TO_TOURNAMENT_ERROR", err });
      });
  };
};

export const deleteTeamFromTournament = (tournamentId: Id, team: TeamData) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firestore = getFirestore();
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("teams")
      .doc(team.id)
      .delete()
      .then(() => {
        if (team.logo) {
          const storageRef = firebase.storage().ref();
          const desertRef = storageRef.child(
            getImageUrl({
              tournamentId,
              imageName: team.logo,
            })
          );
          desertRef
            .delete()
            .then(() => {
              dispatch({ type: "DELETE_TEAM_FROM_TOURNAMENT_DELETE_LOGO" });
            })
            .catch((error) => {
              dispatch({
                type: "DELETE_TEAM_FROM_TOURNAMENT_OK_DELETE_LOGO_ERROR",
              });
            });
        } else {
          dispatch({ type: "DELETE_TEAM_FROM_TOURNAMENT" });
        }
      })
      .catch((err: any) => {
        dispatch({ type: "DELETE_TEAM_FROM_TOURNAMENT_ERROR", err });
      });
  };
};

export type TEditTeam = {
  tournamentId: Id;
  teamId: Id;
  team: Omit<TeamData, "id">;
  oldLogo?: any;
  newLogo?: any;
};

export const editTeamFromTournament = ({
  team,
  teamId,
  tournamentId,
  newLogo,
  oldLogo,
}: TEditTeam) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const logoName = newLogo
      ? `${moment().format()}${newLogo.name}`
      : undefined;
    if (newLogo && logoName) {
      newLogo.name = logoName;
      setImageJustUploaded(
        logoName,
        URL.createObjectURL(newLogo),
        tournamentId
      );
    }
    const getImageName = () => {
      if (logoName) {
        return {
          logo: logoName,
        };
      }
      if (team.logo && !oldLogo) {
        return {
          logo: null,
        };
      }
      return {};
    };
    console.log("payload", {
      ...team,
      ...getImageName(),
    });
    const firestore = getFirestore();
    firestore
      .collection("tournaments")
      .doc(tournamentId)
      .collection("teams")
      .doc(teamId)
      .update({
        ...team,
        ...getImageName(),
      })
      .then(() => {
        if (newLogo) {
          const storageRef = firebase.storage().ref();
          const ref = storageRef.child(
            getImageUrl({
              tournamentId,
              imageName: newLogo.name,
            })
          );
          ref
            .put(newLogo)
            .then((res) =>
              dispatch({ type: "ADD_TEAM_TO_TOURNAMENT_IMAGE_UPLOADED" })
            )
            .catch((err) =>
              dispatch({ type: "ADD_TEAM_TO_TOURNAMENT_IMAGE_UPLOADED_ERROR" })
            );
        }
        if (team.logo && !oldLogo) {
          const storageRef = firebase.storage().ref();
          const desertRef = storageRef.child(
            getImageUrl({
              tournamentId,
              imageName: team.logo,
            })
          );
          desertRef
            .delete()
            .then(() => {
              dispatch({ type: "DELETE_TEAM_FROM_TOURNAMENT_DELETE_LOGO" });
            })
            .catch((error) => {
              dispatch({
                type: "DELETE_TEAM_FROM_TOURNAMENT_OK_DELETE_LOGO_ERROR",
              });
            });
        } else {
          dispatch({ type: "DELETE_TEAM_FROM_TOURNAMENT" });
        }
        dispatch({ type: "EDIT_TEAM" });
      })
      .catch((err: any) => {
        dispatch({ type: "EDIT_TEAM_ERROR", err });
      });
  };
};
