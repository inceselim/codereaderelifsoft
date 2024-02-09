import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, TextInput, ScrollView, TouchableOpacity, Platform, Image, FlatList, Pressable, RefreshControl } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import Tts from 'react-native-tts';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ArrowRight2, Car, ExportSquare, Trash } from 'iconsax-react-native';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import CardView from '../../components/CardView';
import { NoData } from '../../components/NoData/NoData';
import axios from 'axios';
import { API_URL } from '../../api/api_url';
import LoadingCard from '../../components/LoadingCard/LoadingCard';

export default function BarkodScreen({ props, route }: any) {
    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();
    const [okutulanlar, setOkutulanlar] = useState([]);
    const userToken = useSelector((state: any) => state.auth?.userToken)
    const company = route?.params?.company
    console.log("object")
    console.log("object")
    console.log("object")
    console.log("object", company)
    console.log("object")
    console.log("object")
    const [loading, setLoading] = useState(false);
    const [loadingDeleteSayim, setLoadingDeleteSayim] = useState(false);
    const [loadingUpdateDescription, setLoadingUpdateDescription] = useState(false);

    const [barcodeData, setBarcodeData] = useState<any[]>([]);
    const [barcodeText, setBarcodeText] = useState<any>("")
    const [barcodeMiktar, setBarcodeMiktar] = useState<any>();
    const [refreshing, setRefreshing] = React.useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            // Ekran odaklandığında yapılacak işlemler
            console.log('Ekran odaklandı');
            handleBarcode()
        }
    }, [isFocused]);


    const onRefresh = React.useCallback(() => {
        handleBarcode()
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1.2 * 1000);
    }, []);

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

    const handleDeleteSayim = async ({ key }: any) => {
        const deleteOnay = () =>
            Alert.alert('Sayım Sil', 'Sayımı silmek istediğinize emin misiniz?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => deleteSayım() },
            ]);
        deleteOnay()

        const deleteSayım = async () => {
            setLoadingDeleteSayim(true);
            const formData = new FormData();
            formData.append("key", key)
            await axios.delete(API_URL.DEV_URL + API_URL.BARKOD_SAYIM_DELETE, {
                headers: {
                    "Authorization": "Bearer " + userToken,
                    "Content-Type": "multipart/form-data"
                },
                data: formData
            })
                .then((response: any) => {
                    console.log("CREATE SAYIM RESPONSE: ", response.data)
                })
                .catch((error: any) => {
                    console.log("CREATE SAYIM ERROR: ", error)
                    console.log("CREATE SAYIM ERROR: ", error.response)
                    console.log("CREATE SAYIM ERROR: ", error.code)

                })
                .finally(() => setLoadingDeleteSayim(false))
        }

    }

    const updateDescription = async () => {
        const updateOnay = () =>
            Alert.alert('Güncelle', 'Açıklamayı istediğinize emin misiniz?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => updateDescription() },
            ]);
        updateOnay()

        const updateDescription = async () => {
            setLoadingUpdateDescription(true);
            const formData = new FormData();
            formData.append("key", key)
            await axios.post(API_URL.DEV_URL + API_URL.BARKOD_SAYIM_UPDATE, formData, {
                headers: {
                    "Authorization": "Bearer " + userToken,
                    "Content-Type": "multipart/form-data"
                }
            })
                .then((response: any) => {
                    console.log("CREATE SAYIM RESPONSE: ", response.data)
                    Alert.alert("Açıklama Güncellendi")
                })
                .then(() => navigation.navigate("Barkod"))
                .catch((error: any) => {
                    console.log("CREATE SAYIM ERROR: ", error)
                    console.log("CREATE SAYIM ERROR: ", error.response)
                    console.log("CREATE SAYIM ERROR: ", error.code)
                    Alert.alert("Hata", "Lütfen tekrar deneyiniz...")

                })
                .finally(() => setLoadingUpdateDescription(false))
        }
    }

    useEffect(() => {
        handleBarcode()
    }, [loadingDeleteSayim]);
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
                <View style={{ flex: 1 }}>
                    {
                        loading || loadingDeleteSayim || loadingUpdateDescription ?
                            <LoadingCard />
                            :
                            <View>
                                <FlatList data={barcodeData}
                                    refreshControl={
                                        <RefreshControl title='Güncelleniyor'
                                            titleColor={"#1af"} tintColor={"#1af"} refreshing={refreshing} onRefresh={onRefresh} />
                                    }
                                    renderItem={({ item }: any) => {
                                        return (
                                            <CardView>
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
                                                            <View style={styles.viewTwoRowJustify}>
                                                                <Text style={styles.textBold}>Açıklama</Text>
                                                                <Pressable onPress={() => updateDescription()}>
                                                                    <Image source={require("../../assets/images/textIcon1.png")}
                                                                        style={{
                                                                            height: 24,
                                                                            width: 24
                                                                        }} />
                                                                </Pressable>
                                                            </View>
                                                            <Text style={styles.textNormal}>{item?.Definition}</Text>
                                                        </View>
                                                }
                                                <View style={styles.viewTwoRowJustify}>
                                                    <ButtonPrimary text={"Sayım Detayları"}
                                                        onPress={() => navigation.navigate("BarkodListele", {
                                                            company: company,
                                                            Id: item?.Id,
                                                            ProjectCode: item?.ProjectCode
                                                        })} />
                                                    <ButtonPrimary text={"Sayımı Sil"}
                                                        onPress={() => handleDeleteSayim({ key: item?.Id })} />
                                                </View>
                                            </CardView>
                                        )
                                    }}
                                />
                            </View>
                    }
                </View>
            </View>
        </SafeAreaView>
    );
}
