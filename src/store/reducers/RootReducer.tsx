import { combineReducers } from "redux";
import tournamentReducer from "./TournamentReducer";
import authReducer from "./AuthReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import routerReducer from "./RouterReducer";
import userReducer from "./UserReducer";
import menuReducer from "./MenuReducer";

const rootReducer = combineReducers({
  tournament: tournamentReducer,
  router: routerReducer,
  user: userReducer,
  menu: menuReducer,
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
