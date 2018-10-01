import React from 'react';
import {createBottomTabNavigator,createStackNavigator} from 'react-navigation';
import {
  Animated,
  Easing
} from 'react-native'

import DecksScreen from '../screens/DecksScreen';
import DeckDetailsScreen from '../screens/DeckDetailsScreen';
import NewDeckScreen from '../screens/NewDeckScreen';
import AddCardScreen from '../screens/AddCardScreen';
import StartQuizScreen from '../screens/StartQuizScreen';

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [ { translateX } ] }
    },
  }
}

const DecksStack = createStackNavigator({
  Decks: { screen: DecksScreen },
  DeckDetails: { screen: DeckDetailsScreen },
  AddCard: { screen: AddCardScreen },
  StartQuiz: { screen: StartQuizScreen },
},{
  initialRouteName: 'Decks',
  transitionConfig,
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
