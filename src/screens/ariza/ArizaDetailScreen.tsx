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
    console.log("PROPS: ", route?.params?.id)
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
                                            <Text style={styles.textTitle}>Arıza Malzeme Id: {item?.ArizaMalzemeId}</Text>
                                            <Text style={styles.textNormal}>Birim: {item?.Birim}</Text>
                                            <Text style={styles.textNormal}>Birim Id: {item?.BirimId}</Text>
                                            <Text style={styles.textNormal}>Kullanıcı: {item?.KullaniciAdSoyad}</Text>
                                            <Text style={styles.textNormal}>Stok Miktarı: {item?.D1}</Text>
                                            <Text style={styles.textNormal}>Detay: {item?.Detay}</Text>
                                            <Text style={styles.textNormal}>Miktar: {item?.Miktar}</Text>
                                            <Text />
                                            <Text style={styles.textNormal}>Tamirci: {item?.TamirciAdSoyad}</Text>
                                            <Text style={styles.textNormal}>Üretici Kod: {item?.UreticiKod}</Text>
                                            <Text style={styles.textNormal}>Ürün Id: {item?.UrunId}</Text>
                                            <Text style={styles.textNormal}>Ürün Adı: {item?.UrunAd}</Text>
                                            <Text style={styles.textNormal}>Ürün Kodu: {item?.UrunKod}</Text>
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
