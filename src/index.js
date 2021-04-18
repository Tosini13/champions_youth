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
import ThemeProviderWrapper from "./styled/ThemeProviderWrapper";
import fbConfig from "./config/fbConfig";
import firebase from "firebase/app";

import { StylesProvider } from "@material-ui/core/styles";
import SplashScreen from "./components/global/SplashScreen";

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
  <StylesProvider injectFirst>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Provider store={store}>
        <AuthIsLoaded>
          <ThemeProviderWrapper>
            <App />
          </ThemeProviderWrapper>
        </AuthIsLoaded>
      </Provider>
    </ReactReduxFirebaseProvider>
  </StylesProvider>,
  // </React.StrictMode>
  document.getElementById("root")
);

serviceWorker.unregister();
