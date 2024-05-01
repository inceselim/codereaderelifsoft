import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, FlatList, Image, Pressable, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '../../api/api_url';
import { useSelector } from 'react-redux';
import LoadingCard from '../../components/LoadingCard/LoadingCard';
import { NoData } from '../../components/NoData/NoData';
import CardView from '../../components/CardView';
import Tts from 'react-native-tts';

export default function ArizaDetailScreen({ props }: any) {
    const navigation: any = useNavigation();
    const route: any = useRoute();
    const id: string = route?.params?.id
    const userToken = useSelector((state: any) => state.auth?.userToken)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const getData = async () => {
        setLoading(true)
        await axios.get(API_URL.DEV_URL + API_URL.ARIZA_DETAIL_LIST + "?ArizaId=" + id, {
            headers: {
                "Authorization": "Bearer " + userToken
            }
        })
            .then((response: any) => {
                console.log("arizaDetail response: ", response.data)
                setData(response.data)
            })
            .catch((error: any) => {
                console.log("Ariza detail ERROR: ", error)
                Alert.alert("Hata Oluştu", error)
            })
            .finally(() => setLoading(false))
    }
    const deleteProduct = async ({ itemId }: any) => {
        console.log(itemId)
        setLoadingDelete(true)
        await axios.delete(API_URL.DEV_URL + API_URL.ARIZA_MALZEME_SIL + "?key=" + itemId, {
            headers: {
                "Authorization": "Bearer " + userToken
            }
        })
            .then((response: any) => {
                console.log("arizaDetail response: ", response.data)
                Tts.speak('Silindi', {
                    iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
                    rate: 0.5,
                    androidParams: {
                        KEY_PARAM_PAN: 0,
                        KEY_PARAM_VOLUME: 1.0,
                        KEY_PARAM_STREAM: 'STREAM_SYSTEM',
                    },
                });
            })
            .catch((error: any) => {
                console.log("Ariza detail ERROR: ", error)
                Tts.setDefaultLanguage('tr-TR');

                Tts.speak('Hata oluştu', {
                    iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
                    rate: 0.5,
                    androidParams: {
                        KEY_PARAM_PAN: 0,
                        KEY_PARAM_VOLUME: 1.0,
                        KEY_PARAM_STREAM: 'STREAM_SYSTEM',
                    },
                });
            })
            .finally(() => setLoadingDelete(false))
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            {
                loading || loadingDelete ?
                    <LoadingCard />
                    :
                    <View style={styles.content}>
                        <FlatList
                            data={data}
                            ListEmptyComponent={<NoData />}
                            renderItem={({ item }: any) => {
                                return (
                                    <CardView>
                                        <View style={{ flexDirection: "row", }}>
                                            <View style={{ marginEnd: 30, flex: 1, }}>
                                                <Text style={[styles.textTitle, { flexWrap: "wrap", }]}>Ürün Adı: {item?.UrunAd}</Text>
                                            </View>
                                            <View>
                                                <TouchableOpacity onPress={() => {
                                                    deleteProduct({ itemId: item?.ArizaMalzemeId })
                                                }}>
                                                    <Image style={{ width: 40, height: 40 }}
                                                        source={require('../../assets/images/deleteIcon1.png')}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {/* <Text style={styles.textNormal}>Ürün Id: {item?.UrunId}</Text> */}
                                        <View style={styles.viewTwoRows}>
                                            <Text style={styles.textBold}>Ürün Kodu:</Text>
                                            <Text style={styles.textNormal}>{item?.UrunKod}</Text>
                                        </View>
                                        <View style={styles.viewTwoRows}>
                                            <Text style={styles.textBold}>Üretici Kod:</Text>
                                            <Text style={styles.textNormal}>{item?.UreticiKod}</Text>
                                        </View>
                                        <View style={styles.viewTwoRows}>
                                            <Text style={styles.textBold}>Miktar:</Text>
                                            <Text style={styles.textNormal}>{item?.Miktar} {item?.Birim}</Text>
                                        </View>
                                        {/* <View style={styles.viewTwoRows}>
                                                <Text style={styles.textBold}>Stok Miktarı:</Text>
                                                <Text style={styles.textNormal}>{item?.D1}</Text>
                                            </View>
                                            <View style={styles.viewTwoRows}>
                                                <Text style={styles.textBold}>Açıklama:</Text>
                                                <Text style={styles.textNormal}>{item?.Detay}</Text>
                                            </View>
                                            <View style={styles.viewTwoRows}>
                                                <Text style={styles.textBold}>Tamirci:</Text>
                                                <Text style={styles.textNormal}>{item?.TamirciAdSoyad}</Text>
                                            </View>
                                            <View style={styles.viewTwoRows}>
                                                <Text style={styles.textBold}>Kullanıcı:</Text>
                                                <Text style={styles.textNormal}>{item?.KullaniciAdSoyad}</Text>
                                            </View> */}
                                    </CardView>
                                )
                            }}
                        />
                    </View>
            }
        </SafeAreaView >
    );
}
