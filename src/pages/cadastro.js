// Cadastro.js
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Button} from "react-native";

export default class Cadastro extends Component {
  state = { email: "", password: "" };

  handleCadastro = async () => {
    const { email, password } = this.state;
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    const user = { email, password };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    alert("Usuário cadastrado com sucesso!");
    this.props.navigation.navigate("Login"); // 👈 maiúsculo igual ao definido no Routes
  };

  render() {
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
  placeholder="Email"
  value={this.state.email}
  onChangeText={(text) => this.setState({ email: text })}
/>

<TextInput
  placeholder="Senha"
  value={this.state.password}
  secureTextEntry
  onChangeText={(text) => this.setState({ password: text })}
/>

          <Button title="Cadastrar" onPress={() => this.handleCadastro()} />

        </View>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f3f6fb", paddingHorizontal: 20 },
  card: { width: "100%", maxWidth: 380, backgroundColor: "#fff", borderRadius: 10, padding: 24, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 5, elevation: 4 },
  iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#e0edff", justifyContent: "center", alignItems: "center", marginBottom: 15 },
  iconText: { fontSize: 28, color: "#007BFF" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 4, color: "#111827" },
  subtitle: { fontSize: 13, color: "#6b7280", textAlign: "center", marginBottom: 20 },
  input: { width: "100%", backgroundColor: "#f9fafb", paddingVertical: 12, paddingHorizontal: 14, borderRadius: 6, borderColor: "#d1d5db", borderWidth: 1, marginBottom: 12, fontSize: 16, color: "#111827" },
  button: { backgroundColor: "#007BFF", paddingVertical: 12, borderRadius: 6, alignItems: "center", width: "100%", marginTop: 4, marginBottom: 14 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  link: { color: "#007BFF", fontSize: 14 },
  linkSecondary: { color: "#6b7280", fontSize: 13, marginTop: 8 },
});