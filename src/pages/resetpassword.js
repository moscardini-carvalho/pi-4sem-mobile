  import React, { useState } from "react";
  import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
  import { supabase } from "../lib/supabase"; // ajuste o caminho conforme sua estrutura

  export default function ResetPassword({ navigation }) {
    const [email, setEmail] = useState("");

    const handleResetPassword = async () => {
      if (email.trim() === "") {
        Alert.alert("Erro", "Digite um e-mail válido.");
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://seuapp.com/redefinir-senha", // ou seu deep link do Expo
      });

      if (error) {
        Alert.alert("Erro", error.message);
      } else {
        Alert.alert("Sucesso", "Verifique seu e-mail para redefinir a senha!");
        navigation.navigate("Login");
      }
    };

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Recuperar Senha</Text>
          <Text style={styles.subtitle}>
            Digite seu e-mail para receber um link de redefinição de senha
          </Text>

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Enviar Link</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Voltar para o Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1, justifyContent: "center", alignItems: "center",
      backgroundColor: "#f3f6fb", paddingHorizontal: 20
    },
    card: {
      width: "100%", maxWidth: 380, backgroundColor: "#fff", borderRadius: 10,
      padding: 24, alignItems: "center", elevation: 4
    },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 4, color: "#111827" },
    subtitle: { fontSize: 13, color: "#6b7280", textAlign: "center", marginBottom: 20 },
    input: {
      width: "100%", backgroundColor: "#f9fafb", paddingVertical: 12, paddingHorizontal: 14,
      borderRadius: 6, borderColor: "#d1d5db", borderWidth: 1, marginBottom: 12,
      fontSize: 16, color: "#111827",
    },
    button: {
      backgroundColor: "#007BFF", paddingVertical: 12, borderRadius: 6,
      alignItems: "center", width: "100%", marginBottom: 14,
    },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    link: { color: "#007BFF", fontSize: 14 },
  });
