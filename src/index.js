import React from 'react'
import ReactDOM from 'react-dom'
import WebFont from 'webfontloader'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import StateReducer, { initialState } from './StateReducer'
import Fire from './fire'
import { FirebaseContext, StateProvider } from './hooks'
import cartReducer from './redux/reducers/cartReducer'


WebFont.load({
  google: {
    families: [
      'Montserrat:400,700,800', 'sans-serif',
      'Montserrat+Alternates:400,700', 'sans-serif',
    ]
  }
});

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, cartReducer)
const store = createStore(persistedReducer)
const persistor = persistStore(store)


ReactDOM.render(
  <FirebaseContext.Provider value={new Fire()}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StateProvider initialState={initialState} reducer={StateReducer} >
          <App />
        </StateProvider>
      </PersistGate>
    </Provider>
  </FirebaseContext.Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
