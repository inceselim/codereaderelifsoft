import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';

export default function ButtonPrimary({ onPress, text }: any) {
    return (
        <TouchableOpacity onPress={onPress}
            style={{
                backgroundColor: colors.primaryColor,
                marginVertical: 8,
                borderRadius: 8
            }}>
            <Text style={{
                fontSize: 13,
                color: colors.white,
                fontWeight: "bold",
                textAlign: "center",
                paddingVertical: 10,
                paddingHorizontal: 12,
            }}>{text}</Text>
        </TouchableOpacity>
    );
}
