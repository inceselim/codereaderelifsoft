import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import LoadingCard from '../../components/LoadingCard/LoadingCard';
import { styles } from '../../styles/styles';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import { API_URL } from '../../api/api_url';
import { handleUserLogin } from '../../api/apiRequest';
import { colors } from '../../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from 'react-query';
import { loginUser } from '../../redux/features/authSlice/authSlice';
import { useDispatch } from 'react-redux';



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
      try {
        const formData = new FormData();
        formData.append('username', userName);
        formData.append('password', userPass);

        console.log("username", userName)
        console.log("password", userPass)
        const response = await fetch('http://dev.elifsoft.io/api/AccountApi/Login', {
          method: 'POST',
          body: formData,
          headers: {
            // İsteğe bağlı olarak başlıklar ekleyebilirsiniz
            'Content-Type': 'multipart/form-data',
          },
        })

        const result = await response.json()
        // console.log("RESULT: ", result)
        setData(result)
        console.log()
        console.log()
        console.log("TOKEN: ",result?.token)
        console.log()
        console.log()
        console.log()
        if (remember === true) {
          await AsyncStorage.setItem('@token', result.token).catch((e) => console.log("token", e))
          await AsyncStorage.setItem('@tokenExpires', result.expires);
          await AsyncStorage.setItem(
            '@tokenUserName',
            result.displayName,
          );
          await AsyncStorage.setItem('@userName', userName);
          // await AsyncStorage.setItem('@mobileMenu', JSON.stringify(result.data.mobileMenu));
          // await AsyncStorage.setItem('@appMenuYeni', JSON.stringify(result.data.appMenuYeni));
          // await AsyncStorage.setItem('@companies', JSON.stringify(result.data.companies));
        }
        await AsyncStorage.setItem('@userName', userName);
        dispatch(loginUser(result));
      }
      catch (e: any) {
        console.log(e)
        Alert.alert("Hata",e.message)
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
            <TouchableOpacity onPress={() => setRemember(!remember)} style={{ flexDirection: "row", alignItems: "center" }}>
              {remember ? <Text style={{
                color: colors.blueDark,
                fontWeight: "900",
              }}>X</Text> : <Text style={{
                fontWeight: "900",
              }}>-</Text>}
              <Text style={{
                color: colors.blueDark,
                paddingStart: 8
              }}>Beni Hatırla</Text>
            </TouchableOpacity>

            <ButtonPrimary onPress={() => handleUserLogin({ userName, userPass, })}
              text={"Giriş Yap"} />
          </View>
      }
    </SafeAreaView>
  );
}
