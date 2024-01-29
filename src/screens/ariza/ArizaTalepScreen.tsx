import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert, TextInput, ScrollView, TouchableOpacity, Platform, Image, FlatList } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';
import Tts from 'react-native-tts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '../../api/api_url';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import { ViewColCard } from '../../components/ViewColCard/ViewColCard';
import LoadingCard from '../../components/LoadingCard/LoadingCard';
import { NoData } from '../../components/NoData/NoData';
import CardView from '../../components/CardView';

export default function ArizaTalepScreen() {
    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();
    const userToken = useSelector((state: any) => state.auth?.userToken)
    const [loading, setLoading] = useState(false);
    const [filterMenu, setFilterMenu] = useState(true);
    const [data, setData] = useState([]);
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
    const getArizaTalepList = async ({ begin, end }: any) => {
        setLoading(true);
        await axios.get(API_URL.DEV_URL + API_URL.ARIZA_LIST +
            "?begDate=" + begDate?.toISOString() + "&endDate=" + endDate?.toISOString() +
            "&DurumLogo=" + "0" + "&IsDeleted=false", {
            headers: {
                Authorization: "Bearer " + userToken
            }
        })
            .then((response: any) => {
                console.log("response", response?.data)
                setData(response?.data);
            })
            .catch((error: any) => console.log("ERROR", error))
            .finally(() => {
                setLoading(false)
                setFilterMenu(false);
            })
    }
    return (
        <SafeAreaView style={styles.container}>
            {
                loading ?
                    <LoadingCard />
                    :
                    filterMenu ?
                        <View style={styles.content}>
                            <ViewColCard>
                                <ButtonPrimary text={`Başlangıç Tarihi ${"\t"} ${begDate != undefined ? begDate?.toLocaleDateString("tr-TR") : ""}`} onPress={showDatePickerBegDate} />
                                <DateTimePickerModal
                                    isVisible={pickerShowBegDate}
                                    mode="date"
                                    onConfirm={handleBegDate}
                                    onCancel={hideDatePickerBegDate}
                                />
                                <ButtonPrimary text={`Bitiş Tarihi${"\t"} ${endDate != undefined ? endDate?.toLocaleDateString("tr-TR") : ""}`} onPress={showDatePickerEndDate} />
                                <DateTimePickerModal
                                    isVisible={pickerShowEndDate}
                                    mode="date"
                                    onConfirm={handleEndDate}
                                    onCancel={hideDatePickerEndDate}
                                />
                                <ButtonPrimary text={"Listele"} disabled={begDate == undefined || endDate == undefined ? true : false}
                                    onPress={() => getArizaTalepList({ begin: begDate, end: endDate })} />
                            </ViewColCard>
                        </View>
                        :
                        data?.length < 1 ?
                            <View style={styles.content}>
                                <ButtonPrimary text={"Filtreyi Aç"} onPress={() => setFilterMenu(true)} />
                                <NoData />
                            </View>
                            :
                            <View style={styles.content}>
                                <FlatList
                                    data={data}
                                    renderItem={({ item }: any) => {
                                        return (
                                            <CardView>
                                                <Text style={styles.textTitle}>Fiş Kodu: {item?.FisNo}</Text>
                                                <Text>Garaj Id: {item?.GarajId}</Text>
                                                <Text>Oluşturma Tarihi: {new Date(item?.OlusmaTarih).toLocaleDateString("tr-TR")}</Text>
                                            </CardView>
                                        )
                                    }}
                                />
                            </View>
            }
        </SafeAreaView >
    );
}
