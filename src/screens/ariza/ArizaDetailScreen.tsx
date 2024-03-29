import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, FlatList } from 'react-native';
import { styles } from '../../styles/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '../../api/api_url';
import { useSelector } from 'react-redux';
import LoadingCard from '../../components/LoadingCard/LoadingCard';
import { NoData } from '../../components/NoData/NoData';
import CardView from '../../components/CardView';

export default function ArizaDetailScreen({ props }: any) {
    const navigation: any = useNavigation();
    const route: any = useRoute();
    const id: string = route?.params?.id
    const userToken = useSelector((state: any) => state.auth?.userToken)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true)
        await axios.get(API_URL.BASE_URL + API_URL.ARIZA_DETAIL_LIST + "?ArizaId=" + id, {
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
    useEffect(() => {
        getData()
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            {
                loading ?
                    <LoadingCard />
                    :
                    <View style={styles.content}>
                        <FlatList
                            data={data}
                            ListEmptyComponent={<NoData />}
                            renderItem={({ item }: any) => {
                                return (
                                    <CardView>
                                        <View>
                                            <Text style={styles.textTitle}>Ürün Kodu: {item?.UrunKod}</Text>
                                            {/* <Text style={styles.textNormal}>Ürün Id: {item?.UrunId}</Text> */}
                                            <View style={styles.viewTwoRows}>
                                                <Text style={styles.textBold}>Ürün Adı:</Text>
                                                <Text style={styles.textNormal}>{item?.UrunAd}</Text>
                                            </View>
                                            <View style={styles.viewTwoRows}>
                                                <Text style={styles.textBold}>Üretici Kod:</Text>
                                                <Text style={styles.textNormal}>{item?.UreticiKod}</Text>
                                            </View>
                                            <View style={styles.viewTwoRows}>
                                                <Text style={styles.textBold}>Birim:</Text>
                                                <Text style={styles.textNormal}>{item?.Birim}</Text>
                                            </View>
                                            <View style={styles.viewTwoRows}>
                                                <Text style={styles.textBold}>Miktar:</Text>
                                                <Text style={styles.textNormal}>{item?.Miktar}</Text>
                                            </View>
                                            <View style={styles.viewTwoRows}>
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
                                            </View>
                                        </View>
                                    </CardView>
                                )
                            }}
                        />
                    </View>
            }
        </SafeAreaView>
    );
}
