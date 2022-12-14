import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("screen");

export const drawerStyle = StyleSheet.create({
    drawer: {
        flex: 1,
        alignItems: "flex-end",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        zIndex: 9999,
        backgroundColor: "red"
    },
    clickOutSideHiden: {
        backgroundColor: "transparent",
        width: "100%",
        height: "100%"
    },
    contentDrawer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        alignItems: "flex-end",
        backgroundColor: 'transparent',
        zIndex: 9999999,
    },
    overlay: {
        position: "absolute",
        // zIndex: 999,
        backgroundColor: "transparent",
        width,
        height
    }
});