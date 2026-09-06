import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DecksScreen from '../screens/DecksScreen';
import DeckDetailsScreen from '../screens/DeckDetailsScreen';
import NewDeckScreen from '../screens/NewDeckScreen';
import AddCardScreen from '../screens/AddCardScreen';
import StartQuizScreen from '../screens/StartQuizScreen';

const ACCENT = '#2EC4B6';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const headerOptions = {
  headerStyle: { backgroundColor: ACCENT },
  headerTintColor: '#f0f0f0',
  headerTitleStyle: { color: '#f0f0f0' },
};

function DecksStack() {
  return (
    <Stack.Navigator initialRouteName="Decks" screenOptions={headerOptions}>
      <Stack.Screen
        name="Decks"
        component={DecksScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeckDetails"
        component={DeckDetailsScreen}
        options={{ title: 'Deck' }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCardScreen}
        options={{ title: 'Add Card' }}
      />
      <Stack.Screen
        name="StartQuiz"
        component={StartQuizScreen}
        options={{ title: 'Quiz' }}
      />
    </Stack.Navigator>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#f2f2f2',
        tabBarActiveBackgroundColor: ACCENT,
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: { fontSize: 14 },
      }}
    >
      <Tab.Screen
        name="DecksTab"
        component={DecksStack}
        options={{
          title: 'Decks',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="folder" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NewDeck"
        component={NewDeckScreen}
        options={{
          title: 'New Deck',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="plus" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
