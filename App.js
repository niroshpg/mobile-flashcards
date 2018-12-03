import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore,applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'
import AppNavigator from './navigation/AppNavigator'
import {createLogger} from 'redux-logger'

import {setLocalNotification} from './utils/helpers'

const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   reducer, {},
//   composeEnhancers(
//     applyMiddleware(
//       loggerMiddleware,
//       thunkMiddleware
//     ),
//   )
// )

if (__DEV__) {
    // Development mode with Redux DevTools support enabled.
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Prevents Redux DevTools from re-dispatching all previous actions.
            shouldHotReload: false
        }) : compose;
    // Create the redux store.
    store = createStore(reducer, composeEnhancers(
      applyMiddleware(
      loggerMiddleware,
      thunkMiddleware
    ),));
} else {
    // Production mode.
    store = createStore(rootReducer, compose(applyMiddleware(
      loggerMiddleware,
      thunkMiddleware
    ),));
}

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
