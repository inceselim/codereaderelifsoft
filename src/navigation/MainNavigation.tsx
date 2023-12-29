import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoConnection from '../components/NoConnection/NoConnection';
import { useSelector } from 'react-redux';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import LoginScreen from '../screens/login/LoginScreen';
import HomeScreen from '../screens/home/HomeScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
    let userToken = useSelector((state: any) => state.auth.userToken)
    let authVal = useSelector((state: any) => state.auth)
    let connect: any = true
    return (
        <Stack.Navigator
            initialRouteName={"Splash"}
            screenOptions={{ headerShown: false }}>
            {
                authVal.isFetching ? (
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
    );
}
