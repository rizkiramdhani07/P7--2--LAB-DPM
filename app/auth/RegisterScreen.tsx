import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import API_URL from "../../config/config";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [buttonScale] = useState(new Animated.Value(1));
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        username,
        password,
        email,
      });
      Alert.alert("Registration Successful", "You can now log in");
      router.replace("/auth/LoginScreen");
    } catch (error) {
      Alert.alert(
        "Registration Failed",
        (error as any).response?.data?.message || "An error occurred"
      );
    }
  };

  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <LinearGradient colors={["#1F1C2C", "#928DAB"]} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/favicon1.jpg")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>Join us and get started</Text>

      <View style={styles.inputContainer}>
        <Feather name="user" size={20} color="#FFF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#E0E0E0"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="mail" size={20} color="#FFF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#E0E0E0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="#FFF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#E0E0E0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {
            animateButtonPress();
            handleRegister();
          }}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace("/auth/LoginScreen")}
      >
        <Text style={styles.backButtonText}>Back to Login</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  logoContainer: {
    backgroundColor: "#1F1C2C",
    borderRadius: 60,
    padding: 10,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    color: "#FFF",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#FFF",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: "#FFF",
  },
  registerButton: {
    width: "100%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  registerButtonText: {
    color: "#1F1C2C",
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});