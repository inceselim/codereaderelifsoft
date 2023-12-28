import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  TextInput,
} from 'react-native';

import LoadingCard from '../../components/LoadingCard/LoadingCard';
import { styles } from '../../styles/styles';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import { DEV_URL, LOGIN_URL } from '../../api/api_url';

export default function LoginScreen() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [deviceId, setDeviceId] = useState('');

  const [remember, setRemember] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye-off');

  //
  // Show-Hide Password
  //
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };
  //-----------------------------------------------------

  // //
  // // Daha önceden giriş yapmış kullanıcı adının getirilmesi
  // //
  // async function getOldUser() {
  //   let oldUser: any = await AsyncStorage.getItem('@userName');
  //   console.log(oldUser);
  //   if (oldUser !== '') {
  //     setUserName(oldUser);
  //   }
  // }
  // //-----------------------------------------------------

  //
  // Login Fonksiyonu
  //
  const handleLogin = async ({ userName, userPass, deviceId = "", platformName = "" }: any) => {
    if (userName !== '' && userPass !== '') {
      try {
        const params = {
          userName: userName,
          userPass: userPass
        };

        // Parametreleri URL'e ekleyin
        const urlWithParams = `${DEV_URL + LOGIN_URL}?${new URLSearchParams(params).toString()}`;

        const response = await fetch(urlWithParams);

        // Veriyi JSON formatına çevirme
        const result = await response.json();

        // State'i güncelleme
        setData(result);
      }
      catch (e: any) {
        console.log(e)
        Alert.alert("Hata", e)
      }
    }
    else {
      Alert.alert('Uyarı', 'Tüm alanları doldurunuz...');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {
        loading ?
          <LoadingCard />
          :
          <View style={styles.content}>
            <Text style={{
              color: "#333",
              fontSize: 15,
              marginVertical: 12
            }}>Giriş Yap</Text>

            <TextInput style={styles.textInput}
              placeholder='Kullanıcı Adı Giriniz'
              value={userName}
              onChangeText={setUserName}
              placeholderTextColor={"#666"} />

            <TextInput style={styles.textInput}
              placeholder='Parola Giriniz'
              value={userPass}
              onChangeText={setUserPass}
              placeholderTextColor={"#666"} />

            <ButtonPrimary onPress={() => handleLogin({ userName: "", password: "" })}
              text={"Giriş Yap"} />
          </View>
      }
    </SafeAreaView>
  );
}
