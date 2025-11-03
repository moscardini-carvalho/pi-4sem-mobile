import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function Faturas({ navigation }) {
  const [faturas, setFaturas] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregarFaturas() {
    setLoading(true);
    const { data, error } = await supabase
      .from("faturas")
      .select("id, periodo, consumo_informado, consumo_real, valor_pago, status, dispositivos ( nome )")
      .order("created_at", { ascending: false });

    if (error) {
      Alert.alert("Erro ao carregar faturas", error.message);
    } else {
      setFaturas(data);
    }
    setLoading(false);
  }

  async function deletarFatura(id) {
    Alert.alert("Excluir", "Tem certeza que deseja excluir esta fatura?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase.from("faturas").delete().eq("id", id);
          if (error) Alert.alert("Erro", error.message);
          else carregarFaturas();
        },
      },
    ]);
  }

  const corStatus = (status) => {
    switch (status) {
      case "Correto":
      case "Pago":
        return { backgroundColor: "#dcfce7", color: "#166534" };
      case "Aguardando":
        return { backgroundColor: "#fef9c3", color: "#854d0e" };
      case "Erro":
      case "Atrasado":
        return { backgroundColor: "#fee2e2", color: "#991b1b" };
      default:
        return { backgroundColor: "#f3f4f6", color: "#374151" };
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", carregarFaturas);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Faturas de Energia</Text>
        <Text style={styles.subtitle}>
          Gerencie suas faturas e compare com o consumo real
        </Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("CadastroFatura")}
        >
          <Text style={styles.addButtonText}>+ Nova Fatura</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={faturas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const statusStyle = corStatus(item.status);
            return (
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.periodo}>{item.periodo}</Text>
                  <Text style={styles.device}>
                    {item.dispositivos?.nome || "Sem dispositivo"}
                  </Text>
                </View>

                <View style={styles.column}>
                  <Text style={styles.text}>
                    {item.consumo_informado} kWh → {item.consumo_real || "-"} kWh
                  </Text>
                </View>

                <View style={styles.column}>
                  <Text style={styles.valor}>
                    R$ {item.valor_pago?.toFixed(2) || "-"}
                  </Text>
                </View>

                <View
                  style={[styles.status, { backgroundColor: statusStyle.backgroundColor }]}
                >
                  <Text style={[styles.statusText, { color: statusStyle.color }]}>
                    {item.status}
                  </Text>
                </View>

                <TouchableOpacity onPress={() => deletarFatura(item.id)}>
                  <Text style={styles.delete}>🗑</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", padding: 20 },
  header: { marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#111" },
  subtitle: { color: "#555", fontSize: 14, marginBottom: 10 },
  addButton: {
    alignSelf: "flex-end",
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  row: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    elevation: 2,
  },
  column: { flex: 1 },
  periodo: { fontWeight: "bold", color: "#111" },
  device: { color: "#666", fontSize: 13 },
  valor: { fontWeight: "bold", color: "#111", textAlign: "center" },
  text: { textAlign: "center", color: "#333" },
  status: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: "center",
  },
  statusText: { fontWeight: "600" },
  delete: { fontSize: 18, color: "#d11a2a", marginLeft: 10 },
});
