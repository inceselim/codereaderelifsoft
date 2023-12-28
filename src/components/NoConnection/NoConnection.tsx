import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { style } from './style';

export default function NoConnection() {
    return (
        <SafeAreaView style={style.container}>
            <Text style={style.headerText}>
                İnternet Bağlantısı Bulunamadı!..
            </Text>
        </SafeAreaView>
    );
}
