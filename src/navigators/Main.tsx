import React from 'react';
import { Business } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Business" component={Business} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
