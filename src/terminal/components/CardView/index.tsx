import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../styles/colors';

export default function CardView({ children }: any) {
    return (
        <View style={{
            marginVertical: 8,
            backgroundColor: colors.light,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 8,
        }}>
            {children}
        </View>
    );
}
