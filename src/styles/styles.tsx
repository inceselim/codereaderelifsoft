import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor:colors.white
    },
    textInput: {
        backgroundColor: "#eee",
        borderRadius: 8,
        paddingStart: 12,
        marginVertical: 14,
        fontSize: 12
    }
})