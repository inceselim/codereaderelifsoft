import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, TextInput, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import Tts from 'react-native-tts';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../../redux/features/authSlice/authSlice';

export default function HomeScreen() {
    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();
    const [barcodeText, setBarcodeText] = useState("")
    const userName = useSelector((state: any) => state.auth.userName)

    const [segment, setSegment] = useState(0);

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
    useEffect(() => {
        // Tts.voices().then(voices => console.log(voices));
        Tts.setDefaultLanguage('tr-TR');
        Tts.setDefaultRate(0.6);
        Tts.speak('Hello, world!', {
            iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
            rate: 0.5,
            androidParams: {
                KEY_PARAM_PAN: 0,
                KEY_PARAM_VOLUME: 0.99,
                KEY_PARAM_STREAM: 'STREAM_NOTIFICATION',
            },
        });
        Tts.speak('Selam arkadaşlar uygulamamıza hoşgeldiniz!', {
            // iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
            iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
            rate: 0.5,
            androidParams: {
                KEY_PARAM_PAN: 0,
                KEY_PARAM_VOLUME: 1.0,
                KEY_PARAM_STREAM: 'STREAM_NOTIFICATION',
            },
        });
    }, []);
    const handleBarcode = () => {
        if (Platform.OS == "ios") {
            Tts.speak('Hello, world!', {
                iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
                rate: 0.5,
                androidParams: {
                    KEY_PARAM_PAN: 0,
                    KEY_PARAM_VOLUME: 0.99,
                    KEY_PARAM_STREAM: 'STREAM_NOTIFICATION',
                },
            });
        }
        else {
            Tts.speak('Selam arkadaşlar uygulamamıza hoşgeldiniz!', {
                // iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
                iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
                rate: 0.5,
                androidParams: {
                    KEY_PARAM_PAN: 0,
                    KEY_PARAM_VOLUME: 1.0,
                    KEY_PARAM_STREAM: 'STREAM_NOTIFICATION',
                },
            });
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={{ alignContent: "center" }}>
                    {/* <Text style={{
                        fontSize: 18,
                        color: colors.orange,
                        fontWeight: "bold",
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                    }}>Kullanıcı: {userName}</Text> */}
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingTop:10,
                    }}>
                        <TouchableOpacity onPress={() => setSegment(0)}>
                            <Text style={{
                                fontSize: 19,
                                color: colors.orange,
                                fontWeight: "bold",
                                textAlign: "center",
                                paddingVertical: 10,
                            }}>Barkod Okut</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSegment(1)}>
                            <Text style={{
                                fontSize: 19,
                                color: colors.orange,
                                fontWeight: "bold",
                                textAlign: "center",
                                paddingVertical: 10,
                            }}>Okutulanlar</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        segment == 0 ?
                            <View>
                                <TextInput
                                    style={styles.textInput}
                                    value={barcodeText}
                                    onChangeText={setBarcodeText}
                                    autoFocus
                                />
                                <TouchableOpacity onPress={() => setBarcodeText("")}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: colors.orange,
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        paddingVertical: 10,
                                    }}>Temizle</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View>
                                <ScrollView>
                                    <View>

                                    </View>
                                </ScrollView>
                            </View>
                    }
                    <TouchableOpacity onPress={() => logoutDecide()}>
                        <Text style={{
                            fontSize: 15,
                            color: colors.orange,
                            fontWeight: "bold",
                            textAlign: "center",
                            paddingVertical: 10,
                        }}>Çıkış Yap</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
