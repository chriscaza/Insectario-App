import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  InteractionManager,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CustomAlert from '../../components/Alerts/CustomAlert'
import User from '../../scripts/models/user/User'
import Loading from '../../components/LoadingScreen';



export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    const result = await User.login(email, password);
    setIsLoading(false)
    if (!result.success) {
      setAlertMessage(result.message);
      setShowAlert(true);
    } else {
      router.replace('/(camera-flow)/CameraScreen')
    }

    clearFields()
    // router.replace('/(camera-flow)/CameraScreen')
  }

  const handleAlertClose = () => {
    setShowAlert(false)
  }

  function clearFields() {
    setEmail('')
    setPassword('')
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
          <Text style={styles.title}>Inicia sesión</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Correo</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu correo"
              placeholderTextColor="rgba(255, 255, 255, 0.9)"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu contraseña"
              placeholderTextColor="rgba(255, 255, 255, 0.9)"
              value={password}
              secureTextEntry={!showPassword}
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

          <TouchableOpacity onPress={() => { router.navigate('/ForgotPassScreen') }}>
            <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleLogin}
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

          <TouchableOpacity>
            <Text style={styles.createAccount} onPress={() => { router.navigate('/SignUpScreen') }}>
              ¿Aún no tienes cuenta? Crear cuenta
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
    justifyContent: "center",
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 46,
    ...StyleSheet.absoluteFillObject
  },
  title: {
    fontSize: 24,
    marginBottom: 36,
    color: "#fff",
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
  inputPass: {
    width: "100%",
    backgroundColor: "#314F33",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    color: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 0,
  },
  eyeButton: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  eyeText: {
    color: "#fff",
  },
  forgotPassword: {
    color: "#fff",
    marginBottom: 24,
    fontWeight: "500",
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
  },
  googleButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  createAccount: {
    color: "#fff",
    alignSelf: "center",
    marginTop: 24,
    fontWeight: "500",
  },
  bold: {
    fontWeight: "bold"
  }
});
