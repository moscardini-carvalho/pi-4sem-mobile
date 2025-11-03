import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { supabase } from "../lib/supabase";

export default function CadastroDispositivo({ navigation }) {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [endereco, setEndereco] = useState("");

  async function salvar() {
    if (!nome.trim() || !endereco.trim()) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }

    const { error } = await supabase.from("dispositivos").insert([{ nome, codigo, endereco }]);
    if (error) Alert.alert("Erro", error.message);
    else {
      Alert.alert("Sucesso", "Dispositivo cadastrado!");
      navigation.goBack();
    }
  }

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

        <TouchableOpacity style={styles.saveButton} onPress={salvar}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)" },
  modal: { backgroundColor: "#fff", borderRadius: 12, padding: 20, width: "90%" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 10, marginBottom: 10 },
  saveButton: { backgroundColor: "#007BFF", padding: 12, borderRadius: 6, alignItems: "center" },
  saveButtonText: { color: "#fff", fontWeight: "bold" },
  cancelText: { textAlign: "center", color: "#555", marginTop: 10 },
});
