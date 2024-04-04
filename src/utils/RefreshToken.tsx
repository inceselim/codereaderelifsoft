import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginAppCompanies, loginAppMenuYeni, loginUser, logoutUser, rememberUser } from '../redux/features/authSlice/authSlice';
import axios from 'axios';
import { API_URL } from '../api/api_url';

async function RefreshToken() {
    const dispatch = useDispatch();
    let userToken;
    let userTokenExpires: any;

    userToken = await AsyncStorage.getItem('@token');
    userTokenExpires = await AsyncStorage.getItem('@tokenExpires');
    let tokenExpires: any;
    tokenExpires = Date.parse(userTokenExpires);
    let today: number = new Date().getTime();

    let time = tokenExpires - today;

    //
    // REFRESH TOKEN ALMA SURESI
    //
    if (time < 3 * 24 * 60 * 60 * 1000) {
        console.log("")
        console.log("REFRESH TOKEN ALMA SURESI")
        console.log("ss")
        // await axios({
        //     url: API_URL.BASE_URL + API_URL.REFRESH_TOKEN_URL + '?token=' + userToken,
        //     method: 'post',
        //     maxBodyLength: Infinity,
        // })
        fetch(API_URL.BASE_URL + API_URL.LOGIN_URL + '?token=' + userToken,
            {
                method: "POST",
            })
            .then(response => response.json())
            .then(async (json: any) => {
                // HandleNotification({
                //   data: { title: 'ElifSoft', message: 'Yeni Token Alındı' },
                // });
                AsyncStorage.setItem('@token', json?.token);
                AsyncStorage.setItem('@tokenExpires', json?.expires);
                // AsyncStorage.setItem('@companies', response.data.companies);
                // AsyncStorage.setItem('@tokenUserName', response.data.displayName);
                dispatch(rememberUser(json));
            })
            .catch(async (err: any) => {
                await AsyncStorage.removeItem('@token');
                await AsyncStorage.removeItem('@tokenExpires');
                await AsyncStorage.removeItem('@tokenUserName');
                await AsyncStorage.removeItem('@companies');
                console.log('REFRESH TOKEN Hata', err.message);
                dispatch(logoutUser());
            });

    }
};

export default RefreshToken;
