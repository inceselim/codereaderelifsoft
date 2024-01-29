import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, TextInput, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import Tts from 'react-native-tts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '../../api/api_url';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import { ViewTwoRowsCard } from '../../components/ViewTwoRowsCard/ViewTwoRowsCard';
import { ViewTwoRow } from '../../components/ViewTwoRow/ViewTwoRow';
import { ViewColCard } from '../../components/ViewColCard/ViewColCard';

export default function ArizaTalepScreen() {
    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();
    const userToken = useSelector((state: any) => state.auth?.userToken)
    const [pickerShowBegDate, setPickerShowBegDate] = useState(false);
    const [pickerShowEndDate, setPickerShowEndDate] = useState(false);
    const [begDate, setBegDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    const showDatePickerBegDate = () => {
        setPickerShowBegDate(true);
    };
    const showDatePickerEndDate = () => {
        setPickerShowEndDate(true);
    };

    const hideDatePickerBegDate = () => {
        setPickerShowBegDate(false);
    };
    const hideDatePickerEndDate = () => {
        setPickerShowEndDate(false);
    };

    const handleBegDate = (date: any) => {
        setBegDate(date)
        hideDatePickerBegDate();
    };
    const handleEndDate = (date: any) => {
        setEndDate(date)
        hideDatePickerEndDate();
    };
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
                <ViewTwoRowsCard>
                    <ButtonPrimary text="Başlangıç Tarihi" onPress={showDatePickerBegDate} />
                    <DateTimePickerModal
                        isVisible={pickerShowBegDate}
                        mode="date"
                        onConfirm={handleBegDate}
                        onCancel={hideDatePickerBegDate}
                    />
                    <ButtonPrimary text="Bitiş Tarihi" onPress={showDatePickerEndDate} />
                    <DateTimePickerModal
                        isVisible={pickerShowEndDate}
                        mode="date"
                        onConfirm={handleEndDate}
                        onCancel={hideDatePickerEndDate}
                    />
                </ViewTwoRowsCard>
                {
                    begDate || endDate ?
                        <ViewColCard>
                            <ViewTwoRow>
                                <Text>Başlangıç: Tarihi:</Text>
                                <Text>{begDate?.toLocaleDateString("tr-TR")}</Text>
                            </ViewTwoRow>
                            <ViewTwoRow>
                                <Text>Bitiş: Tarihi:</Text>
                                <Text>{endDate?.toLocaleDateString("tr-TR")}</Text>
                            </ViewTwoRow>
                        </ViewColCard>
                        : null
                }
            </View>
        </SafeAreaView >
    );
}
