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
            await AsyncStorage.getItem("@companies").then((res: any) => {
                console.log("res")
                console.log("res", res)
                console.log("res")
                console.log("res")
                console.log("res")
                console.log("res")
                JSON.parse(res)
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