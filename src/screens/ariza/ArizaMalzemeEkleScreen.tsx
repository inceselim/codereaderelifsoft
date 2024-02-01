import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Pressable, Modal, StyleSheet, Alert, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import axios from 'axios';
import { API_URL } from '../../api/api_url';
import { useSelector } from 'react-redux';
import LoadingCard from '../../components/LoadingCard/LoadingCard';
import { styleModal } from '../../styles/styleModal';
import { CloseCircle } from 'iconsax-react-native';

export default function ArizaMalzemeEkleScreen({ props, route }: any) {
  const userToken = useSelector((state: any) => state.auth?.userToken)
  const GarajId = route?.params?.GarajId
  console.log(GarajId)
  const company = route?.params?.company
  const onHand = true   //Stokta olanlar için true hepsi için false seçilir.

  const [loadingMalzeme, setLoadingMalzeme] = useState(false);
  const [loadingTamirci, setLoadingTamirci] = useState(false);
  const [dataMalzeme, setDataMalzeme] = useState([]);
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
  useEffect(() => {
    getTamirciList()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      {
        loadingMalzeme || loadingTamirci ?
          <LoadingCard />
          :
          <View style={styles.content}>
            {
              !visibleTamirci ?
                <>
                  <ButtonPrimary text={"Tamirci Seç"}
                    onPress={() => {
                      setVisibleTamirci(true)
                    }} />
                  <Text style={styles.textBold}>Tamirci</Text>
                  <Text style={styles.textSmall}>{selectedTamirci?.fullName}</Text>
                </>
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
            {/* <Modal
              animationType="slide"
              transparent={true}
              visible={visibleTamirci}
              onRequestClose={() => {
                setVisibleTamirci(!visibleTamirci);
              }}>
              <View style={styleModal.centeredView}>
                <View style={styleModal.modalView}>
                  <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 6,
                    borderBottomWidth: 1,
                    marginBottom: 4,
                  }} >
                    <Text style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      color: colors.primaryColor,
                    }}>Tamirci Seç</Text>
                    <TouchableOpacity onPress={() => setVisibleTamirci(!visibleTamirci)}>
                      <CloseCircle size="32" color={colors.black} />
                    </TouchableOpacity>
                  </View>
                  <FlatList data={dataTamirci}
                    renderItem={({ item }: any) => {
                      return (
                        <View>
                          <TouchableOpacity onPress={() => {
                            setSelectedTamirci(item)
                            setVisibleTamirci(false)
                          }}>
                            <Text style={styles.textSmall}>{item?.fullName}</Text>
                          </TouchableOpacity>
                        </View>
                      )
                    }}
                  />
                </View>
              </View>
            </Modal> */}

            <TextInput style={styles.textInput}
              placeholder='Malzeme Adet'
              inputMode='decimal'
              value={malzemeAdet}
              onChangeText={setMalzemeAdet}
              placeholderTextColor={"#555"} />
            <ButtonPrimary text={"Kaydet"}
              disabled={
                (malzemeAdet != "") &&
                  (selectedTamirci != "") &&
                  (selectedMalzeme != "") ? false : true}></ButtonPrimary>
          </View>
      }
    </SafeAreaView>
  );
}