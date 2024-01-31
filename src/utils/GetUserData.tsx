import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { isFetchingUser, loginAppCompanies, logoutUser, notFetchingUser, rememberUser } from '../redux/features/authSlice/authSlice';


function GetUserData() {
    const dispatch = useDispatch();

    const getUserData = async () => {
        dispatch(isFetchingUser())
        const token = await AsyncStorage.getItem("@token")
        const tokenExpires = await AsyncStorage.getItem("@tokenExpires")
        const tokenUserName = await AsyncStorage.getItem("@tokenUserName")

        if (token || tokenExpires || tokenUserName) {
            dispatch(rememberUser({ token, tokenExpires, tokenUserName }))
            const companies = await AsyncStorage.getItem("@companies").then((res: any) => JSON.parse(res))
                .then(res => { return res })
            dispatch(loginAppCompanies(companies))
        }
        else {
            dispatch(logoutUser())
        }
        setTimeout(() => {
            dispatch(notFetchingUser())
        }, 3.5 * 1000);
    }

    useEffect(() => {
        getUserData()
    }, [])
}

export default GetUserData;