import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './home/HomeScreen';
import LoginScreen from './login/LoginScreen';
import SplashScreen from './SplashScreen/SplashScreen';
import NoConnection from '../components/NoConnection/NoConnection';

const Stack = createNativeStackNavigator();

export default function App() {
  let isFetching: any = false
  let userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjI4IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InNlbGltLmluY2UiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzZWxpbWluY2VAZWxpZnNvZnQuY29tLnRyIiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJDRE01S0dJNFBQREdYVEdFUElVM1lFUlo2SFc3NFRZUiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6ImFkbWluIiwiTXZjQXV0aCI6IjkiLCJGdWxsTmFtZSI6IlNlbGltIMSwTkNFIiwiSW50ZXJuYWxQaG9uZSI6IiIsIkdTTVBob25lIjoiIiwiZXhwIjoxNzAzOTQ1ODQwLCJpc3MiOiJodHRwOi8vYXBwLmVsaWZzb2Z0LmNvbS50ciIsImF1ZCI6Imh0dHA6Ly9hcHAuZWxpZnNvZnQuY29tLnRyIn0.empkg0JhUAc6RuYVvKRtqX88TwfexMSjr0TOANDaOPw"
  let connect: any = true
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Splash"}
        screenOptions={{ headerShown: false }}>
        {
          isFetching ? (
            <Stack.Screen
              options={{ headerShown: false }}
              name="Splash"
              component={SplashScreen}
            />
          ) :
            connect == false ? (
              <Stack.Screen
                options={{ headerShown: false }}
                name="NoConnection"
                component={NoConnection}
              />
            ) : userToken == "" ? (
              <Stack.Screen name="Login" component={LoginScreen} />
            ) : (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
              </>
            )
        }
      </Stack.Navigator >
    </NavigationContainer>
  );
}
