import React from 'react';
import { View, Text, SafeAreaView, Image, StatusBar } from 'react-native';
import { styles } from '../../styles/styles';
import GetUserData from '../../utils/GetUserData';
import RefreshToken from '../../utils/RefreshToken';
import style from './style';
import { colors } from '../../styles/colors';

export default function SplashScreen() {
    RefreshToken()
    GetUserData()
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: "#002" }]}>
            <StatusBar backgroundColor={"#002"} barStyle={"light-content"} />
            <View style={[styles.content, { backgroundColor: "#002" }]}>
                <Image
                    style={style.splashImage}
                    source={require('../../assets/images/MaviAktasLogo1.png')}
                />
                <Text style={{
                    fontSize: 19,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#ddd"
                }}>AKTAŞ BİLGİ TEKNOLOJİLERİ</Text>
            </View>
        </SafeAreaView>
    );
}
