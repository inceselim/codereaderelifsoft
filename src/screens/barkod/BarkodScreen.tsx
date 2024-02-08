import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, TextInput, ScrollView, TouchableOpacity, Platform, Image, FlatList } from 'react-native';
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
import axios from 'axios';
import { API_URL } from '../../api/api_url';

export default function BarkodScreen({ props, route }: any) {
    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();
    const [okutulanlar, setOkutulanlar] = useState([]);
    const userToken = useSelector((state: any) => state.auth?.userToken)
    const company = route?.params?.company
    console.log("")
    console.log("")
    console.log("")
    console.log("",company)
    console.log("")
    console.log("")
    console.log("")
    const [loading, setLoading] = useState(false);

    const [barcodeData, setBarcodeData] = useState<any[]>([]);
    const [barcodeText, setBarcodeText] = useState<any>("")
    const [barcodeMiktar, setBarcodeMiktar] = useState<any>();

    const [segment, setSegment] = useState(0);

    const handleBarcode = async () => {
        setLoading(true);
        await axios.get(API_URL.DEV_URL + API_URL.BARKOD_SAYIM_LIST, {
            headers: {
                "Authorization": "Bearer " + userToken
            }
        })
            .then((response: any) => {
                console.log("SAYIM LIST RESPONSE: ", response.data)
                setBarcodeData(response.data)
            })
            .catch((error: any) => {
                console.log("SAYIM LIST ERR: ", error)
                Alert.alert("HATA", "Sayım listesi hata oluştu")
            })
            .finally(() => setLoading(false))
    }

    const handleAddList = () => {
        console.log("Listeye Eklendi")
        Tts.voices().then(voices => console.log(voices));

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
        handleBarcode()
    }, []);
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
                    <ButtonPrimary text={"Yeni Sayım Oluştur"}
                        onPress={() => navigation.navigate("BarkodCreate", {
                            company: company
                        })} />

                </CardView>
                <CardView>
                    <FlatList data={barcodeData}
                        renderItem={({ item }: any) => {
                            return (
                                <View>
                                    <View style={styles.viewTwoRowJustify}>
                                        <Text style={styles.textTitle}>Fiş No</Text>
                                        <Text style={styles.textTitle}>{item?.Id}</Text>
                                    </View>
                                    <View style={styles.viewTwoRowJustify}>
                                        <Text style={styles.textBold}>Proje Kodu</Text>
                                        <Text style={styles.textNormal}>{item?.ProjectCode}</Text>
                                    </View>
                                    <View style={styles.viewTwoRowJustify}>
                                        <Text style={styles.textBold}>Durum</Text>
                                        <Text style={styles.textNormal}>{item?.Status == 0 ? "Gönderilmedi" : "Gönderildi"}</Text>
                                    </View>
                                    {
                                        item?.Definition == "" ?
                                            null :
                                            <View>
                                                <Text style={styles.textBold}>Açıklama</Text>
                                                <Text style={styles.textNormal}>{item?.Definition}</Text>
                                            </View>}
                                    <ButtonPrimary text={"Sayım Detayları"}
                                        onPress={() => navigation.navigate("BarkodListele", {
                                            company: company,
                                            Id: item?.Id,
                                            ProjectCode: item?.ProjectCode
                                        })} />
                                </View>
                            )
                        }}
                    />
                </CardView>
            </View>
        </SafeAreaView>
    );
}
