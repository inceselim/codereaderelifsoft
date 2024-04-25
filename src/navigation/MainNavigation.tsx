import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoConnection from '../components/NoConnection/NoConnection';
import { useSelector } from 'react-redux';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import LoginScreen from '../screens/login/LoginScreen';
import HomeScreen from '../screens/home/HomeScreen';
import BarkodScreen from '../screens/barkod/BarkodScreen';
import { Image, TouchableOpacity } from 'react-native';
import ArizaTalepScreen from '../screens/ariza/ArizaTalepScreen';
import ArizaDetailScreen from '../screens/ariza/ArizaDetailScreen';
import ArizaMalzemeEkleScreen from '../screens/ariza/ArizaMalzemeEkleScreen';
import BarkodCreateScreen from '../screens/barkod/BarkodCreateScreen';
import BarkodListeleScreen from '../screens/barkod/BarkodListeleScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
    let userToken = useSelector((state: any) => state.auth.userToken)
    console.log("")
    console.log("")
    console.log("NAVIGATION")
    console.log("userToken: ", userToken.userToken)
    console.log("")
    let authVal = useSelector((state: any) => state.auth)
    let connect: any = true
    const navigation: any = useNavigation();
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
                    ) : userToken == "" || null || undefined ? (
                        <Stack.Screen name="Login" component={LoginScreen} />
                    ) : (
                        <>
                            <Stack.Screen name="Home" component={HomeScreen} />
                            <Stack.Screen name="Barkod" component={BarkodScreen} options={{
                                headerShown: true,
                                title: "Barkod",
                                headerTitleStyle: {
                                    fontSize: 14
                                },
                                // headerRight: () => {
                                //     return (
                                //         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                //             <Image source={require("../assets/images/homepageIcon1.png")}
                                //                 style={{
                                //                     height: 26,
                                //                     width: 26,
                                //                     marginStart: 6,
                                //                 }} />
                                //         </TouchableOpacity>
                                //     );
                                // },
                            }} />
                            <Stack.Screen name="Ariza" component={ArizaTalepScreen} options={{
                                headerShown: true,
                                title: "Arıza Kaydı",
                                headerTitleStyle: {
                                    fontSize: 14
                                },
                                // headerRight: () => {
                                //     return (
                                //         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                //             <Image source={require("../assets/images/homepageIcon1.png")}
                                //                 style={{
                                //                     height: 26,
                                //                     width: 26,
                                //                     marginStart: 6,
                                //                 }} />
                                //         </TouchableOpacity>
                                //     );
                                // },
                            }} />
                            <Stack.Screen name="ArizaDetail" component={ArizaDetailScreen} options={{
                                headerShown: true,
                                title: "Arıza Detayları",
                                headerTitleStyle: {
                                    fontSize: 14
                                },
                                headerRight: () => {
                                    return (
                                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                            <Image source={require("../assets/images/homepageIcon1.png")}
                                                style={{
                                                    height: 26,
                                                    width: 26,
                                                    marginStart: 6,
                                                }} />
                                        </TouchableOpacity>
                                    );
                                },
                            }} />
                            <Stack.Screen name="ArizaMalzemeEkle" component={ArizaMalzemeEkleScreen} options={{
                                headerShown: true,
                                title: "Malzeme Ekle",
                                headerTitleStyle: {
                                    fontSize: 14
                                },
                                headerRight: () => {
                                    return (
                                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                            <Image source={require("../assets/images/homepageIcon1.png")}
                                                style={{
                                                    height: 26,
                                                    width: 26,
                                                    marginStart: 6,
                                                }} />
                                        </TouchableOpacity>
                                    );
                                },
                            }} />
                            <Stack.Screen name="BarkodCreate" component={BarkodCreateScreen} options={{
                                headerShown: true,
                                title: "Sayım Oluştur",
                                headerTitleStyle: {
                                    fontSize: 14
                                },
                                headerRight: () => {
                                    return (
                                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                            <Image source={require("../assets/images/homepageIcon1.png")}
                                                style={{
                                                    height: 26,
                                                    width: 26,
                                                    marginStart: 6,
                                                }} />
                                        </TouchableOpacity>
                                    );
                                },
                            }} />
                            <Stack.Screen name="BarkodListele" component={BarkodListeleScreen} options={{
                                headerShown: true,
                                title: "Sayım Oluştur",
                                headerTitleStyle: {
                                    fontSize: 14
                                },
                                headerRight: () => {
                                    return (
                                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                            <Image source={require("../assets/images/homepageIcon1.png")}
                                                style={{
                                                    height: 26,
                                                    width: 26,
                                                    marginStart: 6,
                                                }} />
                                        </TouchableOpacity>
                                    );
                                },
                            }} />
                        </>
                    )
            }
        </Stack.Navigator >
    );
}
