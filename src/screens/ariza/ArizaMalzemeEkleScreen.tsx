import React, { useState } from 'react';
import { View, Text, SafeAreaView, Pressable, Modal, StyleSheet, Alert, TextInput } from 'react-native';
import { styles } from '../../styles/styles';
import { ModalView } from '../../components/ModalView/ModalView';
import { colors } from '../../styles/colors';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import axios from 'axios';
import { API_URL } from '../../api/api_url';
import { useSelector } from 'react-redux';
import LoadingCard from '../../components/LoadingCard/LoadingCard';

export default function ArizaMalzemeEkleScreen({ props, route }: any) {
  const userToken = useSelector((state: any) => state.auth?.userToken)
  console.log(route.params.GarajId)
  const GarajId = route?.params?.GarajId
  const onHand = false   //Stokta olanlar için true hepsi için false seçilir.

  const [loadingMalzeme, setLoadingMalzeme] = useState(false);
  const [dataMalzeme, setDataMalzeme] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tamirciList, setTamirciList] = useState([]);
  const [selectedTamirci, setSelectedTamirci] = useState("");
  const [barkod, setBarkod] = useState("");
  console.log(userToken)
  async function getMalzeme() {
    // setLoadingMalzeme(true);
    await axios.post(API_URL.DEV_URL + API_URL.ARIZA_MALZEME_LISTELE +
      "?companyId=23" + "&name=" + barkod + "&garajNo=" + GarajId + "&onHand=true",
      {}, {
      headers: {
        "Authorization": "Bearer " + userToken,
        "Content-Length": Infinity
      }
    })
      .then((response: any) => {
        console.log("MALZEME data: ", response.data);
        setDataMalzeme(response.data)
      })
      .catch((err: any) => {
        console.log("HATA ariza malzeme ara: ", err)
        Alert.alert("Hata Oluştu", err)
      })
      .finally(() => setLoadingMalzeme(false))
  }
  return (
    <SafeAreaView style={styles.container}>
      {
        loadingMalzeme ?
          <LoadingCard />
          :
          dataMalzeme ?
            <View style={styles.content}>
              <ModalView visible={modalVisible} setModalVisible={setModalVisible} />
              {/* <Pressable
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textTitle}>Show Modal</Text>
        </Pressable> */}
              <TextInput style={{
                backgroundColor: colors.white,
                marginVertical: 8,
                borderRadius: 8,
                borderColor: colors.gray,
                borderWidth: 1,
                paddingStart: 12,
                fontSize: 14,
                fontWeight: "normal"
              }}
                focusable={true}
                placeholder='Barkod & Malzeme Adı Giriniz...'
                placeholderTextColor={colors.gray}
                value={barkod}
                onChangeText={setBarkod}
              />
              <ButtonPrimary text={"Malzeme Ara"} onPress={() => getMalzeme()} disabled={barkod != "" ? false : true} />
              <ButtonPrimary text={"Tamirci Seç"} />
            </View>
            :
            <View style={styles.content}>
              <Text>dataMalzeme</Text>
            </View>
      }
    </SafeAreaView>
  );
}