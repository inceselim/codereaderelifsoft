import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, TextInput, ScrollView, TouchableOpacity, Platform, Image, FlatList, Pressable, Modal, Keyboard, Switch } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import Tts from 'react-native-tts';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ArrowRight2, Car, ExportSquare, Magicpen, Trash } from 'iconsax-react-native';
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

    const [isOto, setIsOto] = useState(true);

    const [isState, setIsState] = useState(false);
    const [productSearch, setProductSearch] = useState<any[]>([]);
    const [barcodeText, setBarcodeText] = useState<string>("")
    const [barcodeTextState, setBarcodeTextState] = useState<boolean>(true)
    const [barkodFetchState, setFetchState] = useState<boolean>(false)
    const [barcodeMiktar, setBarcodeMiktar] = useState<any>("");
    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingUpdateCount, setLoadingUpdateCount] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleEmail, setModalVisibleEmail] = useState(false);
    const [productAmount, setProductAmount] = useState<any>("");
    const [selectItem, setSelectedItem] = useState<any>("");

    const [loadingSearch, setLoadingSearch] = useState(false);
    const [loadingAddProduct, setLoadingAddProduct] = useState(false);

    const [segment, setSegment] = useState(0);

    const [barcodeTextManuel, setBarkodTextManuel] = useState("")
    const [barcodeMiktarManuel, setBarcodeMiktarManuel] = useState("1")
    const [loadingSearchManuel, setLoadingSearchManuel] = useState(false)
    const [productSearchManuel, setProductSearchManuel] = useState<any[]>([])

    const handleBarcode = async () => {
        setLoading(true);
        console.log(Id)
        console.log(selectedCompany.Id)
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
                // Alert.alert("Uyarı","Eklenmiş Malzeme Bulunamadı...")
                setOkutulanlar([])
            })
            .finally(() => setLoading(false))
    }

    const handleDelete = async ({ key }: any) => {
        const productDelete = () =>
            Alert.alert('Ürün Sil', 'Silmek istediğinize emin misiniz?', [
                {
                    text: 'İptal',
                    onPress: () => console.log('İptal Pressed'),
                    style: 'cancel',
                },
                { text: 'Onay', onPress: () => handleDelete({ key }) },
            ]);
        productDelete()

        const handleDelete = async ({ key }: any) => {
            setLoadingDelete(true);
            await axios.delete(API_URL.DEV_URL + API_URL.SAYIM_DETAYLARI_DELETE + "?key=" + key,
                {
                    headers: {
                        "Authorization": "Bearer " + userToken
                    },
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
                    Tts.setDefaultLanguage('tr-TR');
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
                .finally(() => {
                    setLoadingDelete(false)
                    setIsState(!isState)
                })
        }
    }
    const handleDeleteAll = async () => {
        const productDeleteAll = () =>
            Alert.alert('Ürünleri Sil', 'Tümünü silmek istediğinize emin misiniz?', [
                {
                    text: 'İptal',
                    onPress: () => console.log('İptal Pressed'),
                    style: 'cancel',
                },
                { text: 'Onay', onPress: () => handleDeleteAll() },
            ]);

        productDeleteAll()

        const handleDeleteAll = async () => {
            setLoadingDelete(true);

            await axios.delete(API_URL.DEV_URL + API_URL.SAYIM_DETAYLARI_DELETE_ALL + "?sayimId=" + Id,
                {
                    headers: {
                        "Authorization": "Bearer " + userToken,
                    },
                })
                .then((response: any) => {
                    console.log("ÜRÜn SİLME RESPONSE: ", response.data)
                    setOkutulanlar([])
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
                    console.log("HATA SİLME İŞLEMİ", error.response)
                    console.log("HATA SİLME İŞLEMİ", error.code)
                    Tts.setDefaultLanguage('tr-TR');
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
                .finally(() => {
                    setLoadingDelete(false)
                })
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
                    Tts.setDefaultLanguage('tr-TR');
                    Tts.speak('Güncellendi', {
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
                    Tts.setDefaultLanguage('tr-TR');
                    Tts.speak('Güncelleme Başarısız', {
                        iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
                        rate: 0.5,
                        androidParams: {
                            KEY_PARAM_PAN: 0,
                            KEY_PARAM_VOLUME: 1.0,
                            KEY_PARAM_STREAM: 'STREAM_DTMF',
                        },
                    });
                })
                .finally(() => {
                    setLoadingUpdateCount(false)
                    setModalVisible(false)
                    setProductAmount(0)
                })
        }
    }


    const handleSearchProduct = async () => {
        if (barcodeTextState == false && barcodeText != "") {
            setLoadingSearch(true);
            await axios.post(API_URL.DEV_URL + API_URL.SAYIM_DETAYLARI_MALZEME_BUL +
                "?companyId=" + selectedCompany?.Id + "&name=" + barcodeText + "&garajNo=" + ProjectCode, {}, {
                headers: {
                    "Authorization": "Bearer " + userToken
                },
            })
                .then((response: any) => {
                    console.log("URUN ARA", response.data)
                    console.log("URUN ARA", response.data[0]?.Logicalref)
                    setProductSearch(response.data)
                    console.log("productSearch ", productSearch)
                    console.log("", productSearch.length)
                })
                .catch((error: any) => {
                    Alert.alert("Kayıt Bulunamadı...")
                    console.log(error)
                    setBarcodeTextState(true)
                    setBarcodeText("")
                })
                .finally(() => {
                    setLoadingSearch(false);
                    setFetchState(false)
                })
        }
    }
    const handleSearchProductManuel = async () => {
        setLoadingSearchManuel(true);
        await axios.post(API_URL.DEV_URL + API_URL.SAYIM_DETAYLARI_MALZEME_BUL +
            "?companyId=" + selectedCompany?.Id + "&name=" + barcodeTextManuel + "&garajNo=" + ProjectCode, {}, {
            headers: {
                "Authorization": "Bearer " + userToken
            },
        })
            .then((response: any) => {
                setProductSearchManuel(response.data)
                console.log("SEARCH MANUEL: ", response.data)
            })
            .catch((error: any) => {
                Alert.alert("Kayıt Bulunamadı...")
                console.log(error)
                setBarcodeTextState(true)
                setBarcodeText("")
            })
            .finally(() => {
                setLoadingSearchManuel(false);
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
            ItemAmount: 1,
            LogoAmount: LogoAmount

        }))
        if (ItemId != "" || ItemId != 0) {
            await axios.post(API_URL.DEV_URL + API_URL.SAYIM_DETAYLARI_MALZEME_EKLE, formData, {
                headers: {
                    "Authorization": "Bearer " + userToken,
                    "Content-Type": "multipart/form-data"
                }
            })
                .then((response: any) => {
                    console.log("URUN EKLE", response.data)
                    Tts.setDefaultLanguage('tr-TR');
                    Tts.speak('Eklendi', {
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
                    console.log("URUN EKLE", error)
                    Tts.setDefaultLanguage('tr-TR');
                    Tts.speak('Hata oluştu', {
                        iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
                        rate: 0.5,
                        androidParams: {
                            KEY_PARAM_PAN: 0,
                            KEY_PARAM_VOLUME: 1.0,
                            KEY_PARAM_STREAM: 'STREAM_DTMF',
                        },
                    });
                })
                .finally(() => {
                    setLoadingAddProduct(false);
                    setBarcodeMiktar("")
                    setProductSearch([])
                    setBarcodeText("")
                    setBarcodeTextState(true)
                    setFetchState(false)
                })
        }
    }

    const handleAddListManuel = async ({ ItemId, LogoAmount, ItemAmount }: any) => {
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
            ItemAmount: ItemAmount,
            LogoAmount: LogoAmount

        }))
        if (ItemId != "" || ItemId != 0) {
            await axios.post(API_URL.DEV_URL + API_URL.SAYIM_DETAYLARI_MALZEME_EKLE, formData, {
                headers: {
                    "Authorization": "Bearer " + userToken,
                    "Content-Type": "multipart/form-data"
                }
            })
                .then((response: any) => {
                    console.log("URUN EKLE", response.data)
                    Tts.setDefaultLanguage('tr-TR');
                    Tts.speak('Eklendi', {
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
                    console.log("URUN EKLE", error)
                    Tts.setDefaultLanguage('tr-TR');
                    Tts.speak('Hata oluştu', {
                        iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
                        rate: 0.5,
                        androidParams: {
                            KEY_PARAM_PAN: 0,
                            KEY_PARAM_VOLUME: 1.0,
                            KEY_PARAM_STREAM: 'STREAM_DTMF',
                        },
                    });
                })
                .finally(() => {
                    setLoadingAddProduct(false);
                    setBarcodeMiktarManuel("")
                    setProductSearch([])
                    setBarkodTextManuel("")
                    setBarcodeTextState(true)
                    setFetchState(false)
                })
        }
    }
    useEffect(() => {
        handleBarcode()
    }, [loadingDelete, loadingSave, loadingUpdateCount, loadingAddProduct, segment, isState]);

    useEffect(() => {
        if (isOto == true) {
            const durumKontrol = async () => {
                if (StatusSayim == 1) {
                    setSegment(1)
                }
            }
            durumKontrol()
        }
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <>
                    {
                        StatusSayim == 1 || okutulanlar.length < 1 ?
                            null :
                            <TouchableOpacity onPress={() => {
                                handleDeleteAll()
                            }}>
                                <Image
                                    source={require("../../assets/images/trashIcon1.png")}
                                    style={{
                                        width: 30,
                                        height: 30
                                    }}
                                />
                            </TouchableOpacity>
                    }
                </>
            ),
        });
    }, [navigation, loadingDelete, loadingSave, loadingUpdateCount, loadingAddProduct, segment, isState, barcodeText]);

    useEffect(() => {
        if (isOto == true) {
            if (barcodeText != "") {
                setImmediate(() => {
                    console.log("")
                    console.log("")
                    console.log("CALISTI", barcodeTextState)
                    console.log("CALISTI barcodeText", barcodeText)
                    console.log("")
                    console.log("")
                    setBarcodeTextState(false)
                    console.log("CALISTI", barcodeTextState)
                });
                setTimeout(() => {
                    setFetchState(true)
                }, 1.0 * 1000);
            }
        }
    }, [barcodeText])

    useEffect(() => {
        if (isOto == true) {
            console.log("")
            console.log("")
            console.log("CALISTI barcodeTextState", barcodeTextState)
            if (barkodFetchState == true) {
                handleSearchProduct()
            }
        }
    }, [barkodFetchState])
    useEffect(() => {
        if (isOto == true) {
            if (barcodeTextState == false) {
                console.log("ItemID: ", productSearch[0]?.Logicalref)
                if (productSearch.length > 0) {
                    handleAddList({
                        ItemId: productSearch[0]?.Logicalref,
                        LogoAmount: productSearch[0]?.Onhand
                    })
                }
            }
        }
    }, [productSearch])
    return (
        <SafeAreaView style={styles.container}>
            {
                loading || loadingDelete || loadingSearch || loadingAddProduct || loadingSearchManuel ?
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
                        <CardView>
                            <View style={styles.viewTwoRowJustify}>
                                <Text style={styles.textBold}>Otomatik</Text>
                                <Switch value={isOto} onValueChange={() => setIsOto(!isOto)} />
                            </View>
                        </CardView>

                        {
                            segment == 0 ?
                                <ScrollView>
                                    <View>
                                        {
                                            isOto == true ?
                                                <CardView>
                                                    <TextInput
                                                        style={styles.textInput}
                                                        value={barcodeText}
                                                        onChangeText={(e) => {
                                                            setBarcodeText(e)
                                                            setFetchState(false)
                                                        }}
                                                        onEndEditing={() => handleSearchProduct()}
                                                        onBlur={(e) => console.log("eEEEEEeee", e)}
                                                        placeholder='Barkod Giriniz'
                                                        placeholderTextColor={"#666"}
                                                        autoFocus={barcodeTextState}
                                                    />
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
                                                                                <Text style={[styles.textBold, { flex: 0.2 }]}>
                                                                                    Ürün Adı
                                                                                </Text>
                                                                                <Text style={[styles.textNormal, { flex: 0.8, textAlign: "right" }]}>
                                                                                    {item?.Name}
                                                                                </Text>
                                                                            </View>
                                                                        </CardView>
                                                                    </View>
                                                                )
                                                            })
                                                    }
                                                </CardView>
                                                :
                                                <CardView>
                                                    <TextInput
                                                        style={styles.textInput}
                                                        value={barcodeTextManuel}
                                                        onChangeText={(e) => {
                                                            setBarkodTextManuel(e)
                                                        }}
                                                        placeholder='Barkod Giriniz'
                                                        placeholderTextColor={"#666"}
                                                        autoFocus={true}
                                                    />
                                                    <ButtonPrimary text={"Malzeme Bul"} onPress={() => handleSearchProductManuel()}
                                                        disabled={barcodeTextManuel == "" ? true : false} />
                                                    {
                                                        productSearchManuel.length == 0 ?
                                                            null
                                                            :
                                                            productSearchManuel?.map((item: any) => {
                                                                return (
                                                                    <View key={item?.Code}>
                                                                        <View style={styles.viewTwoRowJustify}>
                                                                            <Text style={[styles.textLarge, styles.textBold]}>
                                                                                Ürün Kodu
                                                                            </Text>
                                                                            <Text style={[styles.textLarge, styles.textBold]}>
                                                                                {item?.Code}
                                                                            </Text>
                                                                        </View>
                                                                        <View style={styles.viewTwoRowJustify}>
                                                                            <Text style={[styles.textBold, { flex: 0.2 }]}>
                                                                                Ürün Adı
                                                                            </Text>
                                                                            <Text style={[styles.textNormal, { flex: 0.8, textAlign: "right" }]}>
                                                                                {item?.Name}
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                )
                                                            })
                                                    }
                                                    <TextInput style={styles.textInput}
                                                        value={barcodeMiktarManuel} onChangeText={setBarcodeMiktarManuel}
                                                        placeholder='Miktar Giriniz'
                                                        keyboardType='decimal-pad'
                                                        placeholderTextColor={"#666"}
                                                    />
                                                    <ButtonPrimary text={"Listeye Ekle"}
                                                        onPress={() => handleAddListManuel({
                                                            ItemId: productSearchManuel[0].Logicalref,
                                                            LogoAmount: productSearchManuel[0].Onhand,
                                                            ItemAmount: barcodeMiktarManuel
                                                        })}
                                                        disabled={productSearchManuel.length != 0 && barcodeMiktarManuel != "" ? false : true} />
                                                </CardView>
                                        }
                                    </View>
                                </ScrollView>
                                :
                                <View style={{ flex: 1 }}>
                                    <TextInput style={styles.textInput}
                                        value={email}
                                        onChangeText={setEmail}
                                        placeholder='Email Adresi Giriniz'
                                        placeholderTextColor={colors.gray}
                                    />
                                    <ButtonPrimary text={"Kaydet ve Gönder"} onPress={() => handleSave()}
                                        disabled={(StatusSayim == 1) || (email == "") ? true : false} />
                                    <View style={{ flex: 1 }}>
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
                                                                <Text style={[styles.textNormal, { flex: 1 }]}>{item?.ItemName}</Text>
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
                                                                            <Magicpen size={30} variant="Bulk" color={colors.primaryColor} />
                                                                        </Pressable>
                                                                }
                                                            </View>
                                                        </View>
                                                    </CardView>
                                                )
                                            }}
                                        />
                                    </View>
                                </View>
                        }
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
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
