import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, TextInput, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import Tts from 'react-native-tts';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../../redux/features/authSlice/authSlice';
import { ArrowDown2, ArrowRight2 } from 'iconsax-react-native';
import CardView from '../../components/CardView';
import { companySelect } from '../../redux/features/companySlice/companySlice';

export default function HomeScreen() {
    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();
    const userName = useSelector((state: any) => state.auth.userName)
    const companies: any[] = useSelector((state: any) => state.auth.companies)

    const [visibleCompanies, setVisibleCompanies] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<any>();

    async function logoutDecide() {
        Alert.alert('Oturum Kapat', 'Çıkış yapmak istediğinize emin misiniz?', [
            {
                text: 'İptal',
                onPress: () => console.log('İptal Pressed'),
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
    useEffect(() => {
        // console.log(useSelector((state: any) => state.auth))
        // if (useSelector((state: any) => state.auth.userName) == undefined) {
        //     console.log("Kullanıcı bulunamadı ÇIKIŞ...")
        //     const logout = async () => {
        //         dispatch(logoutUser())
        //         await AsyncStorage.removeItem("@token")
        //         await AsyncStorage.removeItem("@tokenExpires")
        //         await AsyncStorage.removeItem("@tokenUserName")
        //         await AsyncStorage.removeItem("@mobileMenu")
        //     }
        //     logout()
        // }
        if (companies?.length > 0) {
            const setCompany = async () => {
                console.log(companies[0])
                setSelectedCompany(companies[0])
                dispatch(companySelect(companies[0]))
            }
            setCompany()
        }
        else {
            const logout = async () => {
                dispatch(logoutUser())
                await AsyncStorage.removeItem("@token")
                await AsyncStorage.removeItem("@tokenExpires")
                await AsyncStorage.removeItem("@tokenUserName")
                await AsyncStorage.removeItem("@mobileMenu")
            }
            logout()
        }
    }, [])
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

                <TouchableOpacity onPress={() => setVisibleCompanies(!visibleCompanies)}>
                    <CardView>
                        <Text style={[styles.textBold,]}>
                            Şirket:</Text>
                        <View style={styles.viewTwoRow}>
                            {selectedCompany != null &&
                                <>
                                    <Text style={[styles.textLarge, styles.textBold, {
                                        flex: 1,
                                        paddingBottom: 8,
                                        borderBottomWidth: visibleCompanies ? 1 : 0
                                    }]}>
                                        {selectedCompany?.Company}
                                    </Text>

                                    {
                                        visibleCompanies ?
                                            <ArrowDown2 size={22} color={colors.black} />
                                            :
                                            <ArrowRight2 size={22} color={colors.black} />
                                    }
                                </>
                            }
                        </View>
                        {
                            visibleCompanies ?
                                <>
                                    {
                                        companies?.map((item: any) => {
                                            // console.log(item)
                                            return (
                                                item?.IsIettEnabled == true ?
                                                    <TouchableOpacity onPress={() => {
                                                        setSelectedCompany(item)
                                                        setVisibleCompanies(false)
                                                        dispatch(companySelect(item))
                                                    }}
                                                        key={item?.Id}>
                                                        <Text style={[styles.textBold, { paddingVertical: 6, }]}>{item?.Company}</Text>
                                                    </TouchableOpacity>
                                                    : null
                                            )
                                        })
                                    }
                                </>
                                : null
                        }
                    </CardView>
                </TouchableOpacity>


                <View style={{
                    flex: 1,
                    // justifyContent: "center"
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Barkod", {
                        company: selectedCompany
                    })} style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 6,
                        backgroundColor: colors.light,
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
                    <TouchableOpacity onPress={() => navigation.navigate("Ariza", {
                        company: selectedCompany
                    })} style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 6,
                        backgroundColor: colors.light,
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
                        }}>Arıza Kaydı</Text>
                        <ArrowRight2 size="25" color={colors.primaryColor} style={{ marginEnd: 4 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
}
