import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Detect() {
    return (
        <LinearGradient
            colors={["#98D798", "#507150"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <SafeAreaView>

            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})