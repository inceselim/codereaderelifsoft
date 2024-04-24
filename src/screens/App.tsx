
import { PermissionsAndroid, StatusBar } from 'react-native';
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
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Kamera İzni',
          message:
            'Camera ile Barkod okutmak için gereken izin',
          buttonNeutral: 'Sonra',
          buttonNegative: 'İptal',
          buttonPositive: 'Tamam',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    requestCameraPermission();
  }, [])
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.white} barStyle={"dark-content"} />
      <MainNavigation />
    </NavigationContainer>
  );
}
