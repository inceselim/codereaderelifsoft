import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import LoadingCard from '../../components/LoadingCard/LoadingCard';
import { styles } from '../../styles/styles';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import { API_URL } from '../../api/api_url';
import { handleUserLogin } from '../../api/apiRequest';
import { colors } from '../../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from 'react-query';
import { loginAppCompanies, loginUser } from '../../redux/features/authSlice/authSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';



export default function LoginScreen() {
  const dispatch: any = useDispatch();
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


  //
  // Show-Hide Password
  //
  const handleUserLogin = async ({ userName, userPass, deviceId = "", platformName = "" }: any) => {
    if (userName !== '' && userPass !== '') {
      setLoading(true)
      try {
        const formData = new FormData();
        formData.append('username', userName);
        formData.append('password', userPass);
        await axios
          .post(
            API_URL.DEV_URL + API_URL.LOGIN_URL,
            // formData,
            {
              username: userName,
              password: userPass,
              deviceId: "deviceId",
              mobileType: "platformName",
            },
            {
              headers: {
                Accept: 'application/json',
                'content-type': 'application/json',
              },
            }).then(async (result: any) => {
              console.log("RESULT: ", result.data)
              setData(result)
              if (remember === true) {
                await AsyncStorage.setItem('@token', result.data.token).catch((e) => console.log("token", e))
                await AsyncStorage.setItem('@tokenExpires', result.data.expires);
                await AsyncStorage.setItem(
                  '@tokenUserName',
                  result.data.displayName,
                );
                await AsyncStorage.setItem('@companies', JSON.stringify(result.data.companies));
                // await AsyncStorage.setItem('@mobileMenu', JSON.stringify(result.data.mobileMenu));
                // await AsyncStorage.setItem('@appMenuYeni', JSON.stringify(result.data.appMenuYeni));
              }
              await AsyncStorage.setItem('@userName', userName);
              dispatch(loginUser(result?.data));
              dispatch(loginAppCompanies(result?.data?.companies))
              console.log(result.data)
            })
          .finally(() => setLoading(false))

        // const result = await response.json()

      }
      catch (e: any) {
        console.log(e)
        Alert.alert("Hata", e.message)
      }
    }
    else {
      Alert.alert('Uyarı', 'Tüm alanları doldurunuz...');
    }
  }
  //-----------------------------------------------------


  //
  // Daha önceden giriş yapmış kullanıcı adının getirilmesi
  //
  async function getOldUser() {
    let oldUser: any = await AsyncStorage.getItem('@userName');
    console.log("oldUser", oldUser)
    console.log(oldUser);
    if (oldUser !== '') {
      setUserName(oldUser);
    }
  }
  useEffect(() => {
    getOldUser()
  }, [])
  // //-----------------------------------------------------
  if (loading) {
    return (
      <LoadingCard />
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle={"dark-content"} />
      {
        loading ?
          <LoadingCard />
          :
          <View style={[styles.content, { justifyContent: "center" }]}>
            <View style={{
              paddingHorizontal: 12,
              paddingVertical: 12,
              borderRadius: 8,
              justifyContent: "center",
              shadowColor: "#000",
              backgroundColor: "#eee",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.36,
              shadowRadius: 6.68,

              elevation: 11,
            }}>
              <Text style={{
                color: "#333",
                fontSize: 25,
                fontWeight: "800",
                marginVertical: 12
              }}>Giriş Yap</Text>
              <Text style={{
                color: "#333",
                fontSize: 17,
                fontWeight: "600",
                marginVertical: 8
              }}>Uygulamaya Hoşgeldiniz...</Text>

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
              <TouchableOpacity onPress={() => setRemember(!remember)} style={{ flexDirection: "row", alignItems: "center" }}>
                {remember ? <Text style={{
                  color: colors.primaryColor,
                  width: 10,
                  fontWeight: "900",
                  fontSize: 16,
                }}>X</Text> : <Text style={{
                  color: colors.primaryColor,
                  fontWeight: "900",
                  width: 10,
                  fontSize: 16,
                }}> </Text>}
                <Text style={{
                  color: colors.primaryColor,
                  fontWeight: "500",
                  paddingStart: 8
                }}>Beni Hatırla</Text>
              </TouchableOpacity>

              <ButtonPrimary onPress={() => handleUserLogin({ userName, userPass, })}
                text={"Giriş Yap"} />
            </View>
          </View>
      }
    </SafeAreaView>
  );
}
