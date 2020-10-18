import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider, useSelector } from 'react-redux'
import rootReducer from './store/reducers/RootReducer'
import thunk from 'redux-thunk';
import { getFirestore, reduxFirestore, createFirestoreInstance } from 'redux-firestore';
import { getFirebase, ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase';
import fbConfig from './config/fbConfig'
import firebase from 'firebase/app'

import { StylesProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

import { mainTheme } from './styled/styledConst';

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(fbConfig, { useFirestoreForProfile: true, useProfile: 'users', attachAuthIsReady: true })
  )
);


function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>Splash!!!</div>
  return children
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
    <ThemeProvider theme={mainTheme}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Provider store={store}>
          <AuthIsLoaded>
            <App />
          </AuthIsLoaded>
        </Provider>
      </ReactReduxFirebaseProvider>
    </ThemeProvider>
  </StylesProvider>
  // </React.StrictMode>
  , document.getElementById('root')
);

serviceWorker.unregister();
