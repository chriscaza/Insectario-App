import React from "react"
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import CloseButton from "@/components/icons/CloseButton";
import { router } from "expo-router";

export default function ForgotPass() {

    return (
        <LinearGradient
            colors={["#98D798", "#507150"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <TouchableOpacity style={styles.floatingButton}><CloseButton icon="close" onPress={()=> router.back()}/></TouchableOpacity>

            <Text style={styles.title}>Vamos a buscar tu cuenta de Insectario</Text>

            <Text style={styles.text}>¿Cuál es tu correo o nombre de usuario?</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Correo o nombre de usuario</Text>
                <TextInput
                    style={styles.input}
                    placeholder="chris.caza25"
                    placeholderTextColor="rgba(255, 255, 255, 1)"
                />
            </View>

            <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continuar</Text>
            </TouchableOpacity>
        </LinearGradient>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        ...StyleSheet.absoluteFillObject,
        paddingHorizontal: 46,
    },
    inputContainer: {
        width: "100%",
        backgroundColor: "#314F33",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 15,
        marginBottom: 24,  
    },
    label: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 3,
    }, 
    input: {
        fontSize: 16,
        color: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: "medium",
        textAlign: "center",
        paddingBottom: 19,
        color: "#fff"
    }, 
    text: {
        fontSize: 16,
        fontWeight: "regular",
        textAlign: "center",
        color: "#fff",
        marginBottom: 36,
    },
    continueButton: {
        width: "100%",
        padding: 10,
        backgroundColor: "#7C967D",
        borderRadius: 100,
        borderColor: "rgba(255, 255, 255, 0.4)",
        borderWidth: 1,
        alignItems: "center",
        marginBottom: 14,
    },
    continueButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "500",
    },
    floatingButton: {
        position: 'absolute',
        top: 65, // Ajusta según sea necesario
        left: 46, // Ajusta según sea necesario
        borderRadius: 50,
        padding: 6,
        zIndex: 1,
    },
})