
import { StatusBar } from 'react-native';
import MainNavigation from '../navigation/MainNavigation';
import React, { useEffect } from 'react';

//
// Main stack navigator
//
import { NavigationContainer } from '@react-navigation/native';
import { colors } from '../styles/colors';

export default function App() {
  // const fakeFetch = (async () => {
  //   console.log("FAKE FETCH ÇALIŞTIRILDI");
  //   await fetch("https://jsonplaceholder.typicode.com/todos/1")
  // })
  // useEffect(() => {
  //   fakeFetch()
  // }, [])
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.white} barStyle={"dark-content"} />
      <MainNavigation />
    </NavigationContainer>
  );
}
