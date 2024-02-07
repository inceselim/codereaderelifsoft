import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../api/api_url';
import LoadingCard from '../../components/LoadingCard/LoadingCard';
import CardView from '../../components/CardView';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import { colors } from '../../styles/colors';

export default function BarkodCreateScreen({ props, route }: any) {
    const navigation: any = useNavigation();
    const dispatch: any = useDispatch();
    const company = route?.params?.company.Id
    console.log("COMPANY", company)
    const userToken = useSelector((state: any) => state.auth?.userToken)

    const [loadingAmbarList, setLoadingAmbarList] = useState(false);
    const [isEnabledAmbarList, setIsEnabledAmbarList] = useState(false);
    const [dataAmbarList, setDataAmbarList] = useState<any[]>([])
    const [selectedAmbar, setSelectedAmbar] = useState<any>()
    const [descriptionText, setDescriptionText] = useState("")

    const getAmbarList = async () => {
        setLoadingAmbarList(true);
        await axios.get(API_URL.DEV_URL + API_URL.AMBAR_LIST + "?companyId=" + company, {
            headers: {
                "Authorization": "Bearer " + userToken
            }
        })
            .then((response: any) => {
                console.log("AMBAR LIST RESPONSE: ", response.data)
                setDataAmbarList(response.data)
            })
            .catch((error: any) => {
                console.log("AMBAR LIST ERROR: ", error)
                console.log("AMBAR LIST ERROR: ", error.response)

            })
            .finally(() => setLoadingAmbarList(false))
    }

    useEffect(() => {
        getAmbarList()
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            {
                loadingAmbarList ?
                    <LoadingCard />
                    :
                    <View style={styles.content}>
                        <CardView>
                            <ButtonPrimary text={"Çıkış Ambarı Seç"}
                                onPress={() => {
                                    setIsEnabledAmbarList(!isEnabledAmbarList)
                                    console.log(isEnabledAmbarList)
                                }}
                            />
                            {
                                selectedAmbar == null ?
                                    null :
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={styles.textBold}>Seçilen Ambar</Text>
                                        <Text style={styles.textNormal}>{selectedAmbar?.Name}</Text>
                                    </View>
                            }
                            {
                                isEnabledAmbarList == true ?
                                    <FlatList data={dataAmbarList}
                                        renderItem={({ item }: any) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setSelectedAmbar(item)
                                                        setIsEnabledAmbarList(false)
                                                    }}>
                                                    <Text style={styles.textNormal}>{item?.Name}</Text>
                                                </TouchableOpacity>
                                            )
                                        }}
                                    />
                                    : null
                            }
                        </CardView>

                        <TextInput style={styles.textInput}
                            value={descriptionText}
                            onChangeText={setDescriptionText}
                            placeholder='Açıklama'
                            placeholderTextColor={colors.gray}
                        />
                    </View>
            }
        </SafeAreaView>
    );
}
