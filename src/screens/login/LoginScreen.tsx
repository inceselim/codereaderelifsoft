import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Pressable,
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
import { Eye, EyeSlash } from 'iconsax-react-native';
import MainInput from '../../components/MainInput/MainInput';
import fetch from 'isomorphic-fetch';



export default function LoginScreen() {
  const dispatch: any = useDispatch();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('abdurrahman.demir');
  const [userPass, setUserPass] = useState('Abdurrahman2023**');
  const [deviceId, setDeviceId] = useState('');

  const [remember, setRemember] = useState(true);

  //
  // Show-Hide Password
  //
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  //-----------------------------------------------------


  //
  // Show-Hide Password
  //
  const handleUserLogin = async ({ userName, userPass, deviceId = "", platformName = "" }: any) => {
    if (userName !== '' && userPass !== '') {
      setLoading(true)
      const formData = new FormData();
      formData.append('username', userName);
      formData.append('password', userPass);
      await fetch("https://jsonplaceholder.typicode.com/todos/1")

      await axios
        .post(
          API_URL.BASE_URL + API_URL.LOGIN_URL,
          formData,
          {
            headers: {
              "Accept": 'application/json',
              'Content-Type': "multipart/form-data",
            },
          })
        .then(async (result: any) => {
          setData(result)
          if (remember === true) {
            await AsyncStorage.setItem('@token', result.data.token).catch((e) => console.log("token", e))
            await AsyncStorage.setItem('@tokenExpires', result.data.expires);
            await AsyncStorage.setItem(
              '@tokenUserName',
              result.data.displayName,
            );
            await AsyncStorage.setItem('@companies', JSON.stringify(result.data.companies));
            await AsyncStorage.setItem('@mobileMenu', JSON.stringify(result.data.mobileMenu));
            await AsyncStorage.setItem('@appMenuYeni', JSON.stringify(result.data.appMenuYeni));
          }
          await AsyncStorage.setItem('@userName', userName);
          dispatch(loginUser(result?.data));
          dispatch(loginAppCompanies(result?.data?.companies))
          console.log(result.data.companies)
        })
        .catch((err: any) => {
          console.log("HATA ERROR", err)
        })
        .finally(() => setLoading(false))
    }
    else {
      Alert.alert('Uyarı', 'Tüm alanları doldurunuz...');
    }
  }


  
  // Daha önceden giriş yapmış kullanıcı adının getirilmesi

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
                autoCapitalize='none'
                onChangeText={setUserName}
                placeholderTextColor={"#666"} />
              <MainInput value={userPass} setValue={setUserPass} placeholder={"Parola Giriniz"}
                secureTextEntry={passwordVisibility}>
                {
                  passwordVisibility == true ?
                    <Pressable onPress={() => setPasswordVisibility(false)}>
                      < Eye size={26} color={colors.primaryColor} />
                    </Pressable>
                    :
                    <Pressable onPress={() => setPasswordVisibility(true)}>
                      <EyeSlash size={26} color={colors.primaryColor} variant="Bold" />
                    </Pressable>
                }
              </MainInput>
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
