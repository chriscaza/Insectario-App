import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
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
            placeholder="hola@gmail.com"
            placeholderTextColor="rgba(255, 255, 255, 1)"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
            style={styles.input}
            placeholder="**************"
            placeholderTextColor="rgba(255, 255, 255, 1)"
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

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continuar</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>o</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}>Continuar con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.createAccount}>
          ¿Aún no tienes cuenta? <Text style={styles.bold}>Crear cuenta</Text>
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 46,
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
