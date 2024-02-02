import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, TextInput, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import Tts from 'react-native-tts';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ArrowRight2 } from 'iconsax-react-native';

export default function BarkodScreen() {
    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();
    const [barcodeText, setBarcodeText] = useState("")

    const [segment, setSegment] = useState(0);

    useEffect(() => {
        // Tts.voices().then(voices => console.log(voices));
        Tts.setDefaultLanguage('tr-TR');
        Tts.setDefaultRate(0.5);
        Tts.speak('Başarılı!', {
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
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 10,
                }}>

                    <TouchableOpacity onPress={() => setSegment(0)}>
                        <Text style={{
                            fontSize: 19,
                            color: colors.primaryColor,
                            fontWeight: "bold",
                            textAlign: "center",
                            paddingVertical: 10,
                        }}>Barkod Okut</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSegment(1)}>
                        <Text style={{
                            fontSize: 19,
                            color: colors.primaryColor,
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
                                    color: colors.primaryColor,
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
            </View>
        </SafeAreaView>
    );
}
