import React, { useState } from 'react';
import { View, Text, SafeAreaView, Alert, TextInput } from 'react-native';
import { fetchUserLogin } from '../../api/apiRequest';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';

export default function HomeScreen() {
    const [barcodeText, setBarcodeText] = useState("")
    fetchUserLogin()
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={{ alignContent: "center" }}>
                    <Text style={{
                        fontSize: 15,
                        color: colors.blue,
                        fontWeight: "bold"
                    }}>Anasayfa</Text>
                    
                    <TextInput
                        style={styles.textInput}
                        value={barcodeText}
                        onChangeText={setBarcodeText}
                        autoFocus
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
