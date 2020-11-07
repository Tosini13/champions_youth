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
import matchReducer from "./MatchReducer";
import gameReducer from "./GameReducer";

const rootReducer = combineReducers({
  tournament: tournamentReducer,
  group: groupReducer,
  game: gameReducer,
  playOffs: playOffsReducer,
  match: matchReducer,
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
