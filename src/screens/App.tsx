
import { StatusBar } from 'react-native';
import MainNavigation from '../navigation/MainNavigation';
import React from 'react';

//
// Main stack navigator
//
import { NavigationContainer } from '@react-navigation/native';
import { colors } from '../styles/colors';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.white} barStyle={"dark-content"} />
      <MainNavigation />
    </NavigationContainer>
  );
}
