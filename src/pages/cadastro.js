import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleCadastro = async () => {
    const { nome, email, password, confirmPassword } = this.state;

    // 🧩 Verifica se todos os campos estão preenchidos
    if (!nome.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos para continuar.");
      return;
    }

    // 🔐 Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      Alert.alert("Senhas diferentes", "As senhas informadas não coincidem.");
      return;
    }

    // 🔒 Verifica se a senha tem pelo menos 6 caracteres
    if (password.length < 6) {
      Alert.alert("Senha fraca", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    const user = { nome, email, password };

    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      this.props.navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar os dados do usuário!");
      console.error(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          {/* 🔷 Ícone estilizado no topo */}
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>⚡</Text>
          </View>

          <Text style={styles.title}>Relógio de Energia</Text>
          <Text style={styles.subtitle}>
            Entre na sua conta para gerenciar seu consumo de energia
          </Text>

          {/* Campos de entrada */}
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            value={this.state.nome}
            onChangeText={(text) => this.setState({ nome: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={this.state.password}
            onChangeText={(text) => this.setState({ password: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            secureTextEntry
            value={this.state.confirmPassword}
            onChangeText={(text) => this.setState({ confirmPassword: text })}
          />

          {/* 🔘 Botão estilizado */}
          <TouchableOpacity style={styles.button} onPress={this.handleCadastro}>
            <Text style={styles.buttonText}>Criar Cadastro</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  iconCircle: {
    backgroundColor: "#007bff",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  iconText: {
    fontSize: 40,
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 50,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#111827",
    textAlign: "center",
  },

  // 💠 Botão estilizado
  button: {
    backgroundColor: "#007bff", // 🔹 cor do botão (mude aqui)
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
