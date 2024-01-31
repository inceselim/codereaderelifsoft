import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { isFetchingUser, loginAppCompanies, logoutUser, notFetchingUser, rememberUser } from '../redux/features/authSlice/authSlice';


function GetUserData() {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");

    const getUserData = async () => {
        dispatch(isFetchingUser())
        const token = await AsyncStorage.getItem("@token")
        const tokenExpires = await AsyncStorage.getItem("@tokenExpires")
        await AsyncStorage.getItem("@userName")
            .then((response: any) => {
                setUserName(response)
            })

        if (token || tokenExpires || userName) {
            dispatch(rememberUser({ token, tokenExpires, userName }))
            await AsyncStorage.getItem("@companies").then((res: any) => {
                dispatch(loginAppCompanies(JSON.parse(res)))
            })
        }
        else {
            dispatch(logoutUser())
        }
        setTimeout(() => {
            dispatch(notFetchingUser())
        }, 2.5 * 1000);
    }

    useEffect(() => {
        getUserData()
    }, [])
}

export default GetUserData;