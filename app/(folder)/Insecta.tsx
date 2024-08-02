import apptheme from "@/themes/apptheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Insecta() {
    return (
        <LinearGradient 
            colors={["#98D798", "#507150"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >

    </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})