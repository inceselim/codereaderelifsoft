import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, TextInput, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import Tts from 'react-native-tts';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ArrowRight2, Car, ExportSquare, Trash } from 'iconsax-react-native';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import CardView from '../../components/CardView';
import { NoData } from '../../components/NoData/NoData';

export default function BarkodScreen() {
    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();
    const [okutulanlar, setOkutulanlar] = useState([]);

    const [barcodeData, setBarcodeData] = useState<any[]>([]);
    const [barcodeText, setBarcodeText] = useState<any>("")
    const [barcodeMiktar, setBarcodeMiktar] = useState<any>();

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
    const handleSearchProduct = () => {
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

    const handleAddList = () => {
        console.log("Listeye Eklendi")
        if (Platform.OS == "ios") {
            Tts.speak('Listeye Eklendi!', {
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
            Tts.speak('Listeye Eklendi!', {
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

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <>
                    {
                        barcodeText != "" ?
                            <TouchableOpacity onPress={() => setBarcodeText("")}>
                                <Image
                                    source={require("../../assets/images/trashIcon1.png")}
                                    style={{
                                        width: 30,
                                        height: 30
                                    }}
                                />
                            </TouchableOpacity>
                            : null
                    }
                </>
            ),
        });
    }, [navigation, barcodeText]);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <CardView>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                        <ButtonPrimary onPress={() => setSegment(0)}
                            text={"Barkod Okut"} disabled={
                                segment == 0 ? true : false
                            }>
                        </ButtonPrimary>
                        <ButtonPrimary onPress={() => setSegment(1)}
                            text={"Okutulanlar"} disabled={
                                segment == 1 ? true : false
                            }>
                        </ButtonPrimary>
                    </View>
                </CardView>

                {
                    segment == 0 ?
                        <View>
                            <CardView>
                                <TextInput
                                    style={styles.textInput}
                                    value={barcodeText}
                                    onChangeText={setBarcodeText}
                                    placeholder='Barkod Giriniz'
                                    placeholderTextColor={"#666"}
                                    autoFocus
                                />
                                <TextInput style={styles.textInput}
                                    value={barcodeMiktar} onChangeText={setBarcodeMiktar}
                                    placeholder='Miktar Giriniz'
                                    keyboardType='decimal-pad'
                                    placeholderTextColor={"#666"}
                                />
                                <ButtonPrimary text={"Malzeme Bul"} onPress={() => handleSearchProduct()} />
                                {
                                    barcodeData == "" ?
                                        <CardView>
                                            <View style={styles.viewTwoRowJustify}>
                                                <Text style={[styles.textLarge, styles.textBold]}>
                                                    Ürün Kodu
                                                </Text>
                                                <Text style={[styles.textLarge, styles.textBold]}>
                                                    sdasads
                                                </Text>
                                            </View>
                                            <View style={styles.viewTwoRowJustify}>
                                                <Text style={styles.textNormal}>
                                                    Ürün Adı
                                                </Text>
                                                <Text style={styles.textNormal}>
                                                    productName
                                                </Text>
                                            </View>
                                        </CardView>
                                        : null
                                }
                                <ButtonPrimary text={"Listeye Ekle"} onPress={() => handleAddList()} />
                            </CardView>
                        </View>
                        :
                        <View>
                            <ButtonPrimary text={"Kaydet"} />
                            <ScrollView>
                                {
                                    barcodeData?.length < 1 ?
                                        <NoData />
                                        :
                                        <CardView>
                                            <View style={styles.viewTwoRowJustify}>
                                                <Text style={{ flex: 1 }}>ürünAdı</Text>
                                                <Text style={{ paddingEnd: 10 }}>ürünMiktarı</Text>
                                                <Trash size={30} variant="Bold" color={colors.primaryColor} style={{ marginEnd: 8 }} />
                                                <ExportSquare size={30} variant="Bulk" color={colors.primaryColor} />
                                            </View>
                                        </CardView>
                                }
                            </ScrollView>
                        </View>
                }
            </View>
        </SafeAreaView>
    );
}
