// import { firestore } from "firebase";

import { Credentials, User } from "../../models/credentialsData";

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

export const signOut = () => {
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

export const signUp = (credentials: Credentials, user: User) => {
  return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((resp: any) => {
        return firestore.collection("users").doc(resp.user.uid).set({
          login: user.login,
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
