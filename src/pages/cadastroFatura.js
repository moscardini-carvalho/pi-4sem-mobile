import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { supabase } from "../lib/supabase";

export default function CadastroFatura({ navigation }) {
  const [dispositivos, setDispositivos] = useState([]);
  const [dispositivoId, setDispositivoId] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [consumoInformado, setConsumoInformado] = useState("");
  const [consumoReal, setConsumoReal] = useState("");
  const [valorPago, setValorPago] = useState("");
  const [status, setStatus] = useState("Pago");

  useEffect(() => {
    async function carregarDispositivos() {
      const { data, error } = await supabase.from("dispositivos").select("id, nome");
      if (error) Alert.alert("Erro", error.message);
      else setDispositivos(data);
    }
    carregarDispositivos();
  }, []);

  async function salvarFatura() {
    if (!dispositivoId || !periodo || !valorPago) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }

    const { error } = await supabase.from("faturas").insert([
      {
        dispositivo_id: dispositivoId,
        periodo,
        consumo_informado: parseFloat(consumoInformado),
        consumo_real: parseFloat(consumoReal),
        valor_pago: parseFloat(valorPago),
        status,
      },
    ]);

    if (error) Alert.alert("Erro", error.message);
    else {
      Alert.alert("Sucesso", "Fatura cadastrada com sucesso!");
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text style={styles.title}>Cadastrar Fatura</Text>

        <TextInput
          style={styles.input}
          placeholder="Período (ex: Setembro de 2025)"
          value={periodo}
          onChangeText={setPeriodo}
        />

        <TextInput
          style={styles.input}
          placeholder="Consumo Informado (kWh)"
          keyboardType="numeric"
          value={consumoInformado}
          onChangeText={setConsumoInformado}
        />

        <TextInput
          style={styles.input}
          placeholder="Consumo Real (kWh)"
          keyboardType="numeric"
          value={consumoReal}
          onChangeText={setConsumoReal}
        />

        <TextInput
          style={styles.input}
          placeholder="Valor Pago (R$)"
          keyboardType="numeric"
          value={valorPago}
          onChangeText={setValorPago}
        />

        <TextInput
          style={styles.input}
          placeholder="Status (Pago / Aguardando / Atrasado)"
          value={status}
          onChangeText={setStatus}
        />

        <TouchableOpacity style={styles.saveButton} onPress={salvarFatura}>
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
