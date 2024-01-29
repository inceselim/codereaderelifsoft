import React from "react";
import { View } from "react-native";
import { colors } from "../../styles/colors";

export const ViewTwoRowsCard = ({ children }: any) => {
    return (
        <View style={{
            backgroundColor: colors.gray,
            flexDirection: "row",
            justifyContent: "space-between",
            borderRadius: 8,
            marginVertical: 12,
            paddingHorizontal: 12,
        }}>
            {children}
        </View>
    )
}