import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function CadastroDispositivo({ navigation }) {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [endereco, setEndereco] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text style={styles.title}>Cadastrar Dispositivo</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do Dispositivo"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Código de Identificação"
          value={codigo}
          onChangeText={setCodigo}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço de Instalação"
          value={endereco}
          onChangeText={setEndereco}
        />

        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontWeight: "bold" },
});
