import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../styles/styles';
import { colors } from '../../styles/colors';

export const NoData = () => {
    return (
        <View style={styles.content}>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Text style={{
                    textAlign: "center",
                    color: colors.primaryColor,
                    fontSize: 26,
                    fontWeight: "700"
                }}>Veri Bulunamadı!</Text>
            </View>
        </View>
    );
}
