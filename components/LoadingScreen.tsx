import apptheme from "../themes/apptheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, StyleSheet } from "react-native";
import { MotiView } from 'moti';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoadingScreen() {
    return (
        <LinearGradient 
            style={styles.container}
            colors={["#98D798", "#507150"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <MotiView
                from={{ opacity: 0, translateY: -20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 500, loop: true }}
                // style={styles.icon}
            >
                <MaterialCommunityIcons name="spider-thread" size={35} color="black" />
            </MotiView>
            <Text style={styles.text}>Cargando...</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: apptheme.white,
        borderWidth: 2,
        borderColor: apptheme.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        color: apptheme.white,
        letterSpacing: 2,
    }
});
