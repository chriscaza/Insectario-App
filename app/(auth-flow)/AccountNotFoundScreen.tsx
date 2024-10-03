import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function AccountNotFoundScreen() {

    return (
        <LinearGradient
            colors={["#98D798", "#507150"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <Ionicons
                name={"sad-outline"}
                size={30}
                color="#314F33"
                style={styles.emoji}
            />      

            <Text style={styles.title}>Tu correo o nombre de usuario no se encuentra registrado</Text>

            <TouchableOpacity style={styles.continueButton} onPress={() => {router.replace('/SignUpScreen')}}>
                <Text style={styles.continueButtonText}>Crear cuenta</Text>
            </TouchableOpacity>

        </LinearGradient>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        ...StyleSheet.absoluteFillObject,
        paddingHorizontal: 46,
    },
    continueButton: {
        width: "100%",
        padding: 10,
        backgroundColor: "#7C967D",
        borderRadius: 100,
        borderColor: "rgba(255, 255, 255, 0.4)",
        borderWidth: 1,
        alignItems: "center",
    },
    continueButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "500",
    },
    emoji: {
        textAlign: 'center',
        marginBottom: 24
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'medium',
        textAlign: 'center',
        marginBottom: 24,
        width: "75%"
    }
})