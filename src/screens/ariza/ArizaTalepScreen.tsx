import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, TextInput, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import Tts from 'react-native-tts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '../../api/api_url';

export default function ArizaTalepScreen() {
    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();
    const userToken = useSelector((state: any) => state.auth?.userToken)
    console.log(userToken)
    const getArizaTalepList = async () => {
        await axios.get(API_URL.DEV_URL + API_URL.ARIZA_LIST + "?begDate=2023-12-01T00:00:00&endDate=2024-01-25T17:04:45&DurumLogo=0&IsDeleted=false", {
            headers: {
                Authorization: "Bearer " + userToken
            }
        })
            .then((response: any) => {
                console.log("response", response?.data)
            })
            .catch((error: any) => console.log("ERROR", error))
    }
    useEffect(() => {
        getArizaTalepList()
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text></Text>
            </View>
        </SafeAreaView>
    );
}
