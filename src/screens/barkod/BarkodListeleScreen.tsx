import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, TextInput, ScrollView, TouchableOpacity, Platform, Image, FlatList, Pressable, Modal } from 'react-native';
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
import LoadingCard from '../../components/LoadingCard/LoadingCard';
import { styleModal } from '../../styles/styleModal';

export default function BarkodListeleScreen({ props, route }: any) {
    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();
    const selectedCompany: any = useSelector((state: any) => state.companySlice.company)
    const userToken = useSelector((state: any) => state.auth?.userToken)
    const [okutulanlar, setOkutulanlar] = useState([]);
    const [email, setEmail] = useState<string>("")
    const Id = route.params.Id
    const ProjectCode = route.params.ProjectCode
    const StatusSayim = route.params.StatusSayim

    const [barcodeData, setBarcodeData] = useState<any[]>([]);
    const [productSearch, setProductSearch] = useState<any[]>([]);
    const [barcodeText, setBarcodeText] = useState<any>("")
    const [barcodeMiktar, setBarcodeMiktar] = useState<any>("");
    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingUpdateCount, setLoadingUpdateCount] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleEmail, setModalVisibleEmail] = useState(false);
    const [productAmount, setProductAmount] = useState<any>("");
    const [selectItem, setSelectedItem] = useState<any>("");
    console.log("")
    console.log("")
    console.log("BarkodData: ", barcodeData)
    console.log("")
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [loadingAddProduct, setLoadingAddProduct] = useState(false);



    const [segment, setSegment] = useState(0);

    const handleBarcode = async () => {
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
                setOkutulanlar(response.data)
            })
            .catch((err: any) => {
                console.log("SAYIM LİSTE ERROR: ", err)
            })
            .finally(() => setLoading(false))
    }
    useEffect(() => {
        const durumKontrol = async () => {
            if (StatusSayim == 1) {
                setSegment(1)
            }
        }
        durumKontrol()
        handleBarcode()
    }, [loadingDelete, loadingSave, loadingUpdateCount, loadingAddProduct]);
    const handleDelete = async ({ key, isAll }: any) => {
        const productDeleteAll = () =>
            Alert.alert('Ürünleri Sil', 'Tümünü silmek istediğinize emin misiniz?', [
                {
                    text: 'İptal',
                    onPress: () => console.log('İptal Pressed'),
                    style: 'cancel',
                },
                { text: 'Onay', onPress: () => handleDeleteAll({ isAll }) },
            ]);
        const productDelete = () =>
            Alert.alert('Ürün Sil', 'Silmek istediğinize emin misiniz?', [
                {
                    text: 'İptal',
                    onPress: () => console.log('İptal Pressed'),
                    style: 'cancel',
                },
                { text: 'Onay', onPress: () => handleDelete({ key, isAll }) },
            ]);
        if (isAll == true) {
            productDeleteAll()
        }
        else {
            productDelete()
        }
        const handleDelete = async ({ key, isAll }: any) => {
            setLoadingDelete(true);
            const formData: any = new FormData();
            formData.append("key", key)
            await axios.delete(API_URL.DEV_URL + API_URL.SAYIM_DETAYLARI_DELETE + "?isAll=" + isAll,
                {
                    headers: {
                        "Authorization": "Bearer " + userToken,
                        "Content-Type": "multipart/form-data"
                    },
                    data: formData
                })
                .then((response: any) => {
                    console.log("ÜRÜn SİLME RESPONSE: ", response.data)
                    Tts.setDefaultLanguage('tr-TR');
                    Tts.speak('Silindi', {
                        iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
                        rate: 0.5,
                        androidParams: {
                            KEY_PARAM_PAN: 0,
                            KEY_PARAM_VOLUME: 1.0,
                            KEY_PARAM_STREAM: 'STREAM_DTMF',
                        },
                    });
                })
                .catch((error: any) => {
                    console.log("HATA SİLME İŞLEMİ", error)
                    Tts.speak('Silme Başarısız!', {
                        iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
                        rate: 0.5,
                        androidParams: {
                            KEY_PARAM_PAN: 0,
                            KEY_PARAM_VOLUME: 0.99,
                            KEY_PARAM_STREAM: 'STREAM_NOTIFICATION',
                        },
                    });
                })
                .finally(() => setLoadingDelete(false))
        }
        const handleDeleteAll = async ({ isAll }: any) => {
            setLoadingDelete(true);
            const formData: any = new FormData();
            formData.append("key", "")
            await axios.delete(API_URL.DEV_URL + API_URL.SAYIM_DETAYLARI_DELETE + "?sayimId=" + Id + "?isAll=" + isAll,
                {
                    headers: {
                        "Authorization": "Bearer " + userToken,
                        "Content-Type": "multipart/form-data"
                    },
                    data: formData
                })
                .then((response: any) => {
                    console.log("ÜRÜn SİLME RESPONSE: ", response.data)
                    Tts.setDefaultLanguage('tr-TR');
                    Tts.speak('Silindi', {
                        iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
                        rate: 0.5,
                        androidParams: {
                            KEY_PARAM_PAN: 0,
                            KEY_PARAM_VOLUME: 1.0,
                            KEY_PARAM_STREAM: 'STREAM_DTMF',
                        },
                    });
                })
                .catch((error: any) => {
                    console.log("HATA SİLME İŞLEMİ", error)
                    Tts.speak('Silme Başarısız!', {
                        iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
                        rate: 0.5,
                        androidParams: {
                            KEY_PARAM_PAN: 0,
                            KEY_PARAM_VOLUME: 0.99,
                            KEY_PARAM_STREAM: 'STREAM_NOTIFICATION',
                        },
                    });
                })
                .finally(() => setLoadingDelete(false))
        }
    }

    const handleSave = async () => {
        const saveList = () =>
            Alert.alert('Kayıt', 'Kaydetmek istediğinize emin misiniz?', [
                {
                    text: 'İptal',
                    onPress: () => console.log('İptal Pressed'),
                    style: 'cancel',
                },
                { text: 'Kaydet', onPress: () => handleSave() },
            ]);
        saveList()

        const handleSave = async () => {
            setLoadingSave(true);
            const formData: any = new FormData();
            formData.append("Id", Id)
            formData.append("email", email)
            formData.append("companyId", selectedCompany.Id)
            await axios.post(API_URL.DEV_URL + API_URL.SAYIM_DETAYLARI_SEND_MAIL, formData,
                {
                    headers: {
                        "Authorization": "Bearer " + userToken,
                        "Content-Type": "multipart/form-data"
                    },
                    // data: formData
                })
                .then((response: any) => {
                    console.log("KAYIT RESPONSE: ", response.data)
                    Tts.setDefaultLanguage('tr-TR');
                    Tts.speak('Kaydedildi', {
                        iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
                        rate: 0.5,
                        androidParams: {
                            KEY_PARAM_PAN: 0,
                            KEY_PARAM_VOLUME: 1.0,
                            KEY_PARAM_STREAM: 'STREAM_DTMF',
                        },
                    });
                })
                .catch((error: any) => {
                    console.log("HATA KAYIT İŞLEMİ", error)
                    Tts.speak('Kayıt Başarısız!', {
                        iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
                        rate: 0.5,
                        androidParams: {
                            KEY_PARAM_PAN: 0,
                            KEY_PARAM_VOLUME: 0.99,
                            KEY_PARAM_STREAM: 'STREAM_NOTIFICATION',
                        },
                    });
                })
                .finally(() => {
                    setLoadingSave(false)
                    setEmail("")
                    setModalVisibleEmail(false)
                })
        }
    }

    const handleUpdateCount = async ({ key }: any) => {
        const updateAmount = () =>
            Alert.alert('Güncelle', 'Kaydetmek istediğinize emin misiniz?', [
                {
                    text: 'İptal',
                    onPress: () => console.log('İptal Pressed'),
                    style: 'cancel',
                },
                { text: 'Kaydet', onPress: () => handleUpdateCount({ key }) },
            ]);
        updateAmount()

        const handleUpdateCount = async ({ key }: any) => {
            setLoadingUpdateCount(true);
            const formData: any = new FormData();
            formData.append("key", key)
            formData.append("values", JSON.stringify({ "ItemAmount": productAmount }))
            console.log(formData)
            await axios.put(API_URL.DEV_URL + API_URL.SAYIM_DETAYLARI_AMOUNT_UPDATE, formData,
                {
                    headers: {
                        "Authorization": "Bearer " + userToken,
                        "Content-Type": "multipart/form-data"
                    },
                })
                .then((response: any) => {
                    console.log("Ürün Güncelle RESPONSE: ", response.data)
                })
                .catch((error: any) => {
                    console.log("HATA KAYIT İŞLEMİ", error)
                })
                .finally(() => {
                    setLoadingUpdateCount(false)
                    setModalVisible(false)
                    setProductAmount(0)
                })
        }
    }

    const handleSearchProduct = async () => {
        setLoadingSearch(true);
        await axios.post(API_URL.DEV_URL + API_URL.SAYIM_DETAYLARI_MALZEME_BUL +
            "?companyId=" + selectedCompany?.Id + "&name=" + barcodeText + "&garajNo=" + ProjectCode, {}, {
            headers: {
                "Authorization": "Bearer " + userToken
            }
        })
            .then((response: any) => {
                console.log("URUN ARA", response.data)
                setProductSearch(response.data)
            })
            .catch((error: any) => {
                console.log(error)
            })
            .finally(() => {
                setLoadingSearch(false);
            })
    }

    const handleAddList = async ({ ItemId, LogoAmount }: any) => {
        setLoadingAddProduct(true);
        console.log("Id?.Id", Id)
        console.log("barcodeText", barcodeText)
        console.log("ItemId", ItemId)
        console.log("barcodeMiktar", barcodeMiktar)
        console.log("LogoAmount", LogoAmount)

        const formData = new FormData();
        formData.append("values", JSON.stringify({
            SayimId: Id,
            ItemId: ItemId,
            ItemAmount: barcodeMiktar,
            LogoAmount: LogoAmount

        }))
        await axios.post(API_URL.DEV_URL + API_URL.SAYIM_DETAYLARI_MALZEME_EKLE, formData, {
            headers: {
                "Authorization": "Bearer " + userToken,
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response: any) => {
                console.log("URUN EKLE", response.data)
            })
            .catch((error: any) => {
                console.log("URUN EKLE", error)
            })
            .finally(() => {
                setLoadingAddProduct(false);
            })
    }


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <>
                    {
                        (barcodeText != "") || (barcodeMiktar != "") ?
                            <TouchableOpacity onPress={() => {
                                setBarcodeText("")
                                setBarcodeMiktar("")
                            }}>
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
                    {
                        StatusSayim == 1 ?
                            null :
                            <TouchableOpacity onPress={() => {
                                handleDelete({ isAll: true })
                            }}>
                                <Image
                                    source={require("../../assets/images/closeIcon1.png")}
                                    style={{
                                        marginStart: 6,
                                        width: 30,
                                        height: 30
                                    }}
                                />
                            </TouchableOpacity>
                    }
                </>
            ),
        });
    }, [navigation, barcodeText]);
    return (
        <SafeAreaView style={styles.container}>
            {
                loading || loadingDelete || loadingSearch || loadingAddProduct ?
                    <LoadingCard />
                    :
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
                                            <ButtonPrimary text={"Malzeme Bul"} onPress={() => handleSearchProduct()}
                                                disabled={barcodeText == "" ? true : false} />
                                            {
                                                productSearch.length == 0 ?
                                                    null
                                                    :
                                                    productSearch?.map((item: any) => {
                                                        return (
                                                            <View key={item?.Code}>
                                                                <CardView>
                                                                    <View style={styles.viewTwoRowJustify}>
                                                                        <Text style={[styles.textLarge, styles.textBold]}>
                                                                            Ürün Kodu
                                                                        </Text>
                                                                        <Text style={[styles.textLarge, styles.textBold]}>
                                                                            {item?.Code}
                                                                        </Text>
                                                                    </View>
                                                                    <View style={styles.viewTwoRowJustify}>
                                                                        <Text style={styles.textNormal}>
                                                                            Ürün Adı
                                                                        </Text>
                                                                        <Text style={styles.textNormal}>
                                                                            {item?.Name}
                                                                        </Text>
                                                                    </View>
                                                                </CardView>
                                                            </View>
                                                        )
                                                    })
                                            }
                                            <TextInput style={styles.textInput}
                                                value={barcodeMiktar} onChangeText={setBarcodeMiktar}
                                                placeholder='Miktar Giriniz'
                                                keyboardType='decimal-pad'
                                                placeholderTextColor={"#666"}
                                            />
                                            <ButtonPrimary text={"Listeye Ekle"}
                                                onPress={() => handleAddList({
                                                    ItemId: productSearch[0].Logicalref,
                                                    LogoAmount: productSearch[0].Onhand
                                                })}
                                                disabled={productSearch.length != 0 && barcodeMiktar != "" ? false : true} />
                                        </CardView>
                                    </View>
                                </ScrollView>
                                :
                                <View>
                                    <TextInput style={styles.textInput}
                                        value={email}
                                        onChangeText={setEmail}
                                        placeholder='Email Adresi Giriniz'
                                        placeholderTextColor={colors.gray}
                                    />
                                    <ButtonPrimary text={"Kaydet ve Gönder"} onPress={() => handleSave()}
                                        disabled={(StatusSayim == 1) || (email == "") ? true : false} />
                                    <FlatList data={okutulanlar}
                                        ListEmptyComponent={<NoData />}
                                        renderItem={({ item }: any) => {
                                            return (
                                                <CardView>
                                                    <View style={{
                                                        flexDirection: "column",
                                                    }}>
                                                        <View>
                                                            <Text style={styles.textBold}>{item?.ItemCode}</Text>
                                                            <Text style={styles.textNormal}>{item?.ItemBarcode}</Text>
                                                        </View>
                                                        <View style={styles.viewTwoRowJustify}>
                                                            <Text style={{ flex: 1 }}>{item?.ItemName}</Text>
                                                            <Text style={[{ paddingEnd: 14, }, styles.textBold]}>{item?.ItemAmount} {item?.ItemUnitName}</Text>
                                                            {
                                                                StatusSayim == 1 ?
                                                                    null :
                                                                    <Pressable onPress={() => handleDelete({ key: item?.CountingId, isAll: false })}>
                                                                        <Trash size={30} variant="Bold" color={colors.primaryColor} style={{ marginEnd: 4 }} />
                                                                    </Pressable>
                                                            }
                                                            {
                                                                StatusSayim == 1 ?
                                                                    null :
                                                                    <Pressable onPress={() => {
                                                                        setModalVisible(true)
                                                                        setSelectedItem(item?.CountingId)
                                                                    }}>
                                                                        <ExportSquare size={30} variant="Bulk" color={colors.primaryColor} />
                                                                    </Pressable>
                                                            }
                                                        </View>
                                                    </View>
                                                </CardView>
                                            )
                                        }}
                                    />
                                </View>
                        }
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
                                        value={productAmount}
                                        keyboardType='decimal-pad'
                                        onChangeText={setProductAmount}
                                        placeholder='Ürün Miktarı Giriniz...'
                                        placeholderTextColor={colors.gray} />
                                    <ButtonPrimary text={"Güncelle"}
                                        disabled={productAmount != null ? false : true}
                                        onPress={() => {
                                            handleUpdateCount({ key: selectItem })
                                        }} />
                                </View>
                            </View>
                        </Modal>
                    </View>
            }
        </SafeAreaView>
    );
}
