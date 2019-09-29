import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import StateReducer, { initialState } from './StateReducer'
import Fire from './fire'
import { FirebaseContext, StateProvider } from './hooks'


WebFont.load({
  google: {
    families: [
      'Montserrat:400,700,800', 'sans-serif',
      'Montserrat+Alternates:400,700', 'sans-serif',
    ]
  }
});

ReactDOM.render(
  <FirebaseContext.Provider value={new Fire()}>
    <StateProvider initialState={initialState} reducer={StateReducer} >
      <App />
    </StateProvider>
  </FirebaseContext.Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
