import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider, useSelector } from "react-redux";
import rootReducer from "./store/reducers/RootReducer";
import thunk from "redux-thunk";
import {
  getFirestore,
  reduxFirestore,
  createFirestoreInstance,
} from "redux-firestore";
import {
  getFirebase,
  ReactReduxFirebaseProvider,
  isLoaded,
} from "react-redux-firebase";
import fbConfig from "./config/fbConfig";
import firebase from "firebase/app";

import { StylesProvider } from "@material-ui/core/styles";
import SplashScreen from "./components/global/SplashScreen";
import CustomThemeProvider from "./styled/themes/CustomThemeProvider";
import LocaleProvider from "./Provider/LocaleProvider";

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(fbConfig, {
      useFirestoreForProfile: true,
      useProfile: "users",
      attachAuthIsReady: true,
    })
  )
);

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <SplashScreen />;
  return children;
}

const rrfProps = {
  firebase,
  config: fbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  // <React.StrictMode>
  <CustomThemeProvider>
    <LocaleProvider>
      <StylesProvider injectFirst>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Provider store={store}>
            <AuthIsLoaded>
              <App />
            </AuthIsLoaded>
          </Provider>
        </ReactReduxFirebaseProvider>
      </StylesProvider>
    </LocaleProvider>
  </CustomThemeProvider>,
  // </React.StrictMode>
  document.getElementById("root")
);

serviceWorker.unregister();
