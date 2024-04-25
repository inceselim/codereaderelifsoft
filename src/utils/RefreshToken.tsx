import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser, rememberUserToken, rememberUserTokenExpires } from '../redux/features/authSlice/authSlice';
import axios from 'axios';
import { API_URL } from '../api/api_url';
import { useEffect, useState } from 'react';

async function RefreshToken() {
    const dispatch = useDispatch();
    const [userToken, setUserToken] = useState("");
    let userTokenExpires: any;

    await AsyncStorage.getItem('@token')
        .then((res: any) => {
            setUserToken(res)
        })
    userTokenExpires = await AsyncStorage.getItem('@tokenExpires');
    let tokenExpires: any;
    tokenExpires = Date.parse(userTokenExpires);
    let today: number = new Date().getTime();

    let time = tokenExpires - today;

    //
    // REFRESH TOKEN ALMA SURESI
    //
    const deneme = async () => {
        if (time < 3 * 24 * 60 * 60 * 1000) {
            // await fetch("https://jsonplaceholder.typicode.com/todos/1")
            console.log("")
            console.log("REFRESH TOKEN ALMA SURESI")
            console.log("ss", userToken)
            const formData = new FormData();
            formData.append('userToken', userToken);
            await axios.post(API_URL.DEV_URL + API_URL.REFRESH_TOKEN_URL +
                '?token=' + userToken,
                // formData,
                {
                    headers: {
                        'Content-Type': "multipart/form-data"
                    }
                })
                .then((response: any) => {
                    // HandleNotification({
                    //   data: { title: 'ElifSoft', message: 'Yeni Token Alındı' },
                    // });
                    AsyncStorage.setItem('@token', response?.data?.token);
                    AsyncStorage.setItem('@tokenExpires', response?.data?.expires);
                    // AsyncStorage.setItem('@companies', response.data.companies);
                    // AsyncStorage.setItem('@tokenUserName', response.data.displayName);
                    dispatch(rememberUserToken(response?.data?.token));
                    dispatch(rememberUserTokenExpires(response?.data?.expires));
                })
                .catch(async (err: any) => {
                    console.log('REFRESH TOKEN Hata', err.message);
                });
        }
    }
    deneme()
};

export default RefreshToken;
