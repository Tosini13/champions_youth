import { combineReducers } from "redux";
import tournamentReducer from "./TournamentReducer";
import authReducer from "./AuthReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import routerReducer from "./RouterReducer";
import userReducer from "./UserReducer";
import menuReducer from "./MenuReducer";
import groupReducer from "./GroupReducer";
import teamReducer from "./TeamReducer";
import playOffsReducer from "./PlayOffsReducer";
import dictionaryReducer from "./DictionaryReducer";

const rootReducer = combineReducers({
  tournament: tournamentReducer,
  group: groupReducer,
  playOffs: playOffsReducer,
  team: teamReducer,
  router: routerReducer,
  user: userReducer,
  menu: menuReducer,
  dictionary: dictionaryReducer,
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
