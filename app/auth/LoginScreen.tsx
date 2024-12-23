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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import API_URL from "../../config/config";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonScale] = useState(new Animated.Value(1));
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      });
      const { token } = response.data.data;
      await AsyncStorage.setItem("token", token);
      router.replace("/(tabs)"); // Prevent back navigation to login
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message || "An error occurred";
      Alert.alert("Login Failed", errorMessage);
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
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>
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
          style={styles.loginButton}
          onPress={() => {
            animateButtonPress();
            handleLogin();
          }}
        >
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push("/auth/RegisterScreen")}
      >
        <Text style={styles.registerButtonText}>Create an Account</Text>
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
  loginButton: {
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
  loginButtonText: {
    color: "#1F1C2C",
    fontSize: 18,
    fontWeight: "600",
  },
  registerButton: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  registerButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
