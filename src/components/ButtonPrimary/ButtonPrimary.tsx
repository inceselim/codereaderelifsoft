import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';

export default function ButtonPrimary({ onPress, text, disabled = false }: any) {
    return (
        <TouchableOpacity onPress={onPress}
            disabled={disabled}
            style={{
                backgroundColor: colors.primaryColor,
                marginVertical: 8,
                borderRadius: 8,
                opacity: disabled ? 0.61 : 1
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
