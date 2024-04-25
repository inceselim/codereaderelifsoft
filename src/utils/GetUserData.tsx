import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { isFetchingUser, loginAppCompanies, logoutUser, notFetchingUser, rememberUserName, rememberUserToken, rememberUserTokenExpires } from '../redux/features/authSlice/authSlice';


function GetUserData() {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");

    const getUserData = async () => {
        dispatch(isFetchingUser())
        await AsyncStorage.getItem("@token")
            .then((response: any) => {
                dispatch(rememberUserToken(response))
            })
            .catch(() => dispatch(logoutUser()))

        await AsyncStorage.getItem("@tokenExpires")
            .then((response: any) => {
                dispatch(rememberUserTokenExpires(response))
            })
            .catch(() => dispatch(logoutUser()))

        await AsyncStorage.getItem("@userName")
            .then(async (response: any) => {
                console.log("")
                console.log("")
                console.log("")
                console.log("")
                console.log("")
                console.log("")
                console.log("")
                console.log("")
                console.log("")
                console.log("")
                console.log("KULLANICI ASYNC VERİ: ", response)
                setUserName(response)
                dispatch(rememberUserName({ userName: response }))
            })
            .catch(() => dispatch(logoutUser()))

        await AsyncStorage.getItem("@companies")
            .then((res: any) => {
                console.log("companies")
                console.log("companies")
                console.log("companies", res)
                console.log("companies")
                console.log("companies")
                dispatch(loginAppCompanies(JSON.parse(res)))
            })
            .catch(() => dispatch(logoutUser()))

        setTimeout(() => {
            dispatch(notFetchingUser())
        }, 2.5 * 1000);
    }

    useEffect(() => {
        getUserData()
    }, [])
}

export default GetUserData;