import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Modal,
    useColorScheme
} from "react-native";
import CustomAlert from "../../components/Alerts/CustomAlert";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import User from '@/scripts/models/user/User';
import Loading from "@/components/LoadingScreen";
import DateTimePicker from '@react-native-community/datetimepicker';  // Importamos el DateTimePicker

export default function SignUpScreen() {
    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [showDatePicker, setShowDatePicker] = useState(false);  // Para controlar el DateTimePicker
    const [selectedDate, setSelectedDate] = useState(new Date());

    const colorScheme = useColorScheme();

    const handleRegister = async () => {
        setIsLoading(true);
        const result = await User.register(username, mail, password, birthDate);
        setIsLoading(false);
        if (!result.success) {
            setAlertMessage(result.message);
            setIsSuccess(false);
            setShowAlert(true);
        } else {
            setAlertMessage(result.message);
            setIsSuccess(true);
            setShowAlert(true);
        }

    };

    const handleAlertClose = () => {
        setShowAlert(false);
        if (isSuccess) {
            router.back();
        }
    };

    const clearFields = () => {
        setUsername('');
        setPassword('');
        setMail('');
        setBirthDate('');
    };

    const handleConfirmDate = (event: any, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setSelectedDate(selectedDate);
            setBirthDate(selectedDate.toLocaleDateString('es-ES'));
        }
    };

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
                        Bienvenidx a <Text style={styles.bold}>Insectario</Text>
                    </Text>

                    <Text style={styles.text}>Crear cuenta</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Usuario</Text>
                        <TextInput
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                            placeholder="Nombre de usuario"
                            placeholderTextColor="rgba(255, 255, 255, 0.9)"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Correo</Text>
                        <TextInput
                            style={styles.input}
                            value={mail}
                            onChangeText={setMail}
                            placeholder="Correo"
                            placeholderTextColor="rgba(255, 255, 255, 0.9)"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Crea una contraseña"
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor="rgba(255, 255, 255, 0.9)"
                            secureTextEntry={!showPassword}
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
                        <Text style={styles.label}>Fecha de nacimiento</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="dd/mm/aaaa"
                            value={birthDate}
                            placeholderTextColor="rgba(255, 255, 255, 0.9)"
                            editable={false}
                        />
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(!showDatePicker)}
                            style={styles.eyeButton}
                        >
                            <Ionicons
                                name="calendar"
                                size={24}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Modal que contendrá el DateTimePicker */}
                    {showDatePicker && (
                        <Modal
                            transparent={true}
                            animationType="fade"
                            visible={showDatePicker}
                            onRequestClose={() => setShowDatePicker(false)}
                        >
                            <View style={styles.modalOverlay}>
                                <View style={[
                                    styles.datePickerContainer, 
                                    { backgroundColor: colorScheme === 'dark' ? '#333' : 'white' }
                                ]}>
                                    <DateTimePicker
                                        value={selectedDate}
                                        mode="date"
                                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                                        onChange={handleConfirmDate}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowDatePicker(false)}
                                        style={styles.closeButton}
                                    >
                                        <Text style={styles.closeButtonText}>Listo</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    )}

                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={handleRegister}
                    >
                        <Text style={styles.continueButtonText}>Continuar</Text>
                    </TouchableOpacity>

                    {showAlert && (
                        <CustomAlert visible={showAlert} message={alertMessage} onClose={handleAlertClose} />
                    )}

                    <View style={styles.orContainer}>
                        <View style={styles.line} />
                        <Text style={styles.orText}>o</Text>
                        <View style={styles.line} />
                    </View>

                    <TouchableOpacity style={styles.googleButton}>
                        <Text style={styles.googleButtonText}>Continuar con Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { router.back() }}>
                        <Text style={styles.login}>
                            ¿Ya tienes una cuenta? <Text style={styles.bold}>Inicia sesión</Text>
                        </Text>
                    </TouchableOpacity>

                </LinearGradient>
            </TouchableWithoutFeedback>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        ...StyleSheet.absoluteFillObject,
        paddingHorizontal: 46,
    },
    title: {
        fontSize: 28,
        color: "#fff",
        fontWeight: "regular",
        marginBottom: 10,
    },
    bold: {
        fontWeight: "bold"
    },
    text: {
        fontSize: 24,
        color: "#fff",
        marginBottom: 26,
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
        color: 'white',
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
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    line: {
        height: 1,
        flex: 1,
        backgroundColor: "#fff",
    },
    orText: {
        marginHorizontal: 10,
        color: "#fff",
    },
    googleButton: {
        width: "100%",
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 100,
        alignItems: "center",
        marginTop: 14,
        marginBottom: 14,
    },
    googleButtonText: {
        color: "#000",
        fontSize: 14,
        fontWeight: "500",
    },
    login: {
        color: "#fff",
        fontSize: 14,
        alignSelf: "center",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    datePickerContainer: {
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    closeButton: {
        padding: 10,
    },
    closeButtonText: {
        color: '#3478F6',
        fontSize: 16,
        fontWeight: '500'
    },
})