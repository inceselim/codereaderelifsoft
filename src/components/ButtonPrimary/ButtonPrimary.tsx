import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';

export default function ButtonPrimary({ onPress, text }: any) {
    return (
        <TouchableOpacity onPress={onPress}
            style={{
                backgroundColor: colors.orange,
                marginVertical: 12,
                borderRadius: 8
            }}>
            <Text style={{
                fontSize: 14,
                color: colors.white,
                fontWeight: "bold",
                textAlign: "center",
                paddingVertical: 10,
            }}>{text}</Text>
        </TouchableOpacity>
    );
}
