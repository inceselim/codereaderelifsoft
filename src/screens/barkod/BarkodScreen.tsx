import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, TextInput, ScrollView, TouchableOpacity, Platform, Image, FlatList, Pressable, RefreshControl, Modal } from 'react-native';
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
import { styleModal } from '../../styles/styleModal';

export default function BarkodScreen({ props, route }: any) {
    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();
    const [okutulanlar, setOkutulanlar] = useState([]);
    const userToken = useSelector((state: any) => state.auth?.userToken)
    const selectedCompany: any = useSelector((state: any) => state.companySlice.company)
    const [loading, setLoading] = useState(false);
    const [loadingDeleteSayim, setLoadingDeleteSayim] = useState(false);
    const [loadingUpdateDescription, setLoadingUpdateDescription] = useState(false);

    const [barcodeData, setBarcodeData] = useState<any[]>([]);
    const [barcodeText, setBarcodeText] = useState<any>("")
    const [barcodeMiktar, setBarcodeMiktar] = useState<any>();
    const [refreshing, setRefreshing] = React.useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [descriptionUpdateText, setDescriptionUpdateText] = useState("");
    const [selectedItem, setSelectedItem] = useState("");

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
                    text: 'İptal',
                    onPress: () => console.log('İptal Pressed'),
                    style: 'cancel',
                },
                { text: 'Onayla', onPress: () => deleteSayım() },
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
            Alert.alert('Güncelle', 'Açıklamayı güncellemek istediğinize emin misiniz?', [
                {
                    text: 'İptal',
                    onPress: () => console.log('İptal Pressed'),
                    style: 'cancel',
                },
                { text: 'Onayla', onPress: () => updateDescription() },
            ]);
        updateOnay()

        const updateDescription = async () => {
            setLoadingUpdateDescription(true);
            const formData = new FormData();
            formData.append("key", selectedItem)
            formData.append("values", JSON.stringify({
                "Definition": descriptionUpdateText,
            }))
            await axios.put(API_URL.DEV_URL + API_URL.BARKOD_SAYIM_UPDATE, formData, {
                headers: {
                    "Authorization": "Bearer " + userToken,
                    "Content-Type": "multipart/form-data"
                }
            })
                .then((response: any) => {
                    console.log("UPDATE DESCRIPTION SAYIM RESPONSE: ", response.data)
                    Alert.alert("Açıklama Güncellendi")
                })
                .then(() => navigation.navigate("Barkod"))
                .catch((error: any) => {
                    console.log("CREATE SAYIM ERROR: ", error)
                    console.log("CREATE SAYIM ERROR: ", error.response)
                    console.log("CREATE SAYIM ERROR: ", error.code)
                    Alert.alert("Hata", "Lütfen tekrar deneyiniz...")

                })
                .finally(() => {
                    setLoadingUpdateDescription(false)
                    setDescriptionUpdateText("")
                    setModalVisible(false)
                })
        }
    }

    useEffect(() => {
        handleBarcode()
    }, [loadingDeleteSayim, loadingUpdateDescription]);
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
                            company: selectedCompany
                        })} />

                </CardView>
                <View style={{ flex: 1 }}>
                    {
                        loading || loadingDeleteSayim || loadingUpdateDescription ?
                            <LoadingCard />
                            :
                            <View>
                                <FlatList data={barcodeData}
                                    ListEmptyComponent={<NoData />}
                                    refreshControl={
                                        <RefreshControl title='Güncelleniyor'
                                            titleColor={"#1af"} tintColor={"#1af"} refreshing={refreshing} onRefresh={onRefresh} />
                                    }
                                    renderItem={({ item }: any) => {
                                        return (
                                            <CardView>
                                                <View style={styles.viewTwoRowJustify}>
                                                    <Text style={styles.textTitle}>Fiş No</Text>
                                                    <Text style={styles.textTitle}>{item?.FisNo}</Text>
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
                                                                {
                                                                    item?.Status == 0 ?
                                                                        <Pressable onPress={() => {
                                                                            setModalVisible(true)
                                                                            setSelectedItem(item?.Id)
                                                                        }}>
                                                                            <Image source={require("../../assets/images/textIcon1.png")}
                                                                                style={{
                                                                                    height: 24,
                                                                                    width: 24
                                                                                }} />
                                                                        </Pressable>
                                                                        : null
                                                                }
                                                            </View>
                                                            <Text style={styles.textNormal}>{item?.Definition}</Text>
                                                        </View>
                                                }
                                                <View style={styles.viewTwoRowJustify}>
                                                    <ButtonPrimary text={"Sayım Detayları"}
                                                        onPress={() => navigation.navigate("BarkodListele", {
                                                            company: selectedCompany,
                                                            Id: item?.Id,
                                                            ProjectCode: item?.ProjectCode,
                                                            StatusSayim: item?.Status,
                                                        })} />
                                                    {
                                                        item?.Status == 1 ?
                                                            null :
                                                            <ButtonPrimary text={"Sayımı Sil"}
                                                                onPress={() => handleDeleteSayim({ key: item?.Id })} />
                                                    }
                                                </View>
                                            </CardView>
                                        )
                                    }}
                                />
                            </View>
                    }
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styleModal.centeredView}>
                        <View style={styleModal.modalView}>
                            <View style={styles.viewTwoRowJustify}>
                                <Text />
                                <Pressable onPress={() => setModalVisible(false)}>
                                    <Image source={require("../../assets/images/closeIcon2.png")}
                                        style={{
                                            height: 30,
                                            width: 30
                                        }}
                                    />
                                </Pressable>
                            </View>
                            <TextInput style={styles.textInput}
                                value={descriptionUpdateText}
                                onChangeText={setDescriptionUpdateText}
                                placeholder='Açıklama Yazınız...'
                                placeholderTextColor={colors.gray} />
                            <ButtonPrimary text={"Güncelle"}
                                disabled={descriptionUpdateText != "" ? false : true}
                                onPress={() => {
                                    updateDescription()
                                }} />
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}
