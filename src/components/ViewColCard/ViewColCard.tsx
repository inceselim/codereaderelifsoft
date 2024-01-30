import React from "react";
import { View } from "react-native";
import { colors } from "../../styles/colors";

export const ViewColCard = ({ children }: any) => {
    return (
        <View style={{
            backgroundColor: colors.light,
            borderRadius: 8,
            marginVertical: 12,
            paddingHorizontal: 12,
        }}>
            {children}
        </View>
    )
}