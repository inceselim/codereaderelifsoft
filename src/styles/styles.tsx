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
        color: "#111",
        borderRadius: 8,
        paddingVertical: 8,
        paddingStart: 12,
        marginVertical: 8,
        fontSize: 13,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 1,
    },
    textInputPassword: {
        flex: 1,
        marginEnd: 8,
        backgroundColor: "#eee",
        color: "#111",
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
    },
    textTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primaryColor,
        paddingBottom: 12,
    },
    textLarge: {
        fontSize: 16,
        fontWeight: "normal",
        color: colors.black,
        paddingBottom: 2,
    },
    textNormal: {
        fontSize: 14,
        fontWeight: "normal",
        color: colors.black,
        paddingBottom: 2,
    },
    textSmall: {
        fontSize: 13,
        fontWeight: "normal",
        color: colors.black,
        paddingBottom: 2,
    },
    textBold: {
        fontWeight: "bold",
        color: colors.black,
        paddingEnd: 4,
    },
    viewTwoRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4
    },
    viewTwoRows: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingVertical: 4
    },
    viewTwoRowJustify: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        paddingVertical: 4
    },
})