import { combineReducers } from "redux";
import tournamentReducer from "./TournamentReducer";
import authReducer from "./AuthReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import routerReducer from "./RouterReducer";

const rootReducer = combineReducers({
  tournament: tournamentReducer,
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  menu: routerReducer,
});

export default rootReducer;
