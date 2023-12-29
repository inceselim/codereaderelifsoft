import React, { useState } from 'react';
import { View, Text, SafeAreaView, Alert, TextInput, ScrollView } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';

export default function HomeScreen() {
    const [barcodeText, setBarcodeText] = useState("")
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={{ alignContent: "center" }}>
                    <Text style={{
                        fontSize: 15,
                        color: colors.blue,
                        fontWeight: "bold",
                        textAlign: "center",
                        paddingVertical: 10,
                    }}>Barkod Okut</Text>

                    <TextInput
                        style={styles.textInput}
                        value={barcodeText}
                        onChangeText={setBarcodeText}
                        autoFocus
                    />
                    <ScrollView>
                        <View>

                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}
