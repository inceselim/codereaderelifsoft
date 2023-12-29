import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, TextInput, ScrollView, TouchableOpacity } from 'react-native';
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
    // useEffect(() => {
    //     // Tts.voices().then(voices => console.log(voices));
    //     Tts.setDefaultLanguage('tr-TR');
    //     Tts.setDefaultRate(0.6);

    //     Tts.speak('Hello, world!', {
    //         // iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
    //         iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
    //         rate: 0.5,
    //         androidParams: {
    //             KEY_PARAM_PAN: -1,
    //             KEY_PARAM_VOLUME: 0.5,
    //             KEY_PARAM_STREAM: 'STREAM_MUSIC',
    //         },
    //     });
    //     Tts.speak('Selam arkadaşlar uygulamamıza hoşgeldiniz!', {
    //         // iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
    //         iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
    //         rate: 0.5,
    //         androidParams: {
    //             KEY_PARAM_PAN: 1,
    //             KEY_PARAM_VOLUME: 0.5,
    //             KEY_PARAM_STREAM: 'STREAM_NOTIFICATION',
    //         },
    //     });
    // }, []);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={{ alignContent: "center" }}>
                    <Text style={{
                        fontSize: 18,
                        color: colors.blue,
                        fontWeight: "bold",
                        textAlign: "center",
                        paddingVertical: 10,
                    }}>Kullanıcı: {userName}</Text>
                    <Text style={{
                        fontSize: 15,
                        color: colors.blue,
                        fontWeight: "bold",
                        textAlign: "center",
                        paddingVertical: 10,
                    }}>Barkod Okut</Text>

                    <TextInput
                        style={styles.textInput}
                        value={barcodeText}
                        onChangeText={setBarcodeText}
                        autoFocus
                    />
                    <TouchableOpacity onPress={() => logoutDecide()}>
                        <Text style={{
                            fontSize: 15,
                            color: colors.blue,
                            fontWeight: "bold",
                            textAlign: "center",
                            paddingVertical: 10,
                        }}>Çıkış Yap</Text>
                    </TouchableOpacity>
                    <ScrollView>
                        <View>

                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}
