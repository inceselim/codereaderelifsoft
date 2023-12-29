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
    if (time < 1 * 24 * 60 * 60 * 1000) {
        await axios({
            url: API_URL.BASE_URL + API_URL.REFRESH_TOKEN_URL + '?token=' + userToken,
            method: 'post',
            maxBodyLength: Infinity,
        })
            .then((response: any) => {
                // HandleNotification({
                //   data: { title: 'ElifSoft', message: 'Yeni Token Alındı' },
                // });
                AsyncStorage.setItem('@token', response.data.token);
                AsyncStorage.setItem('@tokenExpires', response.data.expires);
                AsyncStorage.setItem('@tokenUserName', response.data.displayName);
                dispatch(rememberUser(response.data));
            })
            .catch(async (err: any) => {
                await AsyncStorage.removeItem('@token');
                await AsyncStorage.removeItem('@tokenExpires');
                await AsyncStorage.removeItem('@tokenUserName');
                console.log('REFRESH TOKEN Hata', err.message);
                dispatch(logoutUser());
            });

    }
};

export default RefreshToken;
