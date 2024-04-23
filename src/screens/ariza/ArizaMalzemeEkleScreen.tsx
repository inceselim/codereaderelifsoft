import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Pressable, Modal, StyleSheet, Alert, TextInput, TouchableOpacity, FlatList, ScrollView, Platform, Image, Switch } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import axios from 'axios';
import { API_URL } from '../../api/api_url';
import { useSelector } from 'react-redux';
import LoadingCard from '../../components/LoadingCard/LoadingCard';
import { styleModal } from '../../styles/styleModal';
import { CloseCircle, SearchZoomIn } from 'iconsax-react-native';
import CardView from '../../components/CardView';
import jwtDecode from 'jwt-decode';
import Tts from 'react-native-tts';
import { ViewTwoRowsCard } from '../../components/ViewTwoRowsCard/ViewTwoRowsCard';
import { ViewColCard } from '../../components/ViewColCard/ViewColCard';
import { Camera } from 'react-native-camera-kit';

export default function ArizaMalzemeEkleScreen({ props, route }: any) {
  const userToken = useSelector((state: any) => state.auth?.userToken)
  const GarajId = route?.params?.GarajId
  const company = route?.params?.company
  const ArizaId = route?.params?.ArizaId
  const onHand = true   //Stokta olanlar için true hepsi için false seçilir.

  const [isCamera, setIsCamera] = useState(true)

  const [loadingMalzeme, setLoadingMalzeme] = useState(false);
  const [loadingTamirci, setLoadingTamirci] = useState(false);
  const [loadingGonder, setLoadingGonder] = useState(false);
  const [userId, setUserId] = useState("");
  const [dataMalzeme, setDataMalzeme] = useState<any[]>([]);
  const [dataTamirci, setDataTamirci] = useState([]);
  const [dataTamirciFiltered, setDataTamirciFiltered] = useState([]);
  const [visibleTamirci, setVisibleTamirci] = useState(false);
  const [selectedTamirci, setSelectedTamirci] = useState<any>([]);
  const [malzemeAdet, setMalzemeAdet] = useState("");
  const [barkod, setBarkod] = useState("");
  const [searchTamirci, setSearchTamirci] = useState("");

  async function getMalzeme() {
    setLoadingMalzeme(true);
    await axios.post(API_URL.BASE_URL + API_URL.ARIZA_MALZEME_LISTELE +
      "?companyId=" + company.Id + "&name=" + barkod + "&garajNo=" + GarajId + "&onHand=false",
      {}, {
      headers: {
        "Authorization": "Bearer " + userToken,
        "Content-Length": Infinity
      }
    })
      .then((response: any) => {
        // console.log("MALZEME data: ", response.data);
        setDataMalzeme(response.data)
        // console.log("dataMalzeme", dataMalzeme)
        Tts.setDefaultLanguage('tr-TR');
        Tts.speak('Malzeme Bulundu', {
          iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
          rate: 0.5,
          androidParams: {
            KEY_PARAM_PAN: 0,
            KEY_PARAM_VOLUME: 1.0,
            KEY_PARAM_STREAM: 'STREAM_DTMF',
          },
        });
      })
      .catch((err: any) => {
        console.log("HATA ariza malzeme ara: ", err)
        Alert.alert("Hata Oluştu", err)
      })
      .finally(() => setLoadingMalzeme(false))
  }

  async function getTamirciList() {
    setLoadingTamirci(true);
    await axios.get(API_URL.BASE_URL + API_URL.ARIZA_TAMIRCI_LIST + "?garajKodu=" + GarajId, {
      headers: {
        "Authorization": "Bearer " + userToken
      }
    })
      .then((response: any) => {
        // console.log(response.data);
        setDataTamirci(response.data);
      })
      .catch((error: any) => {
        Alert.alert("Hata Oluştu", error)
        console.log("Ariza TAMIRCI: ", error)
      })
      .finally(() => setLoadingTamirci(false))
  }

  const SearchTamirci = async () => {
    let temp = dataTamirci.filter((filter: any) => {
      return (
        filter?.fullName.toLocaleLowerCase('tr').includes(
          searchTamirci.toLocaleLowerCase(),
        )
      );
    });
    setDataTamirciFiltered(temp);
  }
  async function getUserId() {
    const decoded: any = await jwtDecode(userToken);
    setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"])
  };

  async function handleData() {
    setLoadingGonder(true)
    const formData = new FormData();
    formData.append("values", JSON.stringify([{
      KullaniciId: userId,
      UrunKod: dataMalzeme[0]?.Code,
      UrunAd: dataMalzeme[0]?.Name,
      UreticiKod: dataMalzeme[0]?.ProducerCode,
      Birim: dataMalzeme[0]?.UnitName,
      BirimId: dataMalzeme[0]?.UnitLineRef,
      UrunId: dataMalzeme[0]?.Logicalref,
      D1: dataMalzeme[0]?.Onhand,
      Miktar: malzemeAdet,
      TamirciId: selectedTamirci?.id,
      ArizaId: ArizaId
    }]))

    await axios.post(API_URL.BASE_URL + API_URL.ARIZA_GONDER_URL, formData, {
      headers: {
        "Authorization": "Bearer " + userToken,
        "Content-Type": "multipart/form-data"
      }
    })
      .then((response: any) => {
        console.log("MAL GONDER RES: ", response.data)
        Tts.setDefaultLanguage('tr-TR');
        Tts.speak('Kaydedildi', {
          iosVoiceId: 'com.apple.voice.compact.tr-TR.Yelda',
          rate: 0.5,
          androidParams: {
            KEY_PARAM_PAN: 0,
            KEY_PARAM_VOLUME: 1.0,
            KEY_PARAM_STREAM: 'STREAM_SYSTEM',
          },
        });
        setSelectedTamirci("")
        setBarkod("")
        setDataMalzeme([])
        setMalzemeAdet("")
      })
      .catch((error: any) => {
        console.log("MAL GONDER ERROR: ", error)
        Alert.alert("Hata", error)
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
        console.log("MAL GONDER ERROR: ", error.code)
      })
      .finally(() => setLoadingGonder(false))
  }

  useEffect(() => {
    getUserId()
    getTamirciList()
  }, [])

  //
  // Barkod kamera aktifse ve bulunmuş ürün yoksa otomatik arayacak
  //
  useEffect(() => {
    console.log("BARKOD: ", barkod)
    if (dataMalzeme.length < 1) {
      if (isCamera) {
        if (barkod != "") {
          console.log("barkod useeffect çalıştı")
          setTimeout(() => {
            // setFetchState(true)
            getMalzeme()
          }, 0.8 * 1000);
        }
      }
    }
  }, [barkod])
  return (
    <SafeAreaView style={styles.container}>
      {
        loadingMalzeme || loadingTamirci || loadingGonder ?
          <LoadingCard />
          :
          <View style={styles.content}>
            <CardView>
              <View style={styles.viewTwoRowJustify}>
                <Text style={styles.textBold}>{isCamera ? "Kamera Açık" : "Elle Giriş Açık"}</Text>
                <Switch value={isCamera} onValueChange={() => setIsCamera(!isCamera)} />
              </View>
              {
                isCamera ?
                  <Camera style={{ height: 150, width: "100%" }}
                    scanBarcode={dataMalzeme.length > 0 ? false : true}
                    onReadCode={(event: any) => {
                      // Alert.alert("BARKOD: ", event?.nativeEvent?.codeStringValue)
                      // console.log("EVENT: ", event?.nativeEvent?.codeStringValue)
                      setBarkod(event?.nativeEvent?.codeStringValue)
                    }}
                    showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner, that stops when a code has been found. Frame always at center of the screen
                    laserColor='red' // (default red) optional, color of laser in scanner frame
                    frameColor='white' // (default white) optional, color of border of scanner frame
                  />
                  :
                  <View>
                    <TextInput style={[styles.textInput, {
                      backgroundColor: colors.white,
                      marginVertical: 8,
                      borderRadius: 8,
                      borderColor: colors.gray,
                      borderWidth: 1,
                      paddingStart: 12,
                      fontSize: 15,
                      fontWeight: "normal"
                    }]}
                      focusable={true}
                      placeholder='Barkod & Malzeme Adı Giriniz...'
                      placeholderTextColor={colors.gray}
                      value={barkod}
                      enablesReturnKeyAutomatically
                      onChangeText={setBarkod}
                      autoFocus
                    />
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <ButtonPrimary text={"Temizle"} onPress={() => setBarkod("")} disabled={barkod != "" ? false : true} />
                      <ButtonPrimary text={"Malzeme Ara"} onPress={() => getMalzeme()} disabled={barkod != "" ? false : true} />
                    </View>

                  </View>
              }
              {
                dataMalzeme?.length > 0 ?
                  <ButtonPrimary text={"Temizle"} onPress={() => setDataMalzeme([])} />
                  : null
              }
              <FlatList data={dataMalzeme}
                renderItem={({ item }: any) => {
                  return (
                    <View key={item?.Code}>
                      <Text style={styles.textBold}>{item?.Code}</Text>
                      <View style={styles.viewTwoRowJustify}>
                        <Text style={styles.textNormal}>Stok Adet:</Text>
                        <Text style={styles.textNormal}>{item?.Onhand} {item?.UnitName}</Text>
                      </View>
                      <Text style={styles.textNormal}>{item?.Name}</Text>
                    </View>
                  )
                }} />
            </CardView>

            {
              !visibleTamirci ?
                <CardView>
                  <ButtonPrimary text={"Tamirci Seç"}
                    onPress={() => {
                      setVisibleTamirci(true)
                    }} />
                  <Text style={styles.textBold}>Tamirci</Text>
                  <Text style={styles.textSmall}>{selectedTamirci?.fullName}</Text>
                </CardView>
                :
                <FlatList data={dataTamirciFiltered.length < 1 ? dataTamirci : dataTamirciFiltered}
                  ListHeaderComponent={
                    <View style={{
                      flexDirection: "row",
                      alignItems: "center"
                    }}>
                      <TextInput style={[styles.textInput, { flex: 1, marginEnd: 8 }]}
                        value={searchTamirci}
                        onChangeText={setSearchTamirci}
                        placeholder='Tamirci Ara'
                        placeholderTextColor={colors.gray}
                      />
                      <Pressable onPress={() => SearchTamirci()}>
                        <SearchZoomIn size="32" color={colors.primaryColor} />
                      </Pressable>
                      <Pressable onPress={() => setDataTamirciFiltered([])}>
                        <Image source={require("../../assets/images/trashIcon1.png")}
                          style={{
                            width: 30,
                            height: 30,
                            marginStart: 6,
                          }}
                        />
                      </Pressable>
                    </View>
                  }
                  renderItem={({ item }: any) => {
                    return (
                      <View>
                        <TouchableOpacity style={{ paddingVertical: 4, }} onPress={() => {
                          setSelectedTamirci(item)
                          setSearchTamirci("")
                          setVisibleTamirci(false)
                        }}>
                          <Text style={styles.textSmall}>{item?.fullName}</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  }}
                />
            }

            <TextInput style={styles.textInput}
              placeholder='Malzeme Adet'
              inputMode='decimal'
              value={malzemeAdet}
              onChangeText={setMalzemeAdet}
              placeholderTextColor={"#555"} />
            <ButtonPrimary text={"Kaydet"}
              onPress={() => {
                parseInt(malzemeAdet) > 0 ?
                  dataMalzeme?.length > 0 && (parseInt(dataMalzeme[0].Onhand) < parseInt(malzemeAdet)) ?
                    // console.log("Onhand", dataMalzeme[0].Onhand)
                    Alert.alert("Uyarı", "Stok Yeterli Değil")
                    :
                    // console.log("object", (dataMalzeme[0].Onhand))
                    handleData()
                  : Alert.alert("Uyarı", "Sıfır Girilemez")
              }}
              disabled={
                (malzemeAdet != "") &&
                  (selectedTamirci != "") &&
                  (dataMalzeme?.length > 0) ? false : true}></ButtonPrimary>
          </View>
      }
    </SafeAreaView>
  );
}