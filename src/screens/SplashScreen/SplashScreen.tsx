import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { styles } from '../../styles/styles';

export default function SplashScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text>Splash</Text>
            </View>
        </SafeAreaView>
    );
}
