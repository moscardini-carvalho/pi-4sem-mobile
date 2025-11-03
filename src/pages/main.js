import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { supabase } from "../lib/supabase";

export default function Main({ navigation }) {
  const [dispositivos, setDispositivos] = useState([]);

  async function carregarDispositivos() {
    const { data, error } = await supabase.from("dispositivos").select("*").order("created_at", { ascending: false });
    if (error) Alert.alert("Erro", error.message);
    else setDispositivos(data);
  }

  async function deletarDispositivo(id) {
    const { error } = await supabase.from("dispositivos").delete().eq("id", id);
    if (error) Alert.alert("Erro", error.message);
    else carregarDispositivos();
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", carregarDispositivos);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dispositivos</Text>
        <Text style={styles.subtitle}>Gerencie seus relógios de energia IoT</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("CadastroDispositivo")}
        >
          <Text style={styles.addButtonText}>Cadastrar Relógio</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dispositivos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.deviceName}>⚡ {item.nome}</Text>
              <Text style={styles.status}>{item.status}</Text>
              <Text style={styles.address}>{item.endereco}</Text>
            </View>
            <TouchableOpacity onPress={() => deletarDispositivo(item.id)}>
              <Text style={{ color: "red", fontSize: 18 }}>🗑</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9fafb" },
  header: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#111", marginTop: 50 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 10,marginTop: 15 },
  addButton: {
    alignSelf: "center",
    backgroundColor: "#007BFF",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 50
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  deviceName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  status: { color: "green", fontWeight: "500", marginBottom: 4 },
  address: { color: "#777", fontSize: 13 },
});
