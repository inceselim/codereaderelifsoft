import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: colors.white
    },
    textInput: {
        backgroundColor: "#eee",
        borderRadius: 8,
        paddingVertical: 12,
        paddingStart: 12,
        marginVertical: 14,
        fontSize: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    }
})