import React from 'react';

import MainTabNavigator from './MainTabNavigator';

// Kept as a thin wrapper so App only needs to know about a single navigator.
export default function AppNavigator() {
  return <MainTabNavigator />;
}
