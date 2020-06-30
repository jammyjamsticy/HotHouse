import { StyleSheet } from 'react-native';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
        paddingVertical: 50,
        position: "relative"
    },

    title: {
        fontSize: 20,
        color: "#000",
        textAlign: "center",
        marginBottom: 10
    },

    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },

    list: {
        paddingVertical: 5,
        margin: 3,
        flexDirection: "row",
        backgroundColor: "#dccbcb",
        justifyContent: "flex-start",
        alignItems: "center",
        zIndex: -1
    },
    lightText: {
        color: "#6d6d6d",
        width: 200,
        paddingLeft: 15,
        fontSize: 12
    },
    line: {
        height: 0.5,
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.5)"
    },
    icon: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        left: 290,
        zIndex: 1
    },
    numberBox: {
        position: "absolute",
        bottom: 75,
        width: 30,
        height: 30,
        borderRadius: 15,
        left: 330,
        zIndex: 3,
        backgroundColor: "#e3e3e3",
        justifyContent: "center",
        alignItems: "center"
    },
    number: { fontSize: 14, color: "#000" },
    selected: { backgroundColor: "#FA7B5F" },
});


export default styles;


