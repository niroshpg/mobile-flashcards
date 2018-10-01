import React from 'react';
import {createBottomTabNavigator,createStackNavigator} from 'react-navigation';

import DecksScreen from '../screens/DecksScreen';
import DeckDetailsScreen from '../screens/DeckDetailsScreen';
import NewDeckScreen from '../screens/NewDeckScreen';
import AddCardScreen from '../screens/AddCardScreen';
import StartQuizScreen from '../screens/StartQuizScreen';

const DecksStack = createStackNavigator({
  Decks: { screen: DecksScreen },
  DeckDetails: { screen: DeckDetailsScreen },
  AddCard: { screen: AddCardScreen },
  StartQuiz: { screen: StartQuizScreen },
});


export default createBottomTabNavigator({
  Decks: {
    screen: DecksStack,
  },
  NewDeck: {
    screen: NewDeckScreen,
  }
}, {
  tabBarPosition: 'top',
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: '#f2f2f2',
    activeBackgroundColor: "#2EC4B6",
    inactiveTintColor: '#666',
    labelStyle: {
      fontSize: 22,
      padding: 12
    }
  }
});
