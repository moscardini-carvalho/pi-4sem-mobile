// Login.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleLogin = () => {
    if (!email === "" || !password === "") {
      Alert.alert("E-mail ou senha inválidos");
    } else {
      navigation.navigate("Main");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>⚡</Text>
        </View>

        <Text style={styles.title}>Relógio de Energia</Text>
        <Text style={styles.subtitle}>
          Entre na sua conta para gerenciar seu consumo de energia
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Links */}
        <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
          <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
          <Text style={styles.linkSecondary}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f3f6fb", paddingHorizontal: 20 },
  card: { width: "100%", maxWidth: 380, backgroundColor: "#fff", borderRadius: 10, padding: 24, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 5, elevation: 4 },
  iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#e0edff", justifyContent: "center", alignItems: "center", marginBottom: 15 },
  iconText: { fontSize: 28, color: "#007BFF" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 4, color: "#111827" },
  subtitle: { fontSize: 13, color: "#6b7280", textAlign: "center", marginBottom: 20, marginTop: 10 },
  input: { width: "100%", backgroundColor: "#f9fafb", paddingVertical: 12, paddingHorizontal: 14, borderRadius: 6, borderColor: "#d1d5db", borderWidth: 1, marginBottom: 12, fontSize: 16, color: "#111827" },
  button: { backgroundColor: "#007BFF", paddingVertical: 12, borderRadius: 6, alignItems: "center", width: "100%", marginTop: 50, marginBottom: 14 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  link: { color: "#007BFF", fontSize: 14 },
  linkSecondary: { color: "#6b7280", fontSize: 13, marginTop: 8 },
});

export default Login;
