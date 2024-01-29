import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, TextInput, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import Tts from 'react-native-tts';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../../redux/features/authSlice/authSlice';
import { ArrowRight2 } from 'iconsax-react-native';

export default function HomeScreen() {
    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();
    const userName = useSelector((state: any) => state.auth.userName)
    const [tokenUserName, setTokenUserName] = useState("");

    const getUserData = async () => {
        let tmpName: string | any = await AsyncStorage.getItem("@tokenUserName")
        setTokenUserName(tmpName)
    }

    useEffect(() => {
        getUserData()
    }, [])

    async function logoutDecide() {
        Alert.alert('Oturum Kapat', 'Çıkış yapmak istediğinize emin misiniz?', [
            {
                text: 'İptal',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Onayla', onPress: async () => {
                    dispatch(logoutUser())
                    await AsyncStorage.removeItem("@token")
                    await AsyncStorage.removeItem("@tokenExpires")
                    await AsyncStorage.removeItem("@tokenUserName")
                    await AsyncStorage.removeItem("@mobileMenu")
                }
            },
        ]);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 8,
                    borderBottomWidth: 1,
                    justifyContent: "space-between"
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                        <Image source={require("../../assets/images/userIcon1.png")}
                            style={{
                                height: 28,
                                width: 28,
                            }} />
                        <Text style={{
                            fontSize: 16,
                            color: colors.primaryColor,
                            fontWeight: "bold",

                        }}>
                            {userName?.toUpperCase()}</Text>
                    </View>
                    <TouchableOpacity onPress={() => logoutDecide()} style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                        <Image source={require("../../assets/images/logoutIcon1.png")}
                            style={{
                                height: 33,
                                width: 33,
                            }} />
                        <Text style={{
                            fontSize: 16,
                            color: colors.primaryColor,
                            fontWeight: "bold",
                            textAlign: "left",
                            paddingVertical: 10,
                            paddingStart: 4,
                        }}>Çıkış</Text>
                    </TouchableOpacity>
                </View>


                <View style={{
                    flex: 1,
                    justifyContent: "center"
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Barkod")} style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 14,
                        backgroundColor: colors.gray,
                        paddingVertical: 10,
                        borderRadius: 8
                    }}>
                        <Image source={require("../../assets/images/qrScanIcon1.png")}
                            style={{
                                height: 40,
                                width: 40,
                                marginStart: 6,
                            }} />
                        <Text style={{
                            fontSize: 16,
                            color: colors.primaryColor,
                            fontWeight: "bold",
                            textAlign: "left",
                            paddingVertical: 10,
                            paddingStart: 8,
                            flex: 1,
                        }}>Barkod Okut</Text>
                        <ArrowRight2 size="25" color={colors.primaryColor} style={{ marginEnd: 4 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Ariza")} style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 14,
                        backgroundColor: colors.gray,
                        paddingVertical: 10,
                        borderRadius: 8
                    }}>
                        <Image source={require("../../assets/images/arizaIcon1.png")}
                            style={{
                                height: 40,
                                width: 40,
                                marginStart: 6,
                            }} />
                        <Text style={{
                            fontSize: 16,
                            color: colors.primaryColor,
                            fontWeight: "bold",
                            textAlign: "left",
                            paddingVertical: 10,
                            paddingStart: 8,
                            flex: 1,
                        }}>Arıza Talep</Text>
                        <ArrowRight2 size="25" color={colors.primaryColor} style={{ marginEnd: 4 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
