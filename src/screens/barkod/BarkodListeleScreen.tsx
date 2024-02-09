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

export default function BarkodListeleScreen({ props, route }: any) {
    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();
    const selectedCompany: any = useSelector((state: any) => state.companySlice.company)
    console.log("selectedCompany", selectedCompany)
    const userToken = useSelector((state: any) => state.auth?.userToken)
    const [okutulanlar, setOkutulanlar] = useState([]);
    const Id = route.params.Id

    const [barcodeData, setBarcodeData] = useState<any[]>([]);
    const [barcodeText, setBarcodeText] = useState<any>("")
    const [barcodeMiktar, setBarcodeMiktar] = useState<any>();
    const [loading, setLoading] = useState(false);

    const [segment, setSegment] = useState(0);

    const handleBarcode = async () => {
        console.log("object", selectedCompany)
        setLoading(true);
        await axios.get(API_URL.DEV_URL + API_URL.SAYIM_DETAYLARI +
            "?sayimId=" + Id +
            "&companyId=" + selectedCompany?.Id, {
            headers: {
                "Authorization": "Bearer " + userToken
            }
        })
            .then((response: any) => {
                console.log("SAYIM LİSTE: ", response.data)
                setBarcodeData(response.data)
            })
            .catch((err: any) => {
                console.log("SAYIM LİSTE ERROR: ", err)
            })
            .finally(() => setLoading(false))
    }
    useEffect(() => {
        handleBarcode()
    }, []);
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
                        <ScrollView>
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
                                        barcodeData.length == 0 ?
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
                        </ScrollView>
                        :
                        <View>
                            <ButtonPrimary text={"Kaydet"} />
                            {
                                barcodeData?.length < 1 ?
                                    <NoData />
                                    :
                                    <CardView>
                                        <FlatList data={barcodeData}
                                            renderItem={({ item }: any) => {
                                                return (
                                                    <View style={{
                                                        flexDirection: "column",
                                                        marginBottom: 14,
                                                        borderBottomWidth: 1,
                                                        borderBottomColor: colors.gray
                                                    }}>
                                                        <View>
                                                            <Text style={styles.textBold}>{item?.ItemCode}</Text>
                                                            <Text style={styles.textNormal}>{item?.ItemBarcode}</Text>
                                                        </View>
                                                        <View style={styles.viewTwoRowJustify}>
                                                            <Text style={{ flex: 1 }}>{item?.ItemName}</Text>
                                                            <Text style={[{ paddingEnd: 14, }, styles.textBold]}>{item?.ItemAmount} {item?.ItemUnitName}</Text>
                                                            <Trash size={30} variant="Bold" color={colors.primaryColor} style={{ marginEnd: 4 }} />
                                                            <ExportSquare size={30} variant="Bulk" color={colors.primaryColor} />
                                                        </View>
                                                    </View>
                                                )
                                            }}
                                        />
                                    </CardView>
                            }
                        </View>
                }
            </View>
        </SafeAreaView>
    );
}
