import React from 'react';
import { View, Text } from 'react-native';

export const ViewTwoRow = ({ children }: any) => {
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8,
        }}>
            {children}
        </View>
    );
}
