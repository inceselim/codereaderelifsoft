import { StyleSheet, Dimensions } from "react-native";

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;
let screenWidth = Dimensions.get('screen').width;
let screenHeight = Dimensions.get('screen').height;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000"
    },
    header: {
        flex: 0.4,
    },
    splashImage: {
        width: windowWidth - 10,
        height: "90%",
        alignSelf: "center",
        resizeMode: "contain"
    },
})

export default style;