// import { firestore } from "firebase";

import { Credentials } from "../../models/credentialsData";

export const signIn = (credentials: Credentials) => {
  return (dispatch: any, getState: any, { getFirebase }: any) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err: any) => {
        dispatch({ type: "LOGIN_EROOR", err });
      });
  };
};

export const signOut = (credentials: Credentials) => {
  return (dispatch: any, getState: any, { getFirebase }: any) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      })
      .catch((err: any) => {
        dispatch({ type: "SIGNOUT_EROOR", err });
      });
  };
};

export const signUp = (newUser: any) => {
  console.log(newUser);
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp: any) => {
        console.log(newUser);
        console.log(resp);
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0],
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch((err: any) => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};
