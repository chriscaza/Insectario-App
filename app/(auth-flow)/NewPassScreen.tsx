import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    InteractionManager
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import User from '../../scripts/models/user/User';
import CustomAlert from "../../components/Alerts/CustomAlert";
import Loading from "../../components/LoadingScreen";

export default function NewPass() {

    const { account } = useLocalSearchParams()
    const [showPassword, setShowPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handlePassword = async () => {
        setIsLoading(true)
        const result = await User.changePassword(account, password, newPassword)
        setIsLoading(false)
        if (!result.success) {
            setAlertMessage(result.message)
            setIsSuccess(false)
            setShowAlert(true)
        } else {
            setAlertMessage(result.message)
            setIsSuccess(true)
            setShowAlert(true)
        }
    }

    const handleAlertClose = () => {
        setShowAlert(false)
        if (isSuccess) {
            InteractionManager.runAfterInteractions(() => {
                router.dismiss(2)
            })
        }
    }

    return (
        isLoading ? (
            <Loading />
        ) : (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <LinearGradient
                    colors={["#98D798", "#507150"]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.container}
                >
                    <Text style={styles.title}>
                        Ingresa una nueva contraseña
                    </Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="**************"
                            placeholderTextColor="rgba(255, 255, 255, 1)"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeButton}
                        >
                            <Ionicons
                                name={showPassword ? "eye-off-outline" : "eye-outline"}
                                size={24}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirmmar contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="**************"
                            placeholderTextColor="rgba(255, 255, 255, 1)"
                            secureTextEntry={!showPassword}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeButton}
                        >
                            <Ionicons
                                name={showPassword ? "eye-off-outline" : "eye-outline"}
                                size={24}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>
                    {showAlert && (
                        <CustomAlert visible={showAlert} message={alertMessage} onClose={handleAlertClose} />
                    )}
                    <TouchableOpacity style={styles.continueButton} onPress={handlePassword}>
                        <Text style={styles.continueButtonText}>Continuar</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </TouchableWithoutFeedback>
        )
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        ...StyleSheet.absoluteFillObject,
        paddingHorizontal: 46,
    },
    title: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'medium',
        textAlign: 'center',
        marginBottom: 36
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
    eyeButton: {
        position: "absolute",
        right: 15,
        top: 15,
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
})