import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Pressable, Modal, StyleSheet, Alert, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import axios from 'axios';
import { API_URL } from '../../api/api_url';
import { useSelector } from 'react-redux';
import LoadingCard from '../../components/LoadingCard/LoadingCard';
import { styleModal } from '../../styles/styleModal';
import { CloseCircle } from 'iconsax-react-native';
import CardView from '../../components/CardView';

export default function ArizaMalzemeEkleScreen({ props, route }: any) {
  const userToken = useSelector((state: any) => state.auth?.userToken)
  const GarajId = route?.params?.GarajId
  console.log(GarajId)
  const company = route?.params?.company
  const onHand = true   //Stokta olanlar için true hepsi için false seçilir.

  const [loadingMalzeme, setLoadingMalzeme] = useState(false);
  const [loadingTamirci, setLoadingTamirci] = useState(false);
  const [loadingGonder, setLoadingGonder] = useState(false);
  const [dataMalzeme, setDataMalzeme] = useState<any>([]);
  const [selectedMalzeme, setSelectedMalzeme] = useState<any>([]);
  const [dataTamirci, setDataTamirci] = useState<any>([]);
  const [visibleTamirci, setVisibleTamirci] = useState(false);
  const [selectedTamirci, setSelectedTamirci] = useState<any>([]);
  const [malzemeAdet, setMalzemeAdet] = useState("");
  const [barkod, setBarkod] = useState("");

  async function getMalzeme() {
    setLoadingMalzeme(true);
    await axios.post(API_URL.BASE_URL + API_URL.ARIZA_MALZEME_LISTELE +
      "?companyId=" + company.Id + "&name=" + barkod + "&garajNo=" + "340.00" + "&onHand=false",
      {}, {
      headers: {
        "Authorization": "Bearer " + userToken,
        "Content-Length": Infinity
      }
    })
      .then((response: any) => {
        // console.log("MALZEME data: ", response.data);
        setDataMalzeme(response.data)
        console.log("dataMalzeme", dataMalzeme)
      })
      .catch((err: any) => {
        console.log("HATA ariza malzeme ara: ", err)
        Alert.alert("Hata Oluştu", err)
      })
      .finally(() => setLoadingMalzeme(false))
  }

  async function getTamirciList() {
    setLoadingTamirci(true);
    console.log(API_URL.BASE_URL + API_URL.ARIZA_TAMIRCI_LIST + "?garajKodu=" + GarajId)
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

  async function handleData() {
    console.log("TAMAM")
    setLoadingGonder(true);
    await axios.post(API_URL.BASE_URL + API_URL.ARIZA_GONDER_URL, {}, {
      headers: {
        "Authorization": "Bearer " + userToken
      }
    })
      .then((response: any) => {
        console.log("MAL GONDER RES: ", response.data)
      })
      .catch((error: any) => console.log("ERROR: ", error))
      .finally(() => setLoadingGonder(false))
  }
  useEffect(() => {
    getTamirciList()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      {
        loadingMalzeme || loadingTamirci || loadingGonder ?
          <LoadingCard />
          :
          <ScrollView>
            <View style={styles.content}>
              <CardView>
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
                  onChangeText={setBarkod}
                  autoFocus
                />
                <ButtonPrimary text={"Malzeme Ara"} onPress={() => getMalzeme()} disabled={barkod != "" ? false : true} />
                {
                  dataMalzeme?.map((item: any) => {
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
                  })
                }
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
                  <FlatList data={dataTamirci}
                    renderItem={({ item }: any) => {
                      return (
                        <View>
                          <TouchableOpacity style={{ paddingVertical: 4, }} onPress={() => {
                            setSelectedTamirci(item)
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
                  parseInt(dataMalzeme[0].Onhand) < parseInt(malzemeAdet) ?
                    // console.log("Onhand", dataMalzeme[0].Onhand)
                    Alert.alert("Hata", "Stok Yeterli Değil")
                    :
                    // console.log("object", (dataMalzeme[0].Onhand))
                    handleData()
                }}
                disabled={
                  (malzemeAdet != "") &&
                    (selectedTamirci != null) &&
                    (dataMalzeme != null) ? false : true}></ButtonPrimary>
            </View>
          </ScrollView>
      }
    </SafeAreaView>
  );
}