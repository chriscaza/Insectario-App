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

export default function App() {
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

      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPass}
          placeholder="Contraseña"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
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
          ¿Aún no tienes cuenta? Crear cuenta
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
    paddingHorizontal: 46,
  },
  title: {
    fontSize: 24,
    marginBottom: 36,
    color: "#fff",
  },
  input: {
    width: "100%",
    backgroundColor: "#314F33",
    padding: 15,
    borderRadius: 10,
    marginBottom: 24,
    color: "#fff",
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
    top: 10,
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
});
